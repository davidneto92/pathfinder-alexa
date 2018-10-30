const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SpellIntent')
    },
    handle(handlerInput) {
        const speechText = "Eventually this intent will tell you about the provided spell."

        var params = {
            RequestItems: {
                "pathfinderSpellsTable": {
                    Keys: [{
                        "name": {
                            S: "acid arrow"
                        }
                    }],
                    ProjectionExpression: "school"
                }
            }
        };
        let data = dynamodb.batchGetItem(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
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