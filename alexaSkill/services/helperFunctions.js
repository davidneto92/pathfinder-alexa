const _ = require("lodash");

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

function getSlotIdByName(slotName, intent) {
    if (intent.slots[slotName].value === '') {
        return false
    } else {
        return intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values[0].value.id
    }
}

// This function returns the string (from the requestAttributes) with data that corresponds to the provided spellDetail.
// initial support for range, casting time, school, saving throw, i don't know
function returnSpellDetailSpeech(spell, spellDetailSlot, requestAttributes) {
    let speechText;
    let reprompt;

    if (spellDetailSlot === "range") {
        speechText = slashCorrection(requestAttributes.t("DETAIL_FOUND_RANGE", {"spellName": spell.name, "spellRange": spell.range}));
        reprompt = slashCorrection(requestAttributes.t("DETAIL_FOUND_RANGE_REPROMPT", {"spellRange": spell.range}));
    } else if (spellDetailSlot === "casting time") {
        speechText = slashCorrection(requestAttributes.t("DETAIL_FOUND_CASTING_TIME", {"spellName": spell.name, "spellCastingTime": spell.casting_time}));
        reprompt = slashCorrection(requestAttributes.t("DETAIL_FOUND_CASTING_TIME_REPROMPT", {"spellCastingTime": spell.casting_time}));
    } else if (spellDetailSlot === "saving throw") {
        if (spell.saving_throw === "none") {
            // special dialog if there is no save
        } else {
            // speechText = slashCorrection(requestAttributes.t("DETAIL_FOUND_RANGE", {"spellName": spell.name, "spellRange": spell.range}));
            // reprompt = slashCorrection("blah");
        }
    } else if (spellDetailSlot === "description") { // full description

    } else if (spellDetailSlot === "levels") {

    } else if (spellDetailSlot === "school") {
        
    } else if (spellDetailSlot === "components") {
        
    }

    return { "speechText": speechText, "reprompt": reprompt };
};

function generateSpellLevelSpeech(spell) {
    // reads through the spell_levels object to generate output for which classes & levels may cast a spell
};

function generateSpellRequirements(spell) {
    // reads through the spell_requirements object to generate FVSM components string
};

function checkIfSummoning(spell, requestAttributes) {
    // check if the spell being asked about is a valid summoning spell
    // if true, return summoning data
        // {speechText: x spell can is summoning spell, summons: [array of possible summons]}
    // if it's not a summoning spell, return false
};

function numeralConversion(speechText) {
    // modifies speechOutput to be sure roman numerals are spoken correctly
};

// corrects Alexa's "1 min slash level" to be "1 min PER level"
function slashCorrection(description) {
    return _.replace(description, "./level", " per level").replace("./2 levels", " per two levels").replace("./3 levels", " per three levels")
}

module.exports = {
    slotValue,
    returnSpellDetailSpeech,
    checkIfSummoning,
    numeralConversion,
    slashCorrection
};