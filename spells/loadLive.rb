# FOR LIVE DYNAMODB

# parse CSV, load all data
require "aws-sdk"
require "smarter_csv"
require_relative "parseCSV"

Aws.config.update({
  region: "us-east-1",
})

table_name = 'pathfinderSpellsTable'
dynamodb = Aws::DynamoDB::Client.new


# PARSE --------------------------------------------------------------------- #
all_spells = ParseCSV.perform


# LOAD -------------------------------------------------------------------- #
files = Dir.entries('output_spells')

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