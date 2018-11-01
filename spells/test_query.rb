require "aws-sdk"

Aws.config.update({
  region: "us-east-1",
  # endpoint: "http://localhost:8000"
})

dynamodb = Aws::DynamoDB::Client.new
table_name = 'pathfinderSpellsTable'

query_params = {
  table_name: table_name,
  key: {
    name: "acid arrow"
  }
}

begin
  result = dynamodb.get_item(query_params)
  puts "#{result.item["name"]}\n#{result.item["school"]}\n#{result.item["description_short"]}"
rescue  Aws::DynamoDB::Errors::ServiceError => error
  puts "Unable to read item:"
  puts "#{error.message}"
end