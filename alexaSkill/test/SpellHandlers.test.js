const assert = require("chai").assert;
const _ = require("lodash");
const va = require("virtual-alexa");
const languageStrings = require("../resources/languageStrings");
const sampleSpells = require("./sampleSpells");

function cleanSSML(ssml) {
    return _.replace(ssml, "<speak>", "").replace("</speak>", "");
};

// currently replacing only 1 attribute, need to improve to allow multiple replacements
function containsOne(response, speechArray, variable, replaceWith) {
    response = cleanSSML(response);
    for (let i = 0; i < speechArray.length; i++) {
        if (typeof variable !== "undefined") {
            speechArray[i] = _.replace(speechArray[i], variable, replaceWith)
        }
        if (response.includes(speechArray[i])) return true;
    };
};

const alexa = va.VirtualAlexa.Builder()
    .handler("./index.handler") // Lambda function file and name
    .interactionModelFile("./models/en-US.json") // OPTIONAL
    .create();
    // alexa.dynamoDB().mock();


describe("Launch Request", () => {
    it("Standard welcome message", async () => {
        const { response } = await alexa.launch();
        alexa.endSession();
        assert.include(response.outputSpeech.ssml, languageStrings.en.translation.WELCOME);
        assert.include(response.reprompt.outputSpeech.ssml, languageStrings.en.translation.WELCOME_REPROMPT);
    });
});

describe("SpellIntent", () => {
    beforeEach(() => {
        alexa.endSession();
    });

    it("will prompt the user for a spell if none provided", async () => {
        const { response } = await alexa.intend("SpellIntent");
        assert.isTrue(containsOne(response.outputSpeech.ssml, languageStrings.en.translation.SPELL_ELICIT));
    });

    it.skip("will return speech if the provided spell could not be found", async () => {
        const { response } = await alexa.intend("SpellIntent", { spell: "big time whale" });
        assert.include(response.outputSpeech.ssml, "Hmm, I couldn't find big time whale. What's the spell you're looking for again?");
    });

    /* will probably need to mock the dynamo call to make this work...
    / ... and switch to using the DynamoDB class vs DocumentClient */
    it.skip("will return information about the spell if a match is found", async () => {
        const response = await alexa.intend("SpellIntent", { "spell": "protection from evil" });
        assert.include(response.outputSpeech.ssml, "Which spell did you want?");
    });
});

describe("MoreDetailsIntent", () => {
    beforeEach( async () => {
        alexa.endSession();
        await alexa.resetFilter();
    });

    it("sends user to SpellIntent if no spell saved to session", async () => {
        const { response } = await alexa.intend("SpellDetailsIntent");
        assert.isTrue(containsOne(response.outputSpeech.ssml, languageStrings.en.translation.SPELL_ELICIT));
    });

    it("asks user to provide a spellDetail if none given", async () => {
        await alexa.filter((payload) => {
            payload.session.attributes = {
                currentSpell: sampleSpells.sampleOne
            }
		});

        const { response } = await alexa.intend("SpellDetailsIntent");
        assert.isTrue(containsOne(response.outputSpeech.ssml, languageStrings.en.translation.DETAIL_ASK, "{{spellName}}", sampleSpells.sampleOne.name));
        await alexa.resetFilter();
    });
    
    it("can return a given spell detail with spell known and slot filled", async () => {
        await alexa.filter((payload) => {
            payload.session.attributes = {
                currentSpell: sampleSpells.sampleOne
            }
        });
        
        const { response } = await alexa.intend("SpellDetailsIntent", {spellDetail: "range"});
        assert.include(response.outputSpeech.ssml, "The range of protection from evil is: touch");
        await alexa.resetFilter();
    });
});