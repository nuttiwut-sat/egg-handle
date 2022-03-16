import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerRoutingModule } from './dealer-routing.module';
import { DealerListComponent } from './dealer-list/dealer-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [DealerListComponent],
  imports: [
    CommonModule,
    DealerRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
  ],
})
export class DealerModule {}
