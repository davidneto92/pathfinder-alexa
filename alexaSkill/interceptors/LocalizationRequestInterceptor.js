"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i18next = require("i18next");
let sprintf = require("i18next-sprintf-postprocessor");

let data = require("../resources/languageStrings");
let LocalizationRequestInterceptor = (function () {
    let LocalizationRequestInterceptor = function() {
    }
    LocalizationRequestInterceptor.prototype.process = function (handlerInput) {
        let localizationClient = i18next.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: data,
            returnObjects: true,
            interpolation: {
                escapeValue: false
            }
        });
        let attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    };
    return LocalizationRequestInterceptor;
}());
exports.LocalizationRequestInterceptor = LocalizationRequestInterceptor;