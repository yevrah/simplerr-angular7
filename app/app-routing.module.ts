import { NgModule } from '@angular/core';

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { AppComponent } from "./app.component";

import { Routes, RouterModule } from '@angular/router';

/*
 * Routing
 */

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( mod => mod.DashboardModule )
    },
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( mod => mod.UsersModule )
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
