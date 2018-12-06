const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
const languageStrings = require("../resources/languageStrings")
TestUtils.Init();

describe("Enter SpellIntent", () => {
    describe("returns spell name and info about provided spell", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("SpellIntent", {spell: "protection from evil"}),
            saysLike: "Your spell is protection from evil, and it does this: +2 to AC and saves, plus additional protection against selected alignment.. What else would you like to know about this spell?",
            shouldEndSession: false
        }]);
    });

    describe("asks user to provide a spell", () => {
        alexaTest.test([{
            request: alexaTest.getIntentRequest("SpellIntent", {spell: ""}),
            saysLike: languageStrings.en.translation.SPELL_ASK,
            shouldEndSession: false
        }]);
    });

});