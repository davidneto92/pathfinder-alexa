const SpellIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SpellIntent')
    },
    handle(handlerInput) {
        const speechText = "Eventually this intent will tell you about the provided spell."

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = {
    SpellIntentHandler
}