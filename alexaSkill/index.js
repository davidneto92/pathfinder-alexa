const Alexa = require('ask-sdk');

const {DebugRequestInterceptor} = require("./interceptors/DebugRequestInterceptor")
const {DebugResponseInterceptor} = require("./interceptors/DebugResponseInterceptor")
const standardHandlers = require("./handlers/standardHandlers")

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
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
		new DebugResponseInterceptor()
	)
	.addErrorHandlers(standardHandlers.ErrorHandler)
	.lambda()