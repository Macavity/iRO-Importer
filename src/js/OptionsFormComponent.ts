/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts" />
/// <reference path="../../node_modules/angular2/core.d.ts" />
/// <reference path="../../node_modules/angular2/platform/browser.d.ts" />

import "reflect-metadata";

import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {BrowserHandler} from "./BrowserHandler";
import {Options} from "./Options";

//import * as $ from "jquery";


/*
 * Options Page
 */
@Component({
    selector: 'options-form',
    templateUrl: 'options-form.component.html'
})
export class OptionsFormComponent {

    public model = new Options("a", "b");

    private browser:BrowserHandler;

    private submitButton:JQuery;
    private serialInput:JQuery;
    private apiInput:JQuery;

    private apiUrl: string;
    private serial: string;

    public submitted = false;

    private body:JQuery;

    constructor(){
        console.log("OptionsPage constructor");
        this.body = $("body");

        this.browser = new BrowserHandler();

        // Get options from storage
        let browserOptions = this.browser.getOptions();
        //this.model = new Options(browserOptions.serial, browserOptions.api_url);

        this.serialInput = $("#iro-login__serial");
        this.apiInput = $("#iro-login__api-url");

    }

    public onSubmit(){
        this.submitted = true;
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }

    public saveOptions(options:Options){
        if(this.validateSerial(options) && this.validateApiUrl(options)){

            $.ajax({
                url: options.api_url+'/'+options.serial+'/systemcheck', success: (result) => {

                    this.model = options;
                    this.browser.saveOptions(this.model);

                }});



        }
    }

    public validateApiUrl(options:Options){
        let apiUrl = options.api_url;
        let validUrl = apiUrl.match(/(https?:\/\/|)([A-z0-9][A-z0-9\.\-\_]+)/g);

        if(apiUrl.length == 0){
            return false;
        }
        else{
            if(validUrl){

                let protocol = validUrl[1] || "http://";

                apiUrl = protocol + validUrl[2];

                this.apiInput.val(apiUrl);
                this.apiUrl = apiUrl;
                return true;
            }
            else {
                return false;
            }
        }

    }

    private validateSerial(options:Options){

        var serial = options.serial;

        let serialFormGroup = this.serialInput.parent();

        if(serial.length == 0){
            return false;
        }
        else {
            return true;
        }

    }

    private checkSerial(serial:string){
        // Call the API to check if the serial checks out.
        return true;
    }
}