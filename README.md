# Example simplerr and Angular Structure

This project provides some guidance on using a domain driven application
structure with the simplerr project and Angular front end.

Angular app creation was started with `ng new --minimal=true --skipTests=true simplerr-angular7`

## Changes from the default Angular project structure

Our project structure follows domain level organisation. The project was
flattened - with the removal of `./src` as a subdirectory and files such as
main.ts, styles.css, index.html, and so on were moved to the app folder.

You will also need to replace all references to `./src` in the `package.json` and
`angular.json` files.

**What's a domain organisation?** A domain refers to application/feature level
entity, organisation around domains places back end and front end in the same
folder, ass well as assets and libraries.

Key terms top remember when discussung the structure:

  * Application - the same folder that .git lives in, contains multiple modules
  * Module - Contains all the code for that application, applications generally contain everything you would normally find after logging in.
  * Feature - contains sub components for the application, a feature should be discrete = generally one page and its sub components.

```

    Application Folder
        └── Module Folder
            └── name.routing.module.ts
            └── name.module.ts
        └── Module Two Folder
```

**What's the alternative to a domain structure?** Generally a functional
structure is considered to be the main alternative. In this structure similar
functional elements are stored in the same folder - for example all templates
would live in a templates folder, controllers in a controller folder, and so on.
This can help promote re-usability, however the day to day operations of a
developer are smoother if they are in complete control of a small subset of the
project without worrying about unexpected artefacts.

**A reasonable compromise:** When functionality begins to appear the developers
can agree to promote it to a common folder, which generally will follow
functional organisation structure. For instance, an authentication library
would be logically placed here.

## Local development

The simplerr server should always render from the angular dist folder. Making
dist builds can become cumbersome though. To simplify the development process
the following changes have been made to the project.

**Use a proxy:** A proxy is a piece of software which is in between your
JavaScript/Angular app doing the Ajax request and your back end API.

The command `ng serve` is nothing other than the Webpack development server
which comes with some [nice configuration options](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

To set it up, we need to create a file `proxy.conf.json` at the root of our
Angular CLI project. The content should look as follows


To setup a proxy during development create a `proxy.conf.json` file. The
contents should contain the following `json config`:

    # file: proxy.conf.json
    {
      "**": {
        "target": "http://localhost:9000",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
      }
    }

And finally make a quick change to package.json to enable the proxy and start the webserver with proxying support.

    # file: package.json
      "scripts": {
        ...
        "start": "ng serve --proxy-config proxy.conf.json",
        ...

To utilise this, simply start the server with `npm start` - note we no longer use `ng-serve`.

## Adding a new feature folder

This section provides guidance on the creation of a new feature module. See
https://angular.io/guide/lazy-loading-ngmodules for full details.

**Create the feature module and component**

First start by creating the feature module - note that you wont have to
register this with the app as we use lazy-loading in the application routes. Following our domain structure we will not create it in the app folder - which is now reserved for bootstrapping the app.

    $ mkdir dashboard
    $ cd dashboard
    $ ng g m dashboard --routing --flat   # add feature module in current folder
    $ ng g c summary/Summary --flat       # add your components
    $ ng g c detail/Detail --flat

**Add some links to the components**

Add links to the routes where appropriate - for example in navigation bars. In
the example below we simply add them to the main app view.

    # file: app.component.html
    <button routerLink="/dasboard">Dashboard</button>

**Lazy loading the feature modules (including routes)**

This code hooks in the feature to the main application.

    # file: app-routing.module.ts
    const routes: Routes = [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dasboard.module').then(mod => mod.DashboardModule)
      },
    ....

To get this working make sure dynamic module is supported.

    # file: tsconfig.json
    ...
    "module": "esnext",
    ...

Now configure the feature modules routes.

    # file: dashboard/dashboard-routing.module.ts
    ...
    import { SummaryComponent } from './summary/summary.component';

    const routes: Routes = [
        {
            path: '',
            component: SummaryComponent
        }
    ];
    ...

## Adding the API python bits

Its now time to start our integration test - and see if it all works as expected - add the following file to test out our api

    # file: api/dashboard/detail/api.py
    from simplerr import web

    @web('/api/dashboard/detail/api')
    def api(request):
        return {'message': 'hello world'}

    # file: dashboard/detail/detail.component.ts
    import { Component, OnInit } from '@angular/core';
    import {Observable} from 'rxjs/Observable';
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
    export class DashboardComponent implements OnInit {
        details$

        constructor(private http:HttpClient) { }

        ngOnInit() {
            this.detail$ = this.http
            .get('http://127.0.0.1/dashboard/detail/api')
        }

    }
In the project root setup the python environment with the following bash commands:

    $ python3 -m venv env
    $ source env/bin/activate
    $ pip install simplerr
    ...
    $ python -m simplerr runserver

     * Running on http://localhost:9000/ (Press CTRL+C to quit)
     * Restarting with stat
     * Debugger is active!
     * Debugger PIN: XXX-XXX-XXX

Open up the browser to http://localhost:9000/dashboard/detail/api

We should not get the same response from our angular app on port 4200 - full url: http://localhost:4200/dashboard/detail/api

En Conclusión
-------------

The default angular project structure is cumbersome - but with some mangling it can be transformed into a productive and simple environment.
