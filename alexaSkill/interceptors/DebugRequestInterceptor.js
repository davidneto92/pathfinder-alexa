"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let DebugRequestInterceptor = (function () {
    let DebugRequestInterceptor = function () {
    }
    DebugRequestInterceptor.prototype.process = function (handlerInput) {
        console.log("Received request: " + JSON.stringify(handlerInput, null, 2));
    };
    return DebugRequestInterceptor;
}());
exports.DebugRequestInterceptor = DebugRequestInterceptor;
