const helper = require("../services/helperFunctions.js");
const summoningData = require("../resources/summoningData.json").spells

function checkIfSummoning(spell) {
    // this spell should check if the spell being asked about is
}

const SummoningIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SummoningIntent');
    },
    handle(handlerInput) {
        let speechText;
        let reprompt;
		const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		const slot = helper.slotValue(handlerInput.requestEnvelope.request.intent.slots.modifier);

        // if slot matches a viable summoning spell OR spell in sessionAttributes matches
        if (`slot matches a viable slot || sessionAttributes.currentSpell != ""`) {
			speechText = requestAttributes.t("SUMMON_FOUND")
			reprompt = requestAttributes.t("SUMMON_FOUND_REPROMPT")
		} else {
			speechText = requestAttributes.t("SUMMON_ASK")
			reprompt = requestAttributes.t("SUMMON_ASK_REPROMPT")
		}

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .getResponse()
    }
};

module.exports = {
    SummoningIntentHandler
}