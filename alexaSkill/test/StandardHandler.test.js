const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
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
            saysLike: "Come back soon, binch!",
            shouldEndSession: true
        }]);
    });

    describe("should say goodbye and end session", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("AMAZON.StopIntent"),
            saysLike: "Come back soon, binch!",
            shouldEndSession: true
        }]);
    });
});

describe("Help intent", () => {
    describe("should return relevant help dialog", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("AMAZON.HelpIntent"),
            saysLike: "This skill tells you about spells. Now, ask me about one.",
            shouldEndSession: false
        }]);
    });
});

describe("Fallback intent", () => {
    describe("should return relevant fallback dialog", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("AMAZON.FallbackIntent"),
            says: "I'll be honest, that was a very dumb question.",
            shouldEndSession: true
        }]);
    });
});