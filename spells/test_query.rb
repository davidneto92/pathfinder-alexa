require "aws-sdk"

Aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

dynamodb = Aws::DynamoDB::Client.new
table_name = 'pathfinderSpellsTable'

query_params = {
  table_name: table_name,
  key: {
    id: 23
  }
}

begin
  result = dynamodb.get_item(query_params)
  puts "#{result.item["name"]}\n#{result.item["school"]}\n#{result.item["description_short"]}"
rescue  Aws::DynamoDB::Errors::ServiceError => error
  puts "Unable to read item:"
  puts "#{error.message}"
end