const assert = require("chai").assert;
const va = require("virtual-alexa");
const languageStrings = require("../resources/languageStrings");

const alexa = va.VirtualAlexa.Builder()
    .handler("./index.handler") // Lambda function file and name
    .interactionModelFile("./models/en-US.json") // OPTIONAL
    .create();

describe("Launch Request", () => {
    it("Standard welcome message", async () => {
        const { response } = await alexa.launch();
        alexa.endSession();
        assert.include(response.outputSpeech.ssml, languageStrings.en.translation.WELCOME);
        assert.include(response.reprompt.outputSpeech.ssml, languageStrings.en.translation.WELCOME_REPROMPT);
    });
});