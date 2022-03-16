import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductEggOtherComponent } from './product-egg-other/product-egg-other.component';
import { ProductEggComponent } from './product-egg/product-egg.component';
import { ProductPanelComponent } from './product-panel/product-panel.component';

const routes: Routes = [
  {
    path: 'egg',
    component: ProductEggComponent,
  },
  {
    path: 'egg-other',
    component: ProductEggOtherComponent,
  },
  {
    path: 'panel',
    component: ProductPanelComponent,
  },
  {
    path: 'new',
    component: AddProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
