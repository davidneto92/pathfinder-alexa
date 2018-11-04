# FOR LOCAL DYNAMODB

# parse CSV, delete previous table, create table, load data, write json of slot values
require "aws-sdk"
require "smarter_csv"
require "pry"

Aws.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
})

table_name = 'pathfinderSpellsTable'
dynamodb = Aws::DynamoDB::Client.new


# PARSE --------------------------------------------------------------------- #
module Seeds
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

csv_spells = SmarterCSV.process('./input/spell_list.csv')
puts "#{csv_spells.length} spells to be parsed"

all_spells = []
csv_spells.each_with_index do |spell_data, index|
  all_spells << {
    id: (index + 1),
    name: spell_data[:name].downcase,
    school: spell_data[:school],
    descriptor: spell_data[:descriptor],
    casting_time: spell_data[:casting_time],
    range: spell_data[:range],
    duration: spell_data[:duration],
    targets: spell_data[:targets],
    spell_resistance: spell_data[:spell_resistence], # the csv has a typo lol
    saving_throw: spell_data[:saving_throw],
    dismissible: Seeds.boolean_check(spell_data[:dismissible]),
    description: Seeds.sanitize_speech(spell_data[:description]),
    description_short: spell_data[:short_description],
    source: spell_data[:source],
    spell_requirements: {
      verbal:   Seeds.boolean_check(spell_data[:verbal]),
      somatic:  Seeds.boolean_check(spell_data[:somatic]),
      material: Seeds.boolean_check(spell_data[:material]),
      focus:    Seeds.boolean_check(spell_data[:focus])
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


# # DELETE -------------------------------------------------------------------- #
# delete_params = {
#   table_name: table_name
# }

# begin
#   result = dynamodb.delete_table(delete_params)
#   puts "Deleted table."

# rescue  Aws::DynamoDB::Errors::ServiceError => error
#   puts "Unable to delete table:"
#   puts "#{error.message}"
# end


# # CREATE -------------------------------------------------------------------- #
# create_params = {
# 	table_name: table_name,
# 	key_schema: [
# 		{
# 			attribute_name: "name",
# 			key_type: "HASH"  #Partition key
# 		}
# 	],
# 	attribute_definitions: [
# 		{
# 			attribute_name: "name",
# 			attribute_type: "S"
# 		}
# 	],
# 	provisioned_throughput: {
# 		read_capacity_units: 10,
# 		write_capacity_units: 10
# 	}
# }

# begin
#   result = dynamodb.create_table(create_params)
#   puts "Created the dang table. Status: " + result.table_description.table_status
# rescue Aws::DynamoDB::Errors::ServiceError => error
#   puts "Unable to create table:"
#   puts "#{error.message}"
# end


# # LOAD -------------------------------------------------------------------- #
# files = Dir.entries('output_spells')

# all_spells.each do |spell|
#   params = {
#     table_name: table_name,
#     item: spell
#   }

#   begin
#     result = dynamodb.put_item(params)
#     puts "Local table || Added spell ##{spell[:id]}: #{spell[:name]}"
#   rescue  Aws::DynamoDB::Errors::ServiceError => error
#     puts "Unable to add spell:"
#     puts "#{error.message}"
#   end
# end


# # TEST QUERY ---------------------------------------------------------------- #
# query_params = {
#   table_name: table_name,
#   key: {
#     name: "acid arrow"
#   }
# }

# begin
#   result = dynamodb.get_item(query_params)
#   puts "\n#{result.item["name"]}\n#{result.item["school"]}\n#{result.item["description_short"]}"
# rescue  Aws::DynamoDB::Errors::ServiceError => error
#   puts "Unable to read item:"
#   puts "#{error.message}"
# end


# WRITE SLOT VALUES JSON ---------------------------------------------------- #
def roman_numeral_synonyms(numeral, string) # returns an array of synonyms
  synonyms = []
  case numeral
    when 1
      synonyms << string.gsub(" i", " one")
      synonyms << string.gsub(" i", "")
    when 2
      synonyms << string.gsub(" ii", " two")
      synonyms << string.gsub(" ii", " too")
      synonyms << string.gsub(" ii", " to")
    when 3
      synonyms << string.gsub(" iii", " three")
      synonyms << string.gsub(" iii", " free")
      synonyms << string.gsub(" iii", " tree")
    when 4
      synonyms << string.gsub(" iv", " four")
      synonyms << string.gsub(" iv", " for")
      synonyms << string.gsub(" iv", " fore")
    when 5
      synonyms << string.gsub(" v", " five")
      synonyms << string.gsub(" v", " i've")
    when 6
      synonyms << string.gsub(" vi", " six")
      synonyms << string.gsub(" vi", " sex")
    when 7
      synonyms << string.gsub(" vii", " seven")
      synonyms << string.gsub(" vii", " evan")
    when 8
      synonyms << string.gsub(" viii", " eight")
      synonyms << string.gsub(" viii", " ate")
    when 9
      synonyms << string.gsub(" ix", " nine")
      synonyms << string.gsub(" ix", " time")
    when 10
      synonyms << string.gsub(" x", " ten")
      synonyms << string.gsub(" x", " tin")
    else
      puts "No roman numerals found in #{string}"
  end

  return synonyms
end

values = []
all_spells.map do |spell|
  synonym_list = []

  if spell[:name].include?("greater") || spell[:name].include?("mass")
    actual_name = spell[:name].split(",").first
    if spell[:name].include?("greater")
      synonym_list = ["greater #{actual_name}", "#{actual_name} greater"]
    else
      synonym_list = ["mass #{actual_name}", "#{actual_name} mass"]
    end
  elsif spell[:name][-2..-1] == " i"
    synonym_list = roman_numeral_synonyms(1, spell[:name])
  elsif spell[:name][-3..-1] == " ii"
    synonym_list = roman_numeral_synonyms(2, spell[:name])
  elsif spell[:name][-4..-1] == " iii"
    synonym_list = roman_numeral_synonyms(3, spell[:name])
  elsif spell[:name][-3..-1] == " iv"
    synonym_list = roman_numeral_synonyms(4, spell[:name])
  elsif spell[:name][-2..-1] == " v"
    synonym_list = roman_numeral_synonyms(5, spell[:name])
  elsif spell[:name][-3..-1] == " vi"
    synonym_list = roman_numeral_synonyms(6, spell[:name])
  elsif spell[:name][-4..-1] == " vii"
    synonym_list = roman_numeral_synonyms(7, spell[:name])
  elsif spell[:name][-5..-1] == " viii"
    synonym_list = roman_numeral_synonyms(8, spell[:name])
  elsif spell[:name][-3..-1] == " ix"
    synonym_list = roman_numeral_synonyms(9, spell[:name])
  elsif spell[:name][-2..-1] == " x"
    synonym_list = roman_numeral_synonyms(10, spell[:name])
  end

  if spell[:name].include?("summon")
    if synonym_list.empty?
      synonym_list << spell[:name].gsub("summon", "simon")
    else
      synonym_list_length = synonym_list.length
      synonym_list_length.times do |index|
        synonym_list << synonym_list[index].gsub("summon", "simon")
      end
    end
  end

  values << {name: {value: spell[:name].to_s, synonyms: synonym_list} }
end

File.open("./slots_values.json","w") do |f|
  f.write({name: "SPELLSLOT", values: values}.to_json)
end