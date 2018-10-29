require 'pry'
require "aws-sdk"

Aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

dynamodb = Aws::DynamoDB::Client.new

table_name = 'Movies'

year = 2001
title = "Dust"

key = {
  year: year,
  title: title
}

params = {
  table_name: table_name,
  key: {
      year: year,
      title: title
  }
}


begin
  result = dynamodb.get_item(params)
  binding.pry
  printf "%i - %s\n%s\n%d\n", 
        result.item["year"],
        result.item["title"],
        result.item["info"]["plot"],
        result.item["info"]["rating"]
rescue  Aws::DynamoDB::Errors::ServiceError => error
  puts "Unable to read item:"
  puts "#{error.message}"
end