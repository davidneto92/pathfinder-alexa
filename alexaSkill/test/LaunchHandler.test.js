const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
const languageStrings = require("../resources/languageStrings")
TestUtils.Init();

describe("LaunchRequest received, ", () => {
    describe("returns correct welcome response", () => {
        alexaTest.test([{
            request: alexaTest.getLaunchRequest(),
            shouldEndSession: false,
            saysLike: languageStrings.en.WELCOME
        }]);
    });

});