# Example simplerr and Angular Structure

This project provides some guideance on using a domain driven application
structure with the simplerr projact and Angular front end.

Angular app creation wa started with `ng new --minimal=true --skipTests=true simplerr-angular7`

## Changes from the default Angular project structure

Our project structure follows domain level organisation. The project was
flattened - with the removal os src as a subdirectory and files such as
main.ts, styles.css, index.html, and so on were moved to the app folder.

You will also need to replace all references to src in the package.json and
anguylar.json files.

**What's a domain organisation?** A domain referes to application/feature level
entity, organisation around domains placess backend and front end in the same
folder, ass well as assets and libraries.

Key terms top remember when discussung the structure:

  * Application - the same folder that .git lives in, contains multiple modiules
  * Module - Contains alll the code for that applicaiton, applications generally contain everything you would normally find after logging in.
  * Feature - contains sub components for the application, a feature should be discrete = generally one page and its sub components.

```

    Application Folder
        └── Module Folder
            └── name.routing.module.ts
            └── name.module.ts
                └── Features
                    └── /assets <-- such as images, styles, etc.
                    └── api.py  <-- api calls
        └── Module Two Folder
```

**What's the alternative to a domain structure?** Generally a functional
structue is considered to be the main alternative. In this structure similar
functional elemernts are stored in the same folder - for example all templates
would live in a templates folder, controllers in a contoller folder, and so on.
This can help promote re-usability, however the day to day operations of a
developer are smoother if they are in complete control of a small subset of the
project without worrying about unexpected artefacts.

**A reasonable compromise:** When functionality begins to appear the developers
can agree to promote it to a common folder, which generally will follow
fiunctional orhanisation structure. For instance, an authentication library
would be logicaqllly placed here.

## Local development

The simplerr server should always render from the angular dist folder. Making
dist builds can become cumbersone though. To simplify the development process
the following changes have been made to the project.

**Use a proxy:** A proxy is a piece of software which is in between your
JavaScript/Angular app doing the Ajax request and your backend API.

The command `ng serve` is nothing other than the Webpack development server
which comes with some [nice configuration options](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

To set it up, we need to create a file proxy.conf.json at the root of our
Angular CLI project. The content should look as follows


To setup a proxy during development create a `proxy.conf.json` file. The
contents should contain the following json config:

    # file: proxy.conf.json
    {
      "**": {
        "target": "http://localhost:3000",
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

To utilise this, simply start the server with `npm start` - note we no lover use `ng-serve`.

## Adding a new feature folder

This section provides guideance on the creation of a new feature module. See
https://angular.io/guide/lazy-loading-ngmodules for full details.

**Create the feature module and component**

First start by creating the feature module - note that you wont have to
register this with the app as we use lazyloading in the application routes. Following our domain structure we will not create it in the app folder - which is now resereved for boostrapping the app.

    $ mkdir dashboard
    $ cd dashboard
    $ ng g m dashboard --routing --flat     # add feature module in current folder
    $ ng g c summary/Summary --flat       # add your components
    $ ng g c detail/Detail --flat

**Add some links to the components**

Add links to the routes where appropriate - for ecxample in navigation bars. In
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
