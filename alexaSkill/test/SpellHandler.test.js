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

    describe("asks user to provide a spell", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("SpellIntent", {spell: ""}),
            // saysLike: languageStrings.en.translation.SPELL_ASK,
            saysLike: "What GD spell do you want?",
            shouldEndSession: false
        }]);
    });

});