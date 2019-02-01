"use strict";

// <break time="3s"/>
// TODO: IMPROVE AND REVIEW ALL DIALOG

module.exports = {
    "en": {
        "translation": {
            "WELCOME": "Welcome to the Pathfinder Spell companion. I can provide information on the many arcane abilities found throughout Golarion. What can I help you with?",
            "WELCOME_REPROMPT": "What spell would you like to hear about?",
            "HELP": "This skill tells you about spells. Now, ask me about one.",
            "HELP_REPROMPT": "What spell are you gonna ask me about?",
            "GOODBYE": "Come back soon!",
            "FALLBACK": "I'm not sure what you're asking about.",

            // Should school be included?
            // "{{spellName}} is a {{spellSchool}} spell with the following effect: {{spellDescriptionShort}}. What else would you like to know about this spell?"

            // SPELL_FOUND + 1/5 chance of SPELL_FOUND_TIP + SPELL_FOUND_DETAIL_PROMPT
            "SPELL_FOUND": "Your spell is {{spellName}}, and it does this: {{spellDescriptionShort}}.",
            "SPELL_FOUND_TIP": "I can also tell about other characteristics of this spell, such as it's range or saving throw.",
            "SPELL_FOUND_DETAIL_PROMPT": "What else would you like to know about this spell?",

            "SPELL_FOUND_REPROMPT": "What else would you like to know about {{spellName}}?",
            "SPELL_NOT_FOUND": "Hmm, I couldn't find {{providedSpell}}. What's the spell you're looking for again?",
            "SPELL_NOT_FOUND_REPROMPT": "If you tell me the name of a spell, I can give you all sorts of information. What spell would you like to learn about?",
            "SPELL_ELICIT": [
                "What's the spell?",
                "What's the spell name?",
                "What's the name of the spell?",
                "What spell do you want to know about?",
                "Which spell did you want?",
                "Which spell is it?",
                "Which spell would you like?",
                "Which spell are you asking about?",
            ],

            // detail first time may want to give tips
            "DETAIL_ASK": [
                "What would you like to know about that spell?",
                "What can I tell you about {{spellName}}?",
                "What are you looking for on {{spellName}}",
            ],
            "DETAIL_ASK_REPROMPT": "I can tell you about a few different features of {{spellName}}, such as x y z. What would you like to know about this spell?",
            "DETAIL_FOUND_HEADER": "",
            "DETAIL_FOUND_RANGE": "The range of {{spellName}} is: {{spellRange}}",
            // should shorten
            "DETAIL_FOUND_RANGE_REPROMPT": "The range on {{spellName}} is: {{spellRange}}",
            "DETAIL_FOUND_FOLLOW_UP": [
                "What else did you want to know about {{spellName}}?",
                "What else do you want to know?",
                "What else can I tell you about {{spellName}}?",
                "What other details would you like to hear?"
            ],
            "DETAIL_FOUND_FOLLOW_UP_REPROMPT": "you can ask for other details such as x y z. what do you want?",

            "SUMMON_ASK": "",
            "SUMMON_ASK_REPROMPT": "",
            "SUMMON_FOUND": "",
            "SUMMON_FOUND_REPROMPT": "",
            "SUMMON_SPELL_NOT_VALID": "this isn't a summoning spell",
            "SUMMON_SPELL_NOT_VALID_REPROMPT": "you need to ask about a different spell!",
        }
    }
}