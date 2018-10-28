const Alexa = require('ask-sdk');
const assert = require("chai").assert;
const alexaTest = require("alexa-skill-test-framework");

const { DebugRequestInterceptor } = require("../interceptors/DebugRequestInterceptor")
const { DebugResponseInterceptor } = require("../interceptors/DebugResponseInterceptor")
const standardHandlers = require("../handlers/standardHandlers")
const spellHandlers = require("../handlers/spellHandlers")

function Init() {
    const main = {
        handler: Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                spellHandlers.SpellIntentHandler,
                standardHandlers.HelpIntentHandler,
                standardHandlers.SessionEndedRequestHandler,
                standardHandlers.CancelAndStopIntentHandler,
                standardHandlers.LaunchIntentHandler,
                standardHandlers.FallbackHandler
            )
            .addRequestInterceptors(
                new DebugRequestInterceptor()
            )
            .addResponseInterceptors(
                new DebugResponseInterceptor()
            )
            .addErrorHandlers(standardHandlers.ErrorHandler)
            .lambda()
    };
    alexaTest.initialize(main, "amzn1.ask.skill.this-is-mock-of-guid", "amzn1.ask.account.00000000000000420");
    // alexaTest.initializeI18N(languageStrings);
    alexaTest.setLocale("en-US");
    alexaTest.setExtraFeature("questionMarkCheck", false);
}

module.exports = {
    Init
};