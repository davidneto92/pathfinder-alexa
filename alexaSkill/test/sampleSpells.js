module.exports = {
    // standard spell
    sampleOne: {
        "description_short": "+2 to AC and saves, plus additional protection against selected alignment.",
        "source": "PFRPG Core",
        "spell_resistance": "no; see text",
        "spell_requirements": {
            "focus": false,
            "verbal": true,
            "somatic": true,
            "material": true
        },
        "name": "protection from evil",
        "dismissible": true,
        "spell_levels": {
            "bloodrager": 1,
            "sorcerer": 1,
            "ranger": "NULL",
            "skald": "NULL",
            "spiritualist": 1,
            "shaman": 1,
            "medium": 1,
            "investigator": "NULL",
            "inquisitor": 1,
            "summoner": 1,
            "psychic": "NULL",
            "hunter": "NULL",
            "magus": "NULL",
            "bard": "NULL",
            "mesmerist": "NULL",
            "cleric": 1,
            "alchemist": "NULL",
            "oracle": 1,
            "occultist": "NULL",
            "antipaladin": "NULL",
            "druid": "NULL",
            "witch": "NULL",
            "wizard": 1,
            "paladin": 1
        },
        "casting_time": "1 standard action",
        "targets": "creature touched",
        "school": "abjuration",
        "saving_throw": "Will negates (harmless)",
        "range": "touch",
        "descriptor": "good",
        "description": "This spell wards a creature from attacks by evil creatures, from mental control, and from summoned creatures. It creates a magical barrier around the subject at a distance of 1 foot. The barrier moves with the subject and has three major effects.  First, the subject gains a +2 deflection bonus to AC and a +2 resistance bonus on saves. Both these bonuses apply against attacks made or effects created by evil creatures.  Second, the subject immediately receives another saving throw (if one was allowed to begin with) against any spells or effects that possess or exercise mental control over the creature (including enchantment [charm] effects and enchantment [compulsion] effects such as charm person, command, and dominate person). This saving throw is made with a +2 morale bonus, using the same DC as the original effect.  If successful, such effects are suppressed for the duration of this spell. The effects resume when the duration of this spell expires.  While under the effects of this spell, the target is immune to any new attempts to possess or exercise mental control over the target.  This spell does not expel a controlling life force (such as a ghost or spellcaster using magic jar), but it does prevent them from controlling the target. This second effect only functions against spells and effects created by evil creatures or objects, subject to GM discretion.  Third, the spell prevents bodily contact by evil summoned creatures. This causes the natural weapon attacks of such creatures to fail and the creatures to recoil if such attacks require touching the warded creature. Summoned creatures that are not evil are immune to this effect. The protection against contact by summoned creatures ends if the warded creature makes an attack against or tries to force the barrier against the blocked creature. Spell resistance can allow a creature to overcome this protection and touch the warded creature.",
        "id": 414,
        "duration": "1 min./level (D)"
    },

    // summoning spell
    sampleTwo: {
        "description_short": "(Evil creatures only.) Summons extraplanar creature to fight for you.",
        "source": "PFRPG Core",
        "spell_resistance": "no",
        "spell_requirements": {
            "focus": true,
            "verbal": true,
            "somatic": true,
            "material": false
        },
        "name": "summon monster iii",
        "dismissible": true,
        "spell_levels": {
            "bloodrager": "NULL",
            "sorcerer": 3,
            "ranger": "NULL",
            "skald": "NULL",
            "spiritualist": 3,
            "shaman": "NULL",
            "medium": "NULL",
            "investigator": "NULL",
            "inquisitor": "NULL",
            "summoner": "NULL",
            "psychic": 3,
            "hunter": "NULL",
            "magus": "NULL",
            "bard": 3,
            "mesmerist": "NULL",
            "cleric": 3,
            "alchemist": "NULL",
            "oracle": 3,
            "occultist": "NULL",
            "antipaladin": 3,
            "druid": "NULL",
            "witch": 3,
            "wizard": 3,
            "paladin": "NULL"
        },
        "casting_time": "1 round",
        "targets": null,
        "school": "conjuration",
        "saving_throw": "none",
        "range": "close (25 ft. + 5 ft./2 levels)",
        "descriptor": null,
        "description": "This spell functions like summon monster I, except that you can summon one creature from the 3rd-level list, 1d3 creatures of the same kind from the 2nd-level list, or 1d4+1 creatures of the same kind from the 1st-level list.",
        "id": 529,
        "duration": "1 round/level"
    },
    sampleThree: {
        // need something with saving throw
    },
    sampleFour: {
        // need something with short/unique duration
    },
    sampleFive: {
        // need something with spell resistance/unique value
    },
}