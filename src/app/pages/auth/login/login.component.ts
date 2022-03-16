import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { PageControllerService } from 'src/app/services/page-controller.service';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject();
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public username: string = localStorage.getItem('username') || '';
  public password: string = '';
  public email: string = '';
  public isLoading: boolean = false;
  public isRemember: boolean = false;

  constructor(
    private crud: CrudService,
    private auth: AuthorizeService,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageControllerService
  ) {}

  ngOnInit(): void {
    this.pageService.isLoading$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.isLoading = res;
      });
    this.auth.user$.pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
      this.pageService.isLoading$.next(false);
      this.router.navigate(['dashboard'], { replaceUrl: true });
      // this.router.navigate(['m/user'], { relativeTo: this.route });
    });
  }

  public login(): void {
      if (!this.username || !this.password) {
        Swal.fire({
          icon: 'warning',
          text: 'Please input username and password',
        });
        return;
      }
      if (!this.isRemember) {
        localStorage.removeItem('username');
      }
      this.auth
        .login(this.username, this.password)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(
          (res) => {
            if (this.isRemember) {
              localStorage.setItem('username', this.username);
            }
            this.router.navigate(['dashboard']);
            // this.router.navigate(['m/user'], { relativeTo: this.route });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              text: error.error.message,
            });
          },
          () => {
            this.pageService.isLoading$.next(false);
          }
        );
  }

  setFocus(id: string) {
      const ele = document.getElementById(id);
      ele?.focus();
  }
}
