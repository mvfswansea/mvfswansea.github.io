# Configure the AWS provider
provider "aws" {
  region = "eu-west-2"
}

variable "aws_region" {
  default = "eu-west-2"
}

data "aws_caller_identity" "current" {}
