
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

class OptionsPage {

    private submitButton:JQuery;
    private serialInput:JQuery;
    private apiInput:JQuery;

    private apiUrl: string;
    private serial: string;

    private body:JQuery;

    constructor(){

        this.body = $("body");

        this.submitButton = $("#iro-login__submit");
        this.serialInput = $("#iro-login__serial");
        this.apiInput = $("#iro-login__api-url");

        this.submitButton.on('click', () => {
            if(this.validateOptions() && this.checkSerial()){



                this.saveOptions();
            }
        });

        let clientSerial = Main.getClientSerial();

        this.serialInput.val(clientSerial);

    }

    private validateOptions(){

        var serial = this.serialInput.val();
        var apiUrl = this.apiInput.val();

        let formGroup = this.serialInput.parent();

        /*
         * Serial Number
         */
        if(serial.length == 0){
            formGroup.addClass('has-error');
        }
        else {
            formGroup.addClass('has-success');
            this.serial = serial;
        }

        /*
         * API URL
         */
        formGroup = this.apiInput.parent();

        if(apiUrl.length == 0){
            formGroup.addClass('has-error');
        }
        else {
            formGroup.addClass('has-success');
            this.apiUrl = apiUrl;
        }
    }

    private checkSerial(){
        // Call the API to check if the serial checks out.
    }

    private saveOptions(){
        Main.saveClientSerial(this.serialInput.val());
        console.log(Main.getClientSerial());
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

    new Main();

    if(pathname == "/src/browser_action/browser_action.html"){
        new OptionsPage();
    }

});