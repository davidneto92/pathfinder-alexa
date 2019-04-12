"use strict";

// <break time="3s"/>

module.exports = {
    "en": {
        "translation": {
            "WELCOME": "Welcome to the Pathfinder Spell companion. I can provide information on the many arcane abilities found throughout Golarion.",
            "WELCOME_REPROMPT": "What spell would you like to hear about?",
            // "WELCOME_RETURN_USER": "Welcome to the Pathfinder Spell companion. I can provide information on the many arcane abilities found throughout Golarion.",
            "HELP": "This skill can give players information on the magical spells used throughout the Pathfinder role playing game. You can first find a spell by saying, tell me about, followed by the spell name. What can I tell you about?",
            "HELP_REPROMPT": "What spell are you gonna ask me about?",
            // add more closing lines
            "GOODBYE": "Come back soon when you need help with a spell!",
            "FALLBACK": "I'm not sure what you're asking about.",

            "SPELL_ELICIT": [
                "What spell do you want to know about?",
                "What spell would you like to know about?",
                "What's the spell you're looking for?",
                "Which spell can I tell you about?",
                "Which spell do you want to know about?",
                "Which spell would you like to hear about?"
            ],
            "SPELL_FOUND": "I found the spell, {{spellName}}, and here's {{lengthText}} description: <break time=\"500ms\"/> <prosody rate=\"95%\">{{spellDescriptionShort}}.</prosody> {{footer}}",
            // Need logic for tip. Maybe 1st time launch, then 1/5 times after 
            // "SPELL_FOUND_TIP": "I can also tell you the other characteristics, such as it's range or saving throw.",
            "SPELL_FOUND_ASK_FOR_DETAIL_PROMPT": "What else would you like to know about this spell?",
            "SPELL_FOUND_REPROMPT": "What else can I tell you about {{spellName}}?",
            "SPELL_NOT_FOUND": "Hmm, I couldn't find {{providedSpell}}. What's the spell you're looking for again?",
            "SPELL_NOT_FOUND_REPROMPT": "If you tell me the name of a spell, I can give you all sorts of information. What spell would you like to learn about?",

            "DETAIL_ELICIT": [
                "What would you like to know about that spell?",
                "What can I tell you about {{spellName}}?",
                "What are you looking for on {{spellName}}",
            ],
            "DETAIL_ELICIT_REPROMPT": "I can tell you about a few other features of {{spellName}}, such as x y z. What would you like to know about this spell?",
            "DETAIL_FOUND_NOTHING": "Okay then, come back soon when you need help with a spell!",
            // "DETAIL_FOUND_HEADER": "",
            "DETAIL_FOUND_RANGE": "The range of {{spellName}} is: {{spellRange}}",
            "DETAIL_FOUND_RANGE_REPROMPT": "The range is: {{spellRange}}",
            "DETAIL_FOUND_CASTING_TIME": "The casting time for {{spellName}} is: {{spellCastingTime}}",
            "DETAIL_FOUND_CASTING_TIME_REPROMPT": "The casting time is: {{spellCastingTime}}",
            "DETAIL_FOUND_NO_SAVING_THROW": "{{spellName}} does not have a saving throw",
            "DETAIL_FOUND_NO_SAVING_THROW_REPROMPT": "There is no saving throw for {{spellName}}.",
            "DETAIL_FOUND_SAVING_THROW": "The saving throw for {{spellName}} is: {{savingThrow}}",
            "DETAIL_FOUND_SAVING_THROW_REPROMPT": "The saving throw is: {{savingThrow}}",
            "DETAIL_FOUND_SAVING_THROW_SEE_TEXT": "<break time=\"250ms\"/> For the specifics of this save, ask me for the full description.",
            "DETAIL_FOUND_SAVING_THROW_SEE_TEXT_ONLY": "For a more information on the save for {{spellName}}, ask me for the full description.",
            "DETAIL_FOUND_FULL_DESCRIPTION": "The full text for {{spellName}} is as follows: {{spellDescription}}",
            "DETAIL_FOUND_FULL_DESCRIPTION_REPROMPT": "To hear the full text of {{spellName}} again, ask me for the full description.",
            "DETAIL_FOUND_SCHOOL": "The spell {{spellName}} belongs to the {{spellSchool}} school.",
            "DETAIL_FOUND_SCHOOL_REPROMPT": "{{spellName}} is as {{spellSchool}} spell.",
            "DETAIL_FOUND_SPELL_REQUIREMENTS_ONE" : "{{spellName}} has only a {{componentList}} component.",
            "DETAIL_FOUND_SPELL_REQUIREMENTS_TWO" : "{{spellName}} has a {{componentList}} component.",
            "DETAIL_FOUND_SPELL_REQUIREMENTS_MORE": "{{spellName}} has {{componentList}} components.",


            "DETAIL_FOUND_FOLLOW_UP": [
                "What else did you want to know about {{spellName}}?",
                "What else do you want to know?",
                "What else can I tell you about {{spellName}}?",
                "What other details would you like to hear?"
            ],
            "DETAIL_FOUND_FOLLOW_UP_REPROMPT": "you can ask for other details such as x y z. what do you want?",
            "DETAIL_NO_SPELL_IN_SESSION": "Before I can tell you specific spell details, you need to provide a spell.",
            // "DETAIL_NO_SPELL_IN_SESSION_REPROMPT": "",
            // "DETAIL_NOT_FOUND": "that's not something you can ask for!" ????

            "SUMMON_ASK": "",
            "SUMMON_ASK_REPROMPT": "",
            "SUMMON_FOUND": "",
            "SUMMON_FOUND_REPROMPT": "",
            "SUMMON_SPELL_NOT_VALID": "this isn't a summoning spell",
            "SUMMON_SPELL_NOT_VALID_REPROMPT": "you need to ask about a different spell!",
        }
    }
}