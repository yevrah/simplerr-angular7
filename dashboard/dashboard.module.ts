import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [SummaryComponent, DetailComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
