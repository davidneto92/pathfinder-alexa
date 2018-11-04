# FOR LOCAL DYNAMODB

# parse CSV, delete previous table, create table, load data
require "aws-sdk"
require "json"
require_relative "parseCSV"

Aws.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
})

table_name = 'pathfinderSpellsTable'
dynamodb = Aws::DynamoDB::Client.new


# PARSE --------------------------------------------------------------------- #
all_spells = ParseCSV.perform


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
			attribute_name: "name",
			key_type: "HASH"  # Partition key
		}
	],
	attribute_definitions: [
		{
			attribute_name: "name",
			attribute_type: "S"
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
    puts "Local table || Added spell ##{spell[:id]}: #{spell[:name]}"
  rescue  Aws::DynamoDB::Errors::ServiceError => error
    puts "Unable to add spell:"
    puts "#{error.message}"
  end
end


# TEST QUERY ---------------------------------------------------------------- #
query_params = {
  table_name: table_name,
  key: {
    name: "acid arrow"
  }
}

begin
  result = dynamodb.get_item(query_params)
  puts "\n#{result.item["name"]}\n#{result.item["school"]}\n#{result.item["description_short"]}"
rescue  Aws::DynamoDB::Errors::ServiceError => error
  puts "Unable to read item:"
  puts "#{error.message}"
end
