const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
const languageStrings = require("../resources/languageStrings")
TestUtils.Init();

describe("SessionEndedRequest received, ", () => {
    describe("should say goodbye to user if user initiated the request", () => {
        alexaTest.test([{
            request: alexaTest.getSessionEndedRequest("USER_INITIATED"),
            shouldEndSession: true
        }]);
    });

    describe("should say goodbye to user if max reprompts exceeded", () => {
        alexaTest.test([{
            request: alexaTest.getSessionEndedRequest("EXCEEDED_MAX_REPROMPTS"),
            shouldEndSession: true
        }]);
    });

});

describe("User issues cancel or stop intent, ", () => {
    describe("should say goodbye and end session", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("AMAZON.CancelIntent"),
            saysLike: languageStrings.en.translation.GOODBYE,
            shouldEndSession: true
        }]);
    });

    describe("should say goodbye and end session", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("AMAZON.StopIntent"),
            saysLike: languageStrings.en.translation.GOODBYE,
            shouldEndSession: true
        }]);
    });
});

describe("Help intent", () => {
    describe("should return relevant help dialog", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("AMAZON.HelpIntent"),
            saysLike: languageStrings.en.translation.HELP,
            shouldEndSession: false
        }]);
    });
});

describe("Fallback intent", () => {
    describe("should return relevant fallback dialog", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("AMAZON.FallbackIntent"),
            says: languageStrings.en.translation.FALLBACK,
            shouldEndSession: true
        }]);
    });
});