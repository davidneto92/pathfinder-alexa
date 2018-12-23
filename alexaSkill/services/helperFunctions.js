const _ = require("lodash");
const languageStrings = require("../resources/languageStrings");

function slotValue(intentWithSlot) {
    if (intentWithSlot.resolutions && intentWithSlot.resolutions.resolutionsPerAuthority[0].values) {
        return intentWithSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name
    } else if (intentWithSlot.value) {
        if (intentWithSlot.value === '') {
            return false
        } else {
            return intentWithSlot.value
        }
    } else {
        return false;
    }
};

// This function returns the string (from the requestAttributes) with data that corresponds to the provided spellDetail.
function returnSpellAttributeSpeech(spell, spellDetail) {
    // include handling for "i don't know" slot
    let speechText;
    let reprompt;

    // initial support for
    // range, casting time, school, saving throw

    if (spellDetail === "range") {
        speechText = spell.range;
        reprompt = "blah";
    } else if (spellDetail === "") {

    }

    return { speechText: speechText, reprompt: reprompt };
};

function generateSpellLevelSpeech(spell) {
    // reads through the spell_levels object to generate output for which classes & levels may cast a spell
};

function generateSpellRequirements(spell) {
    // reads through the spell_requirements object to generate FVSM components string
};

function checkIfSummoning(spell) {
    // check if the spell being asked about is a valid summoning spell
    // if true, return summoning data
        // {speechText: x spell can is summoning spell, summons: [array of possible summons]}
    // if it's not a summoning spell, return false
};

function numeralConversion(speechText) {
    // modifies speechOutput to be sure roman numerals are spoken correctly
};
module.exports = {
    slotValue,
    returnSpellAttributeSpeech,
    checkIfSummoning
};