const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
TestUtils.Init();

describe("Enter SpellIntent", () => {
    describe("returns dummy message", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("SpellIntent"),
            saysLike: "Eventually this intent will tell you about the provided spell.",
            shouldEndSession: true
        }]);
    });

});