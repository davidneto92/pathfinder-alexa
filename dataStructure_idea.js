// v1
module.exports = {
	name: "spell name",
	school: "conjuration",
	range: "30 ft",
	components: "VS",
	description: "This is the full spell description",
	descriptionShort: "short description",
	source: "specific book this spell is found in",
	spellLevels: {
		wizard: 2,
		sorcerer: 2,
		shaman: 1
	},
	requirements: {
		verbal:   true,
        somatic:  true,
        material: false,
        focus:    true,
	}
}

// v2