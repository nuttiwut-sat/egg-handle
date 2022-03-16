import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/models/product.model';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CrudService } from 'src/app/services/crud.service';
import { PageControllerService } from 'src/app/services/page-controller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-egg',
  templateUrl: './product-egg.component.html',
  styleUrls: ['./product-egg.component.scss'],
})
export class ProductEggComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject();
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  constructor(
    private router: Router,
    private crud: CrudService,
    private pageService: PageControllerService
  ) {}

  public products: IProduct[] = [];

  ngOnInit(): void {
    this.pageService.isMainpage$.next(true);
    this.crud
      .get<IProduct[]>(`/product`)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        async (res: any) => {
          const resProduct: IProduct[] = res;

          this.products = resProduct.map((product) => {
            const updatedAt = moment(product.updatedAt).format('YYYY/MM/DD');
            const createdAt = moment(product.createdAt).format('YYYY/MM/DD');
            return {
              ID: product.ID,
              name: product.name,
              cost: product.cost,
              price: product.price,
              stockAmount: 0,
              img: product.img,
              type: product.type,
              updatedAt,
              createdAt,
            };
          });
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
}
