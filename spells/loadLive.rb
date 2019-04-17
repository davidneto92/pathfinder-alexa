# parse CSV, load all data
require "dotenv/load"
require "aws-sdk-dynamodb"
require "smarter_csv"

Aws.config.update({
  region: "us-east-1",
})

table_name = ENV["TABLE_NAME"]
dynamodb = Aws::DynamoDB::Client.new


# PARSE --------------------------------------------------------------------- #
all_spells = []

def boolean_check(value)
  if value == 1
    return true
  else
    return false
  end
end

def null_check(value)
  value.present? && value != "NULL"
end

def sanitize_speech(string)
  string.gsub("&", "and").gsub("&#8224", "")
end

csv_spells = SmarterCSV.process("./input/spell_list.csv")
puts "#{csv_spells.length} spells to be parsed"

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
  spell_levels: [
    {class: "alchemist", level: spell_data[:alchemist]},
    {class: "antipaladin", level: spell_data[:antipaladin]},
    {class: "bard", level: spell_data[:bard]},
    {class: "bloodrager", level: spell_data[:bloodrager]},
    {class: "cleric", level: spell_data[:cleric]},
    {class: "druid", level: spell_data[:druid]},
    {class: "hunter", level: spell_data[:hunter]},
    {class: "inquisitor", level: spell_data[:inquisitor]},
    {class: "investigator", level: spell_data[:investigator]},
    {class: "magus", level: spell_data[:magus]},
    {class: "medium", level: spell_data[:medium]},
    {class: "mesmerist", level: spell_data[:mesmerist]},
    {class: "occultist", level: spell_data[:occultist]},
    {class: "oracle", level: spell_data[:oracle]},
    {class: "paladin", level: spell_data[:paladin]},
    {class: "psychic", level: spell_data[:psychic]},
    {class: "ranger", level: spell_data[:ranger]},
    {class: "shaman", level: spell_data[:shaman]},
    {class: "skald", level: spell_data[:skald]},
    {class: "sorcerer", level: spell_data[:sor]},
    {class: "spiritualist", level: spell_data[:spiritualist]},
    {class: "summoner", level: spell_data[:summoner]},
    {class: "witch", level: spell_data[:witch]},
    {class: "wizard", level: spell_data[:wiz]}
  ]
}
end


# LOAD -------------------------------------------------------------------- #
all_spells.each do |spell|
  params = {
    table_name: table_name,
    item: spell
  }

  begin
    result = dynamodb.put_item(params)
    puts "Live table || Added spell ##{spell[:id]}: #{spell[:name]}"
  rescue  Aws::DynamoDB::Errors::ServiceError => error
    puts "Unable to add spell:"
    puts "#{error.message}"
  end
end