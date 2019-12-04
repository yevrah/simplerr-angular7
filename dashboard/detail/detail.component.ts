import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-details',
  template: `
    <h1 *ngIf="detail$ | async as detail else noData">
        {{ detail.message }}
    </h1>
    <ng-template #naData>No Data! Or Details!</ng-template>
  `,
  styles: []
})
export class DetailComponent implements OnInit {
    detail$

    constructor(private http:HttpClient) { }

    ngOnInit() {
        this.detail$ = this.http
        .get('http://127.0.0.1:4200/api/dashboard/detail')
    }

}
