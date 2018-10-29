# delete previous table, create table, load data
require "aws-sdk"
require "json"
require "pry"

Aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

table_name = 'pathfinderSpellsTable'
dynamodb = Aws::DynamoDB::Client.new

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
            key_type: "HASH"  #Partition key
        },
        {
            attribute_name: "school",
            key_type: "RANGE" #Sort key 
		}		
    ],
    attribute_definitions: [
        {
            attribute_name: "name",
            attribute_type: "S"
        },
        {
            attribute_name: "school",
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

files.each do |file|
  unless file =~ /^..?$/ 
    spell = JSON.parse(File.read("output_spells/#{file}"))
    params = {
      table_name: table_name,
      item: spell
    }
    
    begin
      result = dynamodb.put_item(params)
      puts "Added movie: #{movie["year"]} #{movie["title"]}"
    rescue  Aws::DynamoDB::Errors::ServiceError => error
      puts "Unable to add movie:"
      puts "#{error.message}"
    end
  end

end