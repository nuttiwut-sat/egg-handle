import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CrudService } from 'src/app/services/crud.service';
import { PageControllerService } from 'src/app/services/page-controller.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private auth: AuthorizeService,
    private crud: CrudService,
    private location: Location,
    public pageService: PageControllerService
  ) {
  }

  showFiller = false;
  public isMenu = false;
  public isMainPage = true;
  public isManager = false;
  public isPendingBox = false;
  public localUserId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.pageService.isLoading$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((isLoading) => {
        setTimeout(() => {
          this.isLoading = isLoading;
        }, 10);
      });
    this.auth.user$.pipe(takeUntil(this.unsubscribeAll)).subscribe((user) => {
      this.localUserId = user?.id || '';
      this.isManager = user?.role === 'ADMIN';
    });
    this.pageService.isMainpage$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((isMain) => {
        setTimeout(() => {
          this.isMainPage = isMain;
        }, 10);
      });
  }

  openMenu(): void {
    this.isMenu = !this.isMenu;
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  gotoback(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
