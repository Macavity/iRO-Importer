
import ChromeHandler from "./ChromeHandler";

export enum BrowserType {
    Chrome,
    Firefox,
    Safari
}

export interface IBrowserHandler {
    getStorageVariable(key):any;
    setStorageVariable(key,value):void;
}

const storageKeys = {
    api_url: "api_url",
    serial: "client_serial"
};

export class BrowserHandler {

    public browserType: BrowserType;
    public browser:IBrowserHandler;



    constructor(){
        if(navigator.appVersion.indexOf('Chrome/') > 0){
            this.browserType = BrowserType.Chrome;
            this.browser = new ChromeHandler();
        }
    }

    public getClientSerial(){
        return this.browser.getStorageVariable(storageKeys.serial);
    }

    public getApiUrl(){
        return this.browser.getStorageVariable(storageKeys.api_url);
    }

    public saveClientSerial(serial){
        this.browser.setStorageVariable(storageKeys.serial, serial);
    }

    public saveApiUrl(url){
        return this.browser.setStorageVariable(storageKeys.api_url, url);
    }
}