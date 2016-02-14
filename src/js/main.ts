/// <reference path="../../node_modules/angular2/core.d.ts" />
/// <reference path="../../node_modules/angular2/platform/browser.d.ts" />

// Angular2 Imports
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./AppComponent";

declare var window:Window;

bootstrap(AppComponent);

    /*if(pathname == "/browser_action/browser_action.html"){
        bootstrap(OptionsFormComponent);
    }*/

//});