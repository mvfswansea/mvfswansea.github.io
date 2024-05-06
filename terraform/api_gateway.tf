# API Gateway
resource "aws_api_gateway_rest_api" "dynamo_api" {
  name        = "dynamo-api"
  description = "API for accessing DynamoDB tables"
}

resource "aws_api_gateway_resource" "resource" {
  rest_api_id = aws_api_gateway_rest_api.dynamo_api.id
  parent_id   = aws_api_gateway_rest_api.dynamo_api.root_resource_id
  path_part   = "league"
}

resource "aws_api_gateway_method" "get_method" {
  rest_api_id   = aws_api_gateway_rest_api.dynamo_api.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.dynamo_api.id
  resource_id             = aws_api_gateway_resource.resource.id
  http_method             = "GET"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  content_handling        = "CONVERT_TO_TEXT"
  uri                     = aws_lambda_function.dynamodb_api.invoke_arn
  credentials             = aws_iam_role.lambda_exec.arn

  depends_on = [
    aws_api_gateway_method.get_method
  ]
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.dynamodb_api.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${var.aws_region}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.dynamo_api.id}/*/${aws_api_gateway_method.get_method.http_method}${aws_api_gateway_resource.resource.path}"
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    aws_api_gateway_integration.lambda_integration,
    # aws_api_gateway_integration.options_integration
  ]
  rest_api_id = aws_api_gateway_rest_api.dynamo_api.id
  stage_name  = "prod"
}

output "api_gateway_endpoint_url" {
  value = aws_api_gateway_deployment.deployment.invoke_url
}


# Enable CORS for the API Gateway resource
resource "aws_api_gateway_method" "options_method" {
  rest_api_id   = aws_api_gateway_rest_api.dynamo_api.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_integration" {
  rest_api_id             = aws_api_gateway_rest_api.dynamo_api.id
  resource_id             = aws_api_gateway_resource.resource.id
  http_method             = aws_api_gateway_method.options_method.http_method
  type                    = "MOCK"
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}



resource "aws_api_gateway_method_response" "options_method_response_200" {
  rest_api_id = aws_api_gateway_rest_api.dynamo_api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response_200" {
  rest_api_id = aws_api_gateway_rest_api.dynamo_api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = aws_api_gateway_method_response.options_method_response_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}
