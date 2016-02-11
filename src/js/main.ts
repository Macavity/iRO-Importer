/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts" />
/// <reference path="../../node_modules/angular2/core.d.ts" />
/// <reference path="../../node_modules/angular2/platform/browser.d.ts" />

import "reflect-metadata";

import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import * as $ from "jquery";

import OptionsComponent from "./OptionsComponent";

declare var window:Window;

interface IBrowserHandler {
    getStorageVariable(key):any;
    setStorageVariable(key,value):void;
}

class ChromeHandler implements IBrowserHandler {
    public getStorageVariable(key): any{
        return window.localStorage.getItem(key);
    }

    public setStorageVariable(key, value): void{
        window.localStorage.setItem(key, value);
    }
}

const enum Browser {
    Chrome,
    Firefox,
    Safari
}

class Main {

    public browserType: Browser;
    public static browser:any;

    constructor(){
        if(navigator.appVersion.indexOf('Chrome/') > 0){
            this.browserType = Browser.Chrome;
            Main.browser = new ChromeHandler();
        }
    }

    public static getClientSerial(){
        return Main.browser.getStorageVariable("client_serial");
    }

    public static saveClientSerial(serial){
        Main.browser.setStorageVariable("client_serial", serial);
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