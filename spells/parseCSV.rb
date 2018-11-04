require "smarter_csv"

module ParseCSV
	def self.perform
		csv_spells = SmarterCSV.process('./input/spell_list.csv')
		puts "#{csv_spells.length} spells to be parsed"

		all_spells = []

		csv_spells.each_with_index do |spell_data, index|
			all_spells << {
				id: (index + 1),
				name: spell_data[:name].downcase!,
				school: spell_data[:school],
				descriptor: spell_data[:descriptor],
				casting_time: spell_data[:casting_time],
				range: spell_data[:range],
				duration: spell_data[:duration],
				targets: spell_data[:targets],
				spell_resistance: spell_data[:spell_resistence], # the csv has a typo lol
				saving_throw: spell_data[:saving_throw],
				dismissible: boolean_check(spell_data[:dismissible]),
				description: sanitize_speech(spell_data[:description]),
				description_short: spell_data[:short_description],
				source: spell_data[:source],
				spell_requirements: {
					verbal:   boolean_check(spell_data[:verbal]),
					somatic:  boolean_check(spell_data[:somatic]),
					material: boolean_check(spell_data[:material]),
					focus:    boolean_check(spell_data[:focus])
				},
				spell_levels: {
					alchemist: spell_data[:alchemist],
					antipaladin: spell_data[:antipaladin],
					bard: spell_data[:bard],
					bloodrager: spell_data[:bloodrager],
					cleric: spell_data[:cleric],
					druid: spell_data[:druid],
					hunter: spell_data[:hunter],
					inquisitor: spell_data[:inquisitor],
					investigator: spell_data[:investigator],
					magus: spell_data[:magus],
					medium: spell_data[:medium],
					mesmerist: spell_data[:mesmerist],
					occultist: spell_data[:occultist],
					oracle: spell_data[:oracle],
					paladin: spell_data[:paladin],
					psychic: spell_data[:psychic],
					ranger: spell_data[:ranger],
					shaman: spell_data[:shaman],
					skald: spell_data[:skald],
					sorcerer: spell_data[:sor],
					spiritualist: spell_data[:spiritualist],
					summoner: spell_data[:summoner],
					witch: spell_data[:witch],
					wizard: spell_data[:wiz]
				}
			}
		end
	end

	# private
	
	def self.boolean_check(value)
		if value == 1
			return true
		else
			return false
		end
	end
	
	def self.null_check(value)
		value.present? && value != 'NULL'
	end
	
	def self.sanitize_speech(string)
		string.gsub("&", "and").gsub("&#8224", "")
	end
end
