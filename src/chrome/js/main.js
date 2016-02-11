var ChromeHandler = (function () {
    function ChromeHandler() {
    }
    ChromeHandler.prototype.getStorageVariable = function (key) {
        return window.localStorage.getItem(key);
    };
    ChromeHandler.prototype.setStorageVariable = function (key, value) {
        window.localStorage.setItem(key, value);
    };
    return ChromeHandler;
})();
var Main = (function () {
    function Main() {
        if (navigator.appVersion.indexOf('Chrome/') > 0) {
            this.browserType = 0 /* Chrome */;
            Main.browser = new ChromeHandler();
        }
    }
    Main.getClientSerial = function () {
        return Main.browser.getStorageVariable("client_serial");
    };
    Main.saveClientSerial = function (serial) {
        Main.browser.setStorageVariable("client_serial", serial);
    };
    return Main;
})();
var OptionsPage = (function () {
    function OptionsPage() {
        var _this = this;
        this.body = $("body");
        this.submitButton = $("#iro-login__submit");
        this.serialInput = $("#iro-login__serial");
        this.apiInput = $("#iro-login__api-url");
        this.submitButton.on('click', function () {
            if (_this.validateOptions() && _this.checkSerial()) {
                _this.saveOptions();
            }
        });
        var clientSerial = Main.getClientSerial();
        this.serialInput.val(clientSerial);
    }
    OptionsPage.prototype.validateOptions = function () {
        var serial = this.serialInput.val();
        var apiUrl = this.apiInput.val();
        var formGroup = this.serialInput.parent();
        /*
         * Serial Number
         */
        if (serial.length == 0) {
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
        if (apiUrl.length == 0) {
            formGroup.addClass('has-error');
        }
        else {
            formGroup.addClass('has-success');
            this.apiUrl = apiUrl;
        }
    };
    OptionsPage.prototype.checkSerial = function () {
        // Call the API to check if the serial checks out.
    };
    OptionsPage.prototype.saveOptions = function () {
        Main.saveClientSerial(this.serialInput.val());
        console.log(Main.getClientSerial());
    };
    return OptionsPage;
})();
$(function () {
    var pathname = window.location.pathname;
    var localStorageKey = ['client_serial'];
    for (var i = 0, length_1 = localStorageKey.length; i < length_1; ++i) {
        if (typeof localStorage[localStorageKey[i]] === "undefined") {
            window.localStorage.setItem(localStorageKey[i], "");
        }
    }
    new Main();
    if (pathname == "/src/browser_action/browser_action.html") {
        new OptionsPage();
    }
});
//# sourceMappingURL=main.js.map