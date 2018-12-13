const assert = require("chai").assert;
const _ = require("lodash");
const va = require("virtual-alexa");
const languageStrings = require("../resources/languageStrings");

function cleanSSML(ssml) {
    return _.replace(ssml, "<speak>", "").replace("</speak>", "");
};

function containsOne(response, array) {
    response = cleanSSML(response);
    for (let i = 0; i < array.length; i++) {
        if (response.includes(array[i])) return true;
    };
};

const alexa = va.VirtualAlexa.Builder()
    .handler("./index.handler") // Lambda function file and name
    .interactionModelFile("./models/en-US.json") // OPTIONAL
    .create();

// alexa.dynamoDB().mock();


describe("Launch Request", () => {
    afterEach(() => {
        alexa.endSession();
    });

    it("Standard welcome message", async () => {
        const { response } = await alexa.launch();
        alexa.endSession();
        assert.include(response.outputSpeech.ssml, languageStrings.en.translation.WELCOME);
        assert.include(response.reprompt.outputSpeech.ssml, languageStrings.en.translation.WELCOME_REPROMPT);
    });
});

describe("SpellIntents", () => {
    afterEach(() => {
        alexa.endSession();
    });
    
    it("will prompt the user for a spell if none provided", async () => {
        const { response } = await alexa.intend("SpellIntent");
        assert.isTrue(containsOne(response.outputSpeech.ssml, languageStrings.en.translation.SPELL_ASK));
    });

    it.only("will return speech if the provided spell could not be found", async () => {
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

// describe.skip("Using slots and filters", () => {
//     it("enters the interestingIntent without a slot", async () => {
//         const { response } = await alexa.intend("InterestingIntent");
//         assert.include(response.outputSpeech.ssml, languageStrings.en.translation.INTERESTING_NO_MOD);
//     });

//     it("enters the interestingIntent with a slot", async () => {
//         const { response } = await alexa.intend("InterestingIntent", {"modifier": "first"});
// 		assert.include(response.outputSpeech.ssml, languageStrings.en.translation.INTERESTING_FIRST_MOD);
//     });

//     it("using filter to modify slot value before entering interestingIntent", async () => {
//         await alexa.filter(function (payload) {
//             payload.request.intent.slots.modifier.resolutions = {
//                 resolutionsPerAuthority: [
//                     {
//                         authority: "amzn1.er-authority.echo-sdk.<skill-id>.MODIFIER",
//                         status: {
//                             code: "ER_SUCCESS_MATCH"
//                         },
//                         values: [
// 							{
// 								value: {
// 									name: "second"
// 								}
// 							}
// 						]
//                     }
//                 ]
//             }
// 		});

//         const { response } = await alexa.intend("InterestingIntent", {"modifier": "third"});
// 		await alexa.resetFilter()
// 		assert.include(response.outputSpeech.ssml, languageStrings.en.translation.INTERESTING_SECOND_MOD);
//     });

//     it("using filter to modify a session attribute to trigger a specific response", async () => {
// 		await alexa.filter((payload) => {
// 			payload.session.attributes = { "secret": true, "returnUser": true }
//             console.log("Payload: " + JSON.stringify(payload, null, 2))
// 		});

//         const { response } = await alexa.intend("InterestingIntent");
// 		await alexa.resetFilter()
// 		assert.include(response.outputSpeech.ssml, languageStrings.en.translation.INTERESTING_SECRET);
//     });

//     it.only("entering an intent with an incorrect slot value should return error", async () => {
// 		await alexa.launch();
//         const { response } = await alexa.intend("InterestingIntent", {"modifier": ""});
//         assert.include(response.outputSpeech.ssml, languageStrings.en.translation.ERROR);
//     });

// });

// describe.skip("Testing delegate functionality", () => {
//     afterEach(() => {
//         alexa.endSession();
//     });

//     it("enters the album intent to start testing delegates", async () => {
//         const albumResponse = await alexa.intend("AlbumIntent", {"album": "Powerslave"});
//         assert.equal(albumResponse.skillResponse.directive("Dialog.Delegate").type, "Dialog.Delegate");
//         assert.equal(albumResponse.prompt, "Powerslave was recorded by who?");
//         const artistResponse = await alexa.intend("AlbumIntent", {"artist": "iron maiden"});
//         assert.include(artistResponse.response.outputSpeech.ssml, "I'm glad you picked Powerslave by iron maiden, it's one of my favorites.");
//     });

//     it("will get any missing slots independent of order", async () => {
//         const artistResponse = await alexa.intend("AlbumIntent", {"artist": "iron maiden"});
//         assert.equal(artistResponse.prompt, "what's the album?");
//     });

//     it("will get initial slot if none originally provided", async () => {
//         const noSlotsResponse = await alexa.intend("AlbumIntent");
//         assert.equal(noSlotsResponse.prompt, "what's the album?");
//     });
// });

// describe.skip("Testing with utterances", () => {
//     it("can handle launching intents with utterances", async () => {
//         const { response } = await alexa.utter("use the second one");
//         assert.include(response.outputSpeech.ssml, languageStrings.en.translation.INTERESTING_SECOND_MOD);
//     });
// });