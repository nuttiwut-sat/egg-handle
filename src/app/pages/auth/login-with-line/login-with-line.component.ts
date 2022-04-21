import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import liff from '@line/liff';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CrudService } from 'src/app/services/crud.service';
import { PageControllerService } from 'src/app/services/page-controller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-with-line',
  templateUrl: './login-with-line.component.html',
  styleUrls: ['./login-with-line.component.scss']
})
export class LoginWithLineComponent implements OnInit , OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject();
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  constructor(
    private crud: CrudService,
    private auth: AuthorizeService,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageControllerService
  ) { }

  title = 'angular-line-login';
  idToken: string | null = '';
  displayName: string = '';
  pictureUrl: string | undefined = '';
  statusMessage: string | undefined = '';
  userId: string = '';

  ngOnInit(): void {
    this.initLine();
  }

  async initLine(): Promise<void> {
    this.pageService.isLoading$.next(true);
    liff.init({ liffId: '1655299218-A5k0e0a2' }, () => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
      
          const body = {
            lineID: profile.userId,
            name: profile.displayName,
            pictureUrl: profile.pictureUrl,
          }
          try {
            this.crud
              .post(`/customer/login`, body)
              .pipe(takeUntil(this.unsubscribeAll))
              .subscribe((res: any) => {
                this.router.navigate(['']);
              });
          } catch (err: any) {
            Swal.fire({
              icon: 'error',
              text: err.message.message,
            });
          }
        }).catch(err => console.error(err));
    
      }
    }, err => console.error(err));
  }
}
