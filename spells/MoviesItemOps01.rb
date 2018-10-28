require "aws-sdk"

Aws.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
})

dynamodb = Aws::DynamoDB::Client.new

table_name = 'Movies'

year = 2016
title = "The Big Red Butt"

item = {
  year: year,
  title: title,
  info: {
    plot: "This movie truly sucks butts.",
    rating: 3
  }
}

params = {
  table_name: table_name,
  item: item
}

begin
  result = dynamodb.put_item(params)
  puts "Added item: #{year}  - #{title}"
rescue  Aws::DynamoDB::Errors::ServiceError => error
  puts "Unable to add item:"
  puts "#{error.message}"
end