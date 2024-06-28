# Set your AWS IAM credentials
# export AWS_ACCESS_KEY_ID="your-access-key-id"
# export AWS_SECRET_ACCESS_KEY="your-secret-access-key"
export AWS_DEFAULT_REGION="eu-west-2"

# Set the date for the request (in UTC)
export AWS_DATE=$(date -u +'%Y%m%dT%H%M%SZ')

# Set the HTTP method, endpoint URL, and request body (if any)
METHOD="GET"
ENDPOINT_URL="https://3u270eyft0.execute-api.eu-west-2.amazonaws.com/prod"
REQUEST_BODY="test"

# Generate the canonical request
CANONICAL_REQUEST=$(echo -n "$METHOD"$'\n'"/prod/tables"$'\n'"$REQUEST_BODY"$'\n'"host:$ENDPOINT_URL"$'\n'"host"$'\n'"UNSIGNED-PAYLOAD" | openssl sha256 -hex | awk '{print $1}')

# Generate the string to sign
STRING_TO_SIGN=$(echo -n "AWS4-HMAC-SHA256"$'\n'"$AWS_DATE"$'\n'"$(date -u +'%Y%m%d')/$AWS_DEFAULT_REGION/apigateway/aws4_request"$'\n'"$CANONICAL_REQUEST" | openssl sha256 -hex | awk '{print $1}')

# Generate the AWS signature
AWS_SIGNING_KEY=$(echo -n "AWS4"$AWS_SECRET_ACCESS_KEY | openssl sha256 -hex | awk '{print $1}')
SIGNATURE=$(echo -n "$AWS_DATE"$'\n'"$AWS_DEFAULT_REGION"$'\n'"apigateway/aws4_request"$'\n'"$STRING_TO_SIGN" | openssl sha256 -mac HMAC -macopt hexkey:$AWS_SIGNING_KEY -binary | openssl enc -base64)

# Send the signed request
curl -X $METHOD -H "Host: $ENDPOINT_URL" -H "Authorization: AWS4-HMAC-SHA256 Credential=$AWS_ACCESS_KEY_ID/$AWS_DEFAULT_REGION/apigateway/aws4_request, SignedHeaders=host, Signature=$SIGNATURE" -H "x-amz-date: $AWS_DATE" $ENDPOINT_URL
