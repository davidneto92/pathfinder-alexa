const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
const languageStrings = require("../resources/languageStrings")
TestUtils.Init();

describe("Enter SpellIntent", () => {
    describe("returns dummy message", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("SpellIntent"),
            saysLike: languageStrings.en.translation.SPELL_ASK,
            shouldEndSession: true
        }]);
    });

});