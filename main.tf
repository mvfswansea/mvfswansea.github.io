provider "aws" {
  region = "eu-west-2"
}

resource "aws_dynamodb_table" "leagues" {
  name           = "Leagues"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "players" {
  name           = "Players"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
}
