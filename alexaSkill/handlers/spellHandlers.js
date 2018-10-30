var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
// var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var docClient = new AWS.DynamoDB.DocumentClient();


const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SpellIntent')
    },
    async handle(handlerInput) {
        const speechText = "Eventually this intent will tell you about the provided spell."

        params = {
            TableName: "pathfinderSpellsTable",
            Key: {
                "id": 23
            }
        };
        
        await docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                return handlerInput.responseBuilder
                    .speak(`here is your data: ${data.Item.name}`)
                    .withShouldEndSession(true)
                    .getResponse();
            }
        });
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = {
    SpellIntentHandler
}