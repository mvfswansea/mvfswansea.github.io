import json
import boto3
import os

from boto3.dynamodb.conditions import Key

# Load AWS credentials and configure AWS SDK
session = boto3.Session(
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    region_name="eu-west-2"
)


dynamodb = session.resource('dynamodb')
leagues_table = dynamodb.Table('Leagues')


# Function to load data from JSON file
def load_data_from_file(filepath):
    with open(filepath, 'r') as file:
        return json.load(file)

# Get list of JSON files in the db_data folder
folder_path = '../db_data/Season10'

# Specify the directories path for the data files
league_data_folder = os.path.join(folder_path, 'LeagueData')


# Process league data
for root, dirs, files in os.walk(league_data_folder):
    if root == league_data_folder:  # Check if we are in the LeagueData folder
        for file in files:
            if file.endswith('League.json'):
                league_file = os.path.join(root, file)
                print("Processing league file:", league_file)  # Add this line for debugging
                try:
                    league_data = load_data_from_file(league_file)
                    league_name = league_data["league-name"] 
                    teams = league_data["teams"]
                    league_id = league_data["id"]
                    
                    # Store league data in DynamoDB table for leagues
                    leagues_table.put_item(Item={'id': league_id, 'league_name': league_name, 'teams': teams})
                except Exception as e:
                    print("Error processing file:", league_file)
                    print(e)

print("Data updated or inserted successfully into DynamoDB tables.")
