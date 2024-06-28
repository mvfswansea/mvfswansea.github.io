
data "archive_file" "dynamo_lambda" {
  type = "zip"
  source_file = "${path.module}/lambda_dynamo.py"
  output_path = "${path.module}/lambda_dynamo.zip"
}

# Define the Lambda function
resource "aws_lambda_function" "dynamodb_api" {
  filename         = data.archive_file.dynamo_lambda.output_path
  function_name    = "dynamodb-api"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "lambda_dynamo.lambda_handler"
  runtime          = "python3.9"

  source_code_hash = data.archive_file.dynamo_lambda.output_base64sha256

  environment {
    variables = {
      BLANK_VALUE = "test"
    }
  }
}

# Define the IAM role for Lambda execution
resource "aws_iam_role" "lambda_exec" {
  name               = "lambda-exec-role"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      },
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "apigateway.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "lambda_exec_policy" {
  name       = "lambda-exec-policy"
  roles      = [aws_iam_role.lambda_exec.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "lambda_exec_dynamo_policy" {
  name   = "lambda-exec-dynamo_policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "dynamodb:GetItem"
        Resource = ["*"]
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "lambda_exec_dynamo_policy" {
  name       = "lambda-exec-policy"
  roles      = [aws_iam_role.lambda_exec.name]
  policy_arn = aws_iam_policy.lambda_exec_dynamo_policy.arn
}

resource "aws_iam_policy" "lambda_exec_invoke_policy" {
  name   = "lambda-exec-invoke-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "lambda:InvokeFunction"
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "lambda_exec_invoke_policy_attachment" {
  name       = "lambda-exec-invoke-policy-attachment"
  roles      = [aws_iam_role.lambda_exec.name]
  policy_arn = aws_iam_policy.lambda_exec_invoke_policy.arn
}
