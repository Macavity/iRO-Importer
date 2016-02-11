
import {IBrowserHandler} from "./BrowserHandler";

export default class ChromeHandler implements IBrowserHandler {
    public getStorageVariable(key): any{
        return window.localStorage.getItem(key);
    }

    public setStorageVariable(key, value): void{
        window.localStorage.setItem(key, value);
    }
}