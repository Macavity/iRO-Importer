/// <reference path="../../node_modules/angular2/core.d.ts" />
/// <reference path="../../node_modules/angular2/platform/browser.d.ts" />

import "reflect-metadata";

import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import * as $ from "jquery";

import OptionsComponent from "./OptionsComponent";
import ChromeHandler from "./ChromeHandler";
import {BrowserHandler,BrowserType} from "./BrowserHandler";

declare var window:Window;


class Main {


    constructor(){
    }

}

$(() => {

    let pathname = window.location.pathname;

    var localStorageKey = ['client_serial'];

    for(let i = 0, length = localStorageKey.length; i < length; ++i){
        if(typeof localStorage[localStorageKey[i]] === "undefined"){
            window.localStorage.setItem(localStorageKey[i], "");
        }
    }

    //bootstrap(Main);

    if(pathname == "/browser_action/browser_action.html"){
        bootstrap(OptionsComponent);
    }

});