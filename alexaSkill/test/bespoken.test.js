let AWS = require("aws-sdk");
const assert = require("chai").assert;
const va = require("virtual-alexa");

AWS.config.update( {region: "us-east-1"} );
const alexa = va.VirtualAlexa.Builder()
    .handler("./index.handler") // Lambda function file and name
    .interactionModelFile("./models/en-US.json") // OPTIONAL
    .create();


alexa.dynamoDB().mock();

const dynamo = new AWS.DynamoDB();
const putParams = {
    TableName: "pathfinderSpellsTable",
    Item: {
        name: {
            "S": "magic missile"
        },
        description_short: {
            "S": "short description for magic missile"
        }
    }
};

dynamo.putItem(putParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});

describe("Accessing the mocked dynamo database", () => {
    it("can read an item 'loaded' into the db", async () => {
        const { response } = await alexa.intend("SpellIntent", { "spell": "magic missile" });
        assert.include(response.outputSpeech.ssml, "Your spell is magic missile, and it does this: short description for magic missile");
    })
});