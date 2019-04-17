const _ = require("lodash")

function slotValue(intentWithSlot) {
    if (intentWithSlot.resolutions && intentWithSlot.resolutions.resolutionsPerAuthority[0].values) {
        return intentWithSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name
    } else if (intentWithSlot.value) {
        if (intentWithSlot.value === "") {
            return false
        } else {
            return intentWithSlot.value
        }
    } else {
        return false;
    }
};

function slotId(slotName, intent) {
    if (intent.slots[slotName].value === "") {
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
        generateSpellLevelSpeech(spell.spell_levels)
        // generate the list speech, then sprintf it
    } else if (spellDetailSlot === "school") {
        speechText = requestAttributes.t("DETAIL_FOUND_SCHOOL", {spellName: spell.name, spellSchool: spell.school})
        reprompt = requestAttributes.t("DETAIL_FOUND_SCHOOL_REPROMPT", {spellName: spell.name, spellSchool: spell.school})
    } else if (spellDetailSlot === "components") {
        const reqList = _.without( _.map(spellRequirements, (requirement, category) => { if (requirement) return category } ), undefined)
        let listSpeech = generateList(reqList)
        speechText = requestAttributes.t("DETAIL_FOUND_SPELL_REQUIREMENTS", {
            spellName: spell.name,
            onlyOne: reqList.length === 1 ? "only" : "",
            componentList: listSpeech
        })
        reprompt = speechText
    }

    return { speechText, reprompt };
};

// logic in case the short description is malformed/non-existent
function getSpellDescriptionShort(spell) {
    return spell.description_short == null ? {text: spell.description, lengthText: "the full"} : {text: spell.description_short, lengthText: "a brief"}
}

// reads through the spell_levels object to generate output for which classes & levels may cast a spell
function generateSpellLevelSpeech(spell) {
    // _.sortBy()
    // spells now are using an array of {class: "bard", level: 2 } objects
    // use similar logic to comp list to pull out items with level === "NULL"
};

// creates a string from a simple array of strings
function generateList(arrayOfStrings) {
    let listSpeech = ""
    switch (arrayOfStrings.length) {
        case 1:
            listSpeech = arrayOfStrings[0]
            break
        case 2:
            listSpeech = `${arrayOfStrings[0]} and ${arrayOfStrings[1]}`
            break
        default:
            arrayOfStrings.forEach((comp, index) => {
                if (index === arrayOfStrings.length - 1) {
                    listSpeech += `and ${comp}`
                } else {
                    listSpeech += `${comp}, `
                }
            })
            break
    }
    return listSpeech
}

// corrects Alexa's "1 min slash level" to be "1 min PER level"
function slashCorrection(description) {
    return _.replace(description, "./level", " per level").replace("./2 levels", " per two levels").replace("./3 levels", " per three levels")
}

// check if the spell being asked about is a valid summoning spell
// if true, return summoning data
    // {speechText: x spell can is summoning spell, summons: [array of possible summons]}
// if it's not a summoning spell, return false
function checkIfSummoning(spell, requestAttributes) {}

// modifies speechOutput to be sure roman numerals are spoken correctly
function numeralConversion(speechText) {};

module.exports = {
    slotValue,
    slotId,
    returnSpellDetailSpeech,
    getSpellDescriptionShort,
    generateList,
    slashCorrection
    // checkIfSummoning,
    // numeralConversion,
};