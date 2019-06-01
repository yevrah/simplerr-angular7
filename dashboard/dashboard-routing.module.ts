import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryComponent } from './summary/summary.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
    {
        path: '',
        component: SummaryComponent
    },
    {
        path: 'detail',
        component: DetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
