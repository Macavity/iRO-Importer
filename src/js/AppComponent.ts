/// <reference path="../../node_modules/angular2/core.d.ts" />
/// <reference path="../../node_modules/angular2/platform/browser.d.ts" />

import "reflect-metadata";

// Angular2 Imports
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

// JQuery
//import * as $ from "jquery";

import {OptionsFormComponent} from "./OptionsFormComponent";
import ChromeHandler from "./ChromeHandler";
import {BrowserHandler,BrowserType} from "./BrowserHandler";

declare var window:Window;

@Component({
    selector: 'app',
    template: '<options-form></options-form>',
    directives: [OptionsFormComponent]
})
export class Main {

    constructor(){
    }

}

//$(() => {

let pathname = window.location.pathname;

var localStorageKey = ['client_serial'];

for(let i = 0, length = localStorageKey.length; i < length; ++i){
    if(typeof localStorage[localStorageKey[i]] === "undefined"){
        window.localStorage.setItem(localStorageKey[i], "");
    }
}

bootstrap(Main);

/*if(pathname == "/browser_action/browser_action.html"){
 bootstrap(OptionsFormComponent);
 }*/

//});