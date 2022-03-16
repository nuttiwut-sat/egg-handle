import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CrudService } from 'src/app/services/crud.service';
import { PageControllerService } from 'src/app/services/page-controller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.scss'],
})
export class AddFarmComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private crud: CrudService,
    private router: Router,
    private pageController: PageControllerService,
    private auth: AuthorizeService,
    private http: HttpClient
  ) {}

  private unsubscribeAll: Subject<any> = new Subject();
  public name: string = '';

  ngOnInit(): void {
    // this.pageController.isMainpage$.next(false);
  }

  onSubmit() {
    if (!this.name) {
      Swal.fire({
        icon: 'warning',
        text: 'Please input.',
      });
      return;
    }
    try {
      this.crud
        .post(`/farm`, { name: this.name })
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((res: any) => {
          this.router.navigate(['farm']);
        });
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        text: err.message.message,
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
