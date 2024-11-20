import json
import boto3
import os
import uuid  # Module for generating unique IDs

from boto3.dynamodb.conditions import Key

# Load AWS credentials and configure AWS SDK
session = boto3.Session(
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    region_name="eu-west-2"
)


dynamodb = session.resource('dynamodb')
players_table = dynamodb.Table('Players')
leagues_table = dynamodb.Table('Leagues')


# Function to delete all items from DynamoDB table
def delete_all_items(table):
    scan = table.scan()
    with table.batch_writer() as batch:
        for each in scan['Items']:
            batch.delete_item(
                Key={
                    'id': each['id']
                }
            )

# Call the function to delete all items
delete_all_items(players_table)
delete_all_items(leagues_table)
