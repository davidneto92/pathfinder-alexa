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

module.exports = {
    slotValue,
}