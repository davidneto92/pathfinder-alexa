var AWS = require('aws-sdk');
const _ = require("lodash");
const helper = require('../services/helperFunctions.js');

AWS.config.update({region: 'us-east-1'});
var docClient = new AWS.DynamoDB.DocumentClient();

const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "SpellIntent");
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
                            sessionAttributes.currentSpell = data.Item;
                            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)

                            // user provided a spellDetail, but not a spell, so once the spell is found given them the detail?
                            if (sessionAttributes.playDetails === true) {
                                delete sessionAttributes.playDetails
                                handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                                speechText
                                reprompt
                            } else {
                                // TODO: add tip, then logic to hear tip again once every 6 times
                                const speechText = `${requestAttributes.t("SPELL_FOUND", {spellName: data.Item.name, spellDescriptionShort: data.Item.description_short})} ${requestAttributes.t("SPELL_FOUND_ASK_FOR_DETAIL_PROMPT")}`;
                                const reprompt = requestAttributes.t("SPELL_FOUND_REPROMPT", {spellName: data.Item.name});
                                return resolve(handlerInput.responseBuilder
                                    .addElicitSlotDirective("spellDetail", {
                                        name: "SpellDetailsIntent",
                                        confirmationStatus: "NONE",
                                        slots: {}
                                    })
                                    .speak(speechText)
                                    .reprompt(reprompt)
                                    .getResponse());
                            }

                        } else {
                            const speechText = requestAttributes.t("SPELL_NOT_FOUND", {providedSpell: slot});
                            const reprompt = requestAttributes.t("SPELL_NOT_FOUND_REPROMPT");
                            return resolve(handlerInput.responseBuilder
                                .speak(speechText)
                                .reprompt(reprompt)
                                .addElicitSlotDirective("spell", updatedIntent)
                                .getResponse());
                        }
                    }
                });

            });
        } else { // user did not provide spell slot value
            const speechText = _.sample(requestAttributes.t("SPELL_ELICIT"));
            const reprompt = requestAttributes.t("SPELL_NOT_FOUND_REPROMPT");
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(reprompt)
                .addElicitSlotDirective("spell", updatedIntent)
                .getResponse();
        }
    }
};

const SpellDetailsIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "SpellDetailsIntent");
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const updatedIntent = handlerInput.requestEnvelope.request.intent;

        if (sessionAttributes.currentSpell) { // a spell has been found for the session
            const currentSpell = sessionAttributes.currentSpell;
            
            if (helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.spellDetail)) {
                const spellDetail = helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.spellDetail)
                
                if (spellDetail === "nothing") {
                    return handlerInput.responseBuilder
                        .speak(requestAttributes.t("DETAIL_FOUND_NOTHING"))
                        .withShouldEndSession(true)
                        .getResponse();
                } else if (spellDetail === "don't know") {
                    // if spellDetail === I dont know, delete slot value, tell user what they can ask for, and elicit slot
                    // list the options/details a user can ask for
                } else {
                    const speech = helper.returnSpellDetailSpeech(currentSpell, spellDetail, requestAttributes);
    
                    return handlerInput.responseBuilder
                        .speak(speech.speechText)
                        .reprompt(speech.reprompt)
                        .getResponse();
                }

            } else {
                const speechText = _.sample(requestAttributes.t("DETAIL_ELICIT", {spellName: currentSpell.name}));
                const reprompt = requestAttributes.t("DETAIL_ELICIT_REPROMPT");
                return handlerInput.responseBuilder
                    .speak(speechText)
                    .reprompt(reprompt)
                    .addElicitSlotDirective("spellDetail", updatedIntent)
                    .getResponse();
            }

        } else { // no spell exists in session, so send the user to the SpellIntent to fetch it
            const speechText = `${requestAttributes.t("DETAIL_NO_SPELL_IN_SESSION")} ${_.sample(requestAttributes.t("SPELL_ELICIT"))}`
            const reprompt = _.sample(requestAttributes.t("SPELL_ELICIT"))

            return handlerInput.responseBuilder
                .addElicitSlotDirective("spell", {
                    name: "SpellIntent",
                    confirmationStatus: "NONE",
                    slots: {}
                })
                .speak(speechText)
                .reprompt(reprompt)
                .getResponse();
        }
    }
};

// yesMoreDetailsIntent
    // port to spellDetails
// noMoreDetailsIntent
    // close the skill

// list details intent? then route to spell handler or details?

module.exports = {
    SpellIntentHandler,
    SpellDetailsIntentHandler
}