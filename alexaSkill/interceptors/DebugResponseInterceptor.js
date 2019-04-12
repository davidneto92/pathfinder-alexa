"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let DebugResponseInterceptor = (function () {
    let DebugResponseInterceptor = function() {
    }
    DebugResponseInterceptor.prototype.process = function (handlerInput) {
        console.log("Sending response: " + JSON.stringify(handlerInput.responseBuilder.getResponse(), null, 2));
    };
    return DebugResponseInterceptor;
}());
exports.DebugResponseInterceptor = DebugResponseInterceptor;
