import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFarmComponent } from './add-farm/add-farm.component';
import { FarmListComponent } from './farm-list/farm-list.component';

const routes: Routes = [
  {
    path: 'new',
    component: AddFarmComponent,
  },
  {
    path: '',
    component: FarmListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmRoutingModule {}
