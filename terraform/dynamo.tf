locals {
  dynamo_tables = {
    "Leagues" = "id"
    "Players" = "id"
  }
}

# Define the DynamoDB tables
resource "aws_dynamodb_table" "dynamo" {
  for_each = local.dynamo_tables

  name           = each.key
  hash_key       = each.value
  billing_mode   = "PAY_PER_REQUEST"
  attribute {
    name = each.value
    type = "S"
  }
}
