/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts" />
/// <reference path="../../node_modules/angular2/core.d.ts" />
/// <reference path="../../node_modules/angular2/platform/browser.d.ts" />

import "reflect-metadata";

import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import * as $ from "jquery";

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
                            <div class="form-group">
                                <label class="col-sm-2" for="iro-login__api-url" data-l10n="client-api">
                                    API URL
                                </label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control iro-login__api-url" id="iro-login__api-url" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2" for="iro-login__serial" data-l10n="client-serial">
                                    Seriennummer
                                </label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control iro-login__serial" id="iro-login__serial" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button type="submit" class="btn btn-primary" id="iro-login__submit" data-l10n="save">
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

    private submitButton:JQuery;
    private serialInput:JQuery;
    private apiInput:JQuery;

    private apiUrl: string;
    private serial: string;

    private body:JQuery;

    constructor(){
        console.log("OptionsPage constructor");
        this.body = $("body");

        this.submitButton = $("#iro-login__submit");
        this.serialInput = $("#iro-login__serial");
        this.apiInput = $("#iro-login__api-url");

        this.submitButton.on('click', () => {
            if(this.validateOptions() && this.checkSerial()){



                this.saveOptions();
            }
        });

        //let clientSerial = Main.getClientSerial();

        //this.serialInput.val(clientSerial);

    }

    private validateOptions(){

        var serial = this.serialInput.val();
        var apiUrl = this.apiInput.val();

        let serialFormGroup = this.serialInput.parent();
        let apiFormGroup = this.apiInput.parent();

        serialFormGroup.removeClass('has-error,has-success');
        apiFormGroup.removeClass('has-error,has-success');

        /*
         * Serial Number
         */
        if(serial.length == 0){
            serialFormGroup.addClass('has-error');
        }
        else {
            serialFormGroup.addClass('has-success');
            this.serial = serial;
        }

        /*
         * API URL
         */
        let validUrl = apiUrl.match(/(https?:\/\/|)([A-z0-9][A-z0-9\.\-\_]+)/g);

        if(apiUrl.length == 0){
            apiFormGroup.addClass('has-error');
        }
        else{
            if(validUrl){

                let protocol = validUrl[1] || "http://";

                apiUrl = protocol + validUrl[2];

                this.apiInput.val(apiUrl);
                this.apiUrl = apiUrl;

                apiFormGroup.addClass('has-success');
            }
            else {
                apiFormGroup.addClass('has-error');
            }
        }

        if(apiFormGroup.hasClass('has-success') && serialFormGroup.hasClass('has-success')){
            $.ajax({
                url: apiUrl+'/'+serial+'/systemcheck', success: function(result){
                    // Success.
                }});

        }
    }

    private validateApiUrl(value){



    }

    private checkSerial(){
        // Call the API to check if the serial checks out.
    }

    private saveOptions(){
        //Main.saveClientSerial(this.serialInput.val());
        //console.log(Main.getClientSerial());
    }
}