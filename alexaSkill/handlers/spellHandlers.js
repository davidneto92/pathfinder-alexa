var AWS = require('aws-sdk');
const _ = require("lodash")
const helper = require('../services/helperFunctions.js');

AWS.config.update({region: 'us-east-1'});
var docClient = new AWS.DynamoDB.DocumentClient();

const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SpellIntent')
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const updatedIntent = handlerInput.requestEnvelope.request.intent;

        if (handlerInput.requestEnvelope.request.dialogState === "COMPLETED") {
        // if (helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.spell)) { // if user provides a spell slot value, query it
            const slot = helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.spell);
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
                            sessionAttributes.currentSpell = data.Item;
                            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                            const speechText = requestAttributes.t("SPELL_FOUND", {spellName: data.Item.name, spellDescriptionShort: data.Item.description_short});
                            const reprompt = requestAttributes.t("SPELL_FOUND_REPROMPT", {spellName: data.Item.name});
                            return resolve(handlerInput.responseBuilder
                                .speak(speechText)
                                .reprompt(reprompt)
                                .getResponse());
                        } else {
                            return resolve(handlerInput.responseBuilder
                                // .speak(requestAttributes.t("SPELL_NOT_FOUND", {slot: providedSpell}))
                                // .reprompt(requestAttributes.t("SPELL_NOT_FOUND_REPROMPT"))
                                // .addElicitSlotDirective("spell", updatedIntent)
                                .addDelegateDirective(updatedIntent)
                                .getResponse());
                        }
                    }
                });

            })
        } else { // user did not provide spell slot value
            // const updatedIntent = handlerInput.requestEnvelope.request.intent;
            return handlerInput.responseBuilder
                // .speak( _.sample(requestAttributes.t("SPELL_ASK")) )
                // .reprompt(requestAttributes.t("SPELL_NOT_FOUND_REPROMPT"))
                // .addElicitSlotDirective("spell", updatedIntent)
                .addDelegateDirective(updatedIntent)
                .getResponse();
        }
    }
};

const MoreDetailsIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'MoreDetailsIntent')
    },
    handle(handlerInput) {
        // After spell output, user is prompted for what attributes they want

        // If a currentSpell exists in the session attributes, continue
        // if not, port user to SpellIntent to grab the spell?
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        if (sessionAttributes.currentSpell) {

        } else {
            // sends user to SpellIntent
        }
    }
};

// yes intent?
// no intent?

module.exports = {
    SpellIntentHandler,
    MoreDetailsIntentHandler
}