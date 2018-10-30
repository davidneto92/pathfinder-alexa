# FOR LOCAL DYNAMODB

# parse CSV, delete previous table, create table, load data
require "aws-sdk"
require "smarter_csv"

Aws.config.update({
  region: "us-east-1",
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


# DELETE -------------------------------------------------------------------- #
delete_params = {
  table_name: table_name
}

begin
  result = dynamodb.delete_table(delete_params)
  puts "Deleted table."

rescue  Aws::DynamoDB::Errors::ServiceError => error
  puts "Unable to delete table:"
  puts "#{error.message}"
end


# CREATE -------------------------------------------------------------------- #
create_params = {
	table_name: table_name,
	key_schema: [
		{
			attribute_name: "id",
			key_type: "HASH"  #Partition key
		}
	],
	attribute_definitions: [
		{
			attribute_name: "id",
			attribute_type: "N"
		}
	],
	provisioned_throughput: { 
		read_capacity_units: 10,
		write_capacity_units: 10
	}
}

begin
  result = dynamodb.create_table(create_params)
  puts "Created the dang table. Status: " + result.table_description.table_status
rescue Aws::DynamoDB::Errors::ServiceError => error
  puts "Unable to create table:"
  puts "#{error.message}"
end


# LOAD -------------------------------------------------------------------- #
files = Dir.entries('output_spells')

all_spells.each do |spell|
  params = {
    table_name: table_name,
    item: spell
  }

  begin
    result = dynamodb.put_item(params)
    puts "Added spell: #{spell[:name]}"
  rescue  Aws::DynamoDB::Errors::ServiceError => error
    puts "Unable to add spell:"
    puts "#{error.message}"
  end
end


# TEST QUERY ---------------------------------------------------------------- #
query_params = {
  table_name: table_name,
  key: {
    id: 23
  }
}

# begin
#   result = dynamodb.get_item(params)
#   printf "%i - %s\n%s\n%d\n", 
#         result.item["name"],
#         result.item["school"],
#         result.item["description_short"],
# rescue  Aws::DynamoDB::Errors::ServiceError => error
#   puts "Unable to read item:"
#   puts "#{error.message}"
# end