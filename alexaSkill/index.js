const Alexa = require('ask-sdk-core');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const { LocalizationRequestInterceptor } = require("./interceptors/LocalizationRequestInterceptor")
const { DebugRequestInterceptor } = require("./interceptors/DebugRequestInterceptor")
const { DebugResponseInterceptor } = require("./interceptors/DebugResponseInterceptor")
const standardHandlers = require("./handlers/standardHandlers")
const spellHandlers = require("./handlers/spellHandlers")
const summoningHandler = require("./handlers/summoningHandler")

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
		summoningHandler.SummoningIntentHandler,
		spellHandlers.SpellIntentHandler,
		standardHandlers.HelpIntentHandler,
		standardHandlers.SessionEndedRequestHandler,
		standardHandlers.CancelAndStopIntentHandler,
		standardHandlers.LaunchIntentHandler,
		standardHandlers.FallbackHandler
	)
	.addRequestInterceptors(
		new LocalizationRequestInterceptor(),
		new DebugRequestInterceptor()
	)
	.addResponseInterceptors(
		new DebugResponseInterceptor()
	)
	.addErrorHandlers(standardHandlers.ErrorHandler)
	.lambda()