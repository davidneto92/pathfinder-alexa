var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var docClient = new AWS.DynamoDB.DocumentClient();
const helper = require('../services/helperFunctions.js');

const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SpellIntent')
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        // if user provides spell slot value, query it
        if (helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.spell)) {
            const slot = helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.spell)
            return new Promise((resolve) => {
                params = {
                    TableName: "pathfinderSpellsTable",
                    Key: {
                        "name": slot
                    }
                };
    
                docClient.get(params, function(err, data) {
                    if (err) {
                        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        if (data.Item) {
                            // TODO: save the found spell to the session
                            const speechText = requestAttributes.t("SPELL_FOUND", {spellName: data.Item.name, spellDescriptionShort: data.Item.description_short});
                            const reprompt = requestAttributes.t("SPELL_FOUND_REPROMPT", {spellName: data.Item.name});

                            return resolve(handlerInput.responseBuilder
                                .speak(speechText)
                                .reprompt(reprompt)
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
        } else { // user did not provide spell slot value
            return handlerInput.responseBuilder
                .speak(requestAttributes.t("SPELL_ASK"))
                .reprompt(requestAttributes.t("SPELL_ASK_REPROMPT"))
                .getResponse();
        }        
    }
}

module.exports = {
    SpellIntentHandler
}