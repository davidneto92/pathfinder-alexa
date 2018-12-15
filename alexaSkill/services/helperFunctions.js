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
}

// This function returns the string (from the requestAttributes) with data 
// that corresponds to the provided detailSlot.
function returnSpellAttributeSpeech(spell, detailSlot, requestAttributes) {
    // FIXME: Need to change name of "detail" slot to something better

    // TODO:
        // if statement waterfall of slots
        // include handling for "i don't know" slot
}

function checkIfSummoning(spell) {
    // TODO: this spell should check if the spell being asked about is a valid summoning spell
    // if true, return summoning data
    // 
}

module.exports = {
    slotValue,
    returnSpellAttributeSpeech,
    checkIfSummoning
}