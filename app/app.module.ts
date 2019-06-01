import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * feature modules - please follow the standard [1] with routing [2]
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


/**
 * References
 * ----------
 *
 * [1]: https://angular.io/guide/feature-modules "Angular feature modules"
 * [2]: https://angular.io/guide/lazy-loading-ngmodules "Modules with routing"
 *
 */
