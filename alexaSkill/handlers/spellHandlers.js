var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SpellIntent')
    },
    handle(handlerInput) {
        return new Promise((resolve) => {
            params = {
                TableName: "pathfinderSpellsTable",
                Key: {
                    "id": 23
                }
            };

            docClient.get(params, function(err, data) {
                if (err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    if (data.Item) {
                        return resolve(handlerInput.responseBuilder
                            .speak(`Your spell is ${data.Item.name}`)
                            .withShouldEndSession(true)
                            .getResponse());
                    } else {
                        return resolve(handlerInput.responseBuilder
                            .speak(`I couldn't find that spell.`)
                            .withShouldEndSession(true)
                            .getResponse());
                    }
                }
            });
            
        })
    }
}

module.exports = {
    SpellIntentHandler
}