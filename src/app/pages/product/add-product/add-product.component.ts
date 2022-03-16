import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/models/product.model';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  private unsubscribeAll: Subject<any> = new Subject();
  constructor(private crud: CrudService, private router: Router) {}

  public name: string = '';
  public imgPreviewSelector: string = '';
  public imgFile: File | undefined;
  public typeProduct = new FormControl('', Validators.required);
  public typeSelector = [
    {
      name: 'ไข่ไก่',
      value: 'EGG',
    },
    {
      name: 'ไข่อื่นๆ',
      value: 'EGG_OTHER',
    },
    {
      name: 'แผงไข่',
      value: 'PANEL',
    },
  ];
  public cost: number = 0;
  public price: number = 0;
  ngOnInit(): void {}

  setPreviewImageSelector(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        if (this.imgFile && this.imgFile.size > 50000) {
          Swal.fire({
            icon: 'warning',
            text: 'Image size must less 5mb',
          });
          return;
        }
        this.imgFile = e.target.files[0];
        this.imgPreviewSelector = event.target.result;
      };
    }
  }
  onSubmit() {
    if (
      !this.name ||
      !this.imgFile ||
      !this.cost ||
      !this.price ||
      !this.typeProduct.value
    ) {
      Swal.fire({
        icon: 'warning',
        text: 'Please input.',
      });
      return;
    }
    const data = {
      name: this.name,
      cost: this.cost,
      price: this.price,
      type: this.typeProduct.value,
    } as IProduct;
    const fd = new FormData();
    fd.append('images', this.imgFile, this.imgFile.name);
    fd.append('data', JSON.stringify(data));

    console.log(fd);

    try {
      this.crud
        .post(`/product`, fd)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((res: any) => {
          // this.router.navigate(['product/egg']);
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
