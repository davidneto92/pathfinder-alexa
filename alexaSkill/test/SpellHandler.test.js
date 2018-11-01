const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
const languageStrings = require("../resources/languageStrings")
TestUtils.Init();

describe("Enter SpellIntent", () => {
    describe("returns spell name and info about provided spell", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("SpellIntent", {spell: "protection from evil"}),
            saysLike: languageStrings.en.translation.SPELL_ASK,
            shouldEndSession: true
        }]);
    });

});