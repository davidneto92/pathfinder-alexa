const alexaTest = require("alexa-skill-test-framework");
const TestUtils = require("./TestUtils");
TestUtils.Init();

describe("LaunchRequest received, ", () => {
    describe("returns correct welcome response", () => {
        alexaTest.test([{
            request: alexaTest.getLaunchRequest(),
            shouldEndSession: false,
            saysLike: "Welcome to the Pathfinder Spell companion. I provide information on the many arcane abilities found in Golarion. What spell would you like to hear about?"
        }]);
    });

});