var AWS = require('aws-sdk');
const _ = require("lodash")
const helper = require('../services/helperFunctions.js');

AWS.config.update({region: 'us-east-1'});
var docClient = new AWS.DynamoDB.DocumentClient();

const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "SpellIntent")
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const updatedIntent = handlerInput.requestEnvelope.request.intent;

        if (helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.spell)) { // if user provides a spell slot value, query it
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
                            // TODO: add if logic to determine which output path
                            // FIXME: Need to change name of "detail" slot to something better
                            // if (no detail slot) {

                            sessionAttributes.currentSpell = data.Item;
                            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                            const speechText = requestAttributes.t("SPELL_FOUND", {spellName: data.Item.name, spellDescriptionShort: data.Item.description_short});
                            const reprompt = requestAttributes.t("SPELL_FOUND_REPROMPT", {spellName: data.Item.name});
                            return resolve(handlerInput.responseBuilder
                                .speak(speechText)
                                .reprompt(reprompt)
                                .getResponse());
                            
                            // } else if (detail slot provided) {
                                // may want to port to the SpellDetailsIntent instead of handling here???
                            // TODO: if a detail slot is provided, the skill should output the requested spell's attribute & then prompt for more
                                // call the helper.returnSpellAttributeSpeech() function to get the speech output
                            // }

                            // port to summnoning if requested?

                        } else {
                            return resolve(handlerInput.responseBuilder
                                .speak(requestAttributes.t("SPELL_NOT_FOUND", {providedSpell: slot}))
                                .reprompt(requestAttributes.t("SPELL_NOT_FOUND_REPROMPT"))
                                .addElicitSlotDirective("spell", updatedIntent)
                                .getResponse());
                        }
                    }
                });

            });
        } else { // user did not provide spell slot value
            const speechText = _.sample(requestAttributes.t("SPELL_ASK"));
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(requestAttributes.t("SPELL_NOT_FOUND_REPROMPT"))
                .addElicitSlotDirective("spell", updatedIntent)
                .getResponse();
        }
    }
};

const SpellDetailsIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "SpellDetailsIntent")
    },
    handle(handlerInput) {
        // After spell output, user is prompted for what attributes they want.
        // If there is a currentSpell in the session attributes, continue with intent
        // if not, send user to SpellIntent to grab the spell

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        if (sessionAttributes.currentSpell) {
            // start elicting the detail/category
            // FIXME: Need to change name of "detail" slot to something better
            // TODO: call the helper.returnAttributeSpeech() function to get the speech output, then prompt for more
        } else {
            // send user to SpellIntent to grab the spell & save it to session
            return SpellIntentHandler.handle(handlerInput)
        }
    }
};

module.exports = {
    SpellIntentHandler,
    SpellDetailsIntentHandler
}