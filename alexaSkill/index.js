const Alexa = require('ask-sdk');

const { LocalizationRequestInterceptor } = require("./interceptors/LocalizationRequestInterceptor")
const { DebugRequestInterceptor } = require("./interceptors/DebugRequestInterceptor")
const { DebugResponseInterceptor } = require("./interceptors/DebugResponseInterceptor")
const standardHandlers = require("./handlers/standardHandlers")
const spellHandlers = require("./handlers/spellHandlers")
const languageStrings = require("./resources/languageStrings")

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
		spellHandlers.SpellIntentHandler,
		standardHandlers.HelpIntentHandler,
		standardHandlers.SessionEndedRequestHandler,
		standardHandlers.CancelAndStopIntentHandler,
		standardHandlers.LaunchIntentHandler,
		standardHandlers.FallbackHandler
	)
	.addRequestInterceptors(
		new DebugRequestInterceptor()
	)
	.addResponseInterceptors(
		new LocalizationRequestInterceptor(),
		new DebugResponseInterceptor()
	)
	.addErrorHandlers(standardHandlers.ErrorHandler)
	.initializeI18N(languageStrings)
	.lambda()