import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!
      </h1>
    </div>

    <button routerLink="dashboard">Dashboard</button>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'simplerr-angular7-minimal';
}
