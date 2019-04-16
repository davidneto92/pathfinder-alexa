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
        speechText = slashCorrection(requestAttributes.t("DETAIL_FOUND_RANGE", {spellName: spell.name, spellRange: spell.range}));
        reprompt = slashCorrection(requestAttributes.t("DETAIL_FOUND_RANGE_REPROMPT", {spellRange: spell.range}));
    } else if (spellDetailSlot === "casting time") {
        speechText = slashCorrection(requestAttributes.t("DETAIL_FOUND_CASTING_TIME", {spellName: spell.name, spellCastingTime: spell.casting_time}));
        reprompt = slashCorrection(requestAttributes.t("DETAIL_FOUND_CASTING_TIME_REPROMPT", {spellCastingTime: spell.casting_time}));
    } else if (spellDetailSlot === "saving throw") {
        if ( spell.saving_throw == true || ["no", "none"].includes(spell.saving_throw.toLowerCase()) ) {
            speechText = requestAttributes.t("DETAIL_FOUND_NO_SAVING_THROW", {spellName: spell.name})
            reprompt = requestAttributes.t("DETAIL_FOUND_NO_SAVING_THROW_REPROMPT", {spellName: spell.name})
        } else {
            speechText = requestAttributes.t("DETAIL_FOUND_SAVING_THROW", {spellName: spell.name, savingThrow: spell.saving_throw})
            reprompt = requestAttributes.t("DETAIL_FOUND_SAVING_THROW_REPROMPT", {spellName: spell.name, savingThrow: spell.saving_throw})

            if (speechText.toLowerCase().includes("see text")) { // add note to replace "see text" with a note about the description
                speechText = _.replace(speechText, "see text", requestAttributes.t("DETAIL_FOUND_SAVING_THROW_SEE_TEXT"))
            } else if (spell.saving_throw === "see text") {
                speechText = requestAttributes.t("DETAIL_FOUND_SAVING_THROW_SEE_TEXT_ONLY", {spellName: spell.name})
                reprompt = requestAttributes.t("DETAIL_FOUND_SAVING_THROW_SEE_TEXT_ONLY", {spellName: spell.name})
            }
        }
    } else if (spellDetailSlot === "description") { // full description
        speechText = requestAttributes.t("DETAIL_FOUND_FULL_DESCRIPTION", {spellName: spell.name, spellDescription: spell.description})
        reprompt = requestAttributes.t("DETAIL_FOUND_FULL_DESCRIPTION_REPROMPT", {spellName: spell.name})
    } else if (spellDetailSlot === "levels") {

    } else if (spellDetailSlot === "school") {
        speechText = requestAttributes.t("DETAIL_FOUND_SCHOOL", {spellName: spell.name, spellSchool: spell.school})
        reprompt = requestAttributes.t("DETAIL_FOUND_SCHOOL_REPROMPT", {spellName: spell.name, spellSchool: spell.school})
    } else if (spellDetailSlot === "components") {
        const requirementsList = generateSpellRequirements(spell.spell_requirements)
        // loop through this array and insert into text
    }

    return { speechText, reprompt };
};

// logic in case the short description is malformed/non-existent
function getSpellDescriptionShort(spell) {
    return spell.description_short == null ? {text: spell.description, lengthText: "the full"} : {text: spell.description_short, lengthText: "a brief"}
}

// reads through the spell_levels object to generate output for which classes & levels may cast a spell
function generateSpellLevelSpeech(spell) {

};

// reads through the spell_requirements object to generate array of components strings
function generateSpellRequirements(spellRequirements) {
    return _.without( _.map(spellRequirements, (requirement, category) => { if (requirement) return category } ), undefined)
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
    getSpellDescriptionShort,
    checkIfSummoning,
    numeralConversion,
    slashCorrection
};