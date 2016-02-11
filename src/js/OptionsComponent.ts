/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts" />
/// <reference path="../../node_modules/angular2/core.d.ts" />
/// <reference path="../../node_modules/angular2/platform/browser.d.ts" />

import "reflect-metadata";

import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {BrowserHandler} from "./BrowserHandler";

import * as $ from "jquery";

export interface PluginOptions {
    api_url: string;
    serial: string;
}

/*
 * Options Page
 */
@Component({
    selector: 'plugin-options',
    template : `
    <div class="iro-login container-fluid" style="width:300px">
        <div class="row">
            <div class="col-md-12">
                <h3 data-l10n="importer-headline">
                    iRO Importer
                </h3>
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" data-l10n="login">
                            Login
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="iro-login__form form-horizontal" role="form">
                            <div class="form-group"
                                [class.has-success]="options.api_url && validateApiUrl(options.api_url)">
                                <label class="col-sm-2" for="iro-login__api-url" data-l10n="client-api">
                                    API URL
                                </label>
                                <div class="col-sm-10">
                                    <input id="iro-login__api-url" [(ngModel)]="options.api_url" type="text" class="form-control iro-login__api-url" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2" for="iro-login__serial" data-l10n="client-serial">
                                    Seriennummer
                                </label>
                                <div class="col-sm-10">
                                    <input id="iro-login__serial" [(ngModel)]="options.serial" type="text" class="form-control iro-login__serial" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button id="iro-login__submit" type="submit" class="btn btn-primary" data-l10n="save" (click)="saveOptions(options)">
                                        Speichern
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})

export default class OptionsComponent {

    public options: PluginOptions = {
        api_url: "",
        serial: ""
    };

    private browser:BrowserHandler;

    private submitButton:JQuery;
    private serialInput:JQuery;
    private apiInput:JQuery;

    private apiUrl: string;
    private serial: string;


    private body:JQuery;

    constructor(){
        console.log("OptionsPage constructor");
        this.body = $("body");

        this.browser = new BrowserHandler();

        // Get options from storage
        this.options = this.browser.getOptions();

        this.serialInput = $("#iro-login__serial");
        this.apiInput = $("#iro-login__api-url");

    }

    public saveOptions(options:PluginOptions){
        if(this.validateSerial(options) && this.validateApiUrl(options)){

            $.ajax({
                url: options.api_url+'/'+options.serial+'/systemcheck', success: (result) => {

                    this.options = options;
                    this.browser.saveOptions(this.options);

                }});



        }
    }

    public validateApiUrl(options:PluginOptions){
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

    private validateSerial(options:PluginOptions){

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