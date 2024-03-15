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


# Function to load data from JSON file
def load_data_from_file(filepath):
    with open(filepath, 'r') as file:
        return json.load(file)


def update_or_insert_player(player_data):
    team_name = player_data['team_name']
    player_name = player_data['name']
    
    # Scan the DynamoDB table to check if the player already exists in the given team
    response = players_table.scan()
    
    for item in response['Items']:
        if item['team_name'] == team_name and item['name'] == player_name:
            # Player exists, update the item
            print(f"Updating Existing Player '{player_name}' in Team '{team_name}'")
            players_table.put_item(Item=item)
            return
    
    # If the player doesn't exist, or ID is not provided, generate a new unique ID
    print(f"Adding New Player '{player_name}' to Team '{team_name}'")
    player_data['id'] = str(uuid.uuid4())
    players_table.put_item(Item=player_data)

# Get list of JSON files in the db_data folder
folder_path = 'db_data/Season9'

# Specify the directories path for the data files
league_data_folder = os.path.join(folder_path, 'LeagueData')
team_data_folder = os.path.join(league_data_folder, 'TeamData')


# Process league data
for root, dirs, files in os.walk(league_data_folder):
    if root == league_data_folder:  # Check if we are in the LeagueData folder
        for file in files:
            if file.endswith('.json'):
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

# Process team data
team_files = []
for root, dirs, files in os.walk(team_data_folder):
    for file in files:
        if file.endswith('.json'):
            team_file = os.path.join(root, file)
            team_files.append(team_file)

for team_file in team_files:
    print("Processing team file:", team_file)
    try:
        team_data = load_data_from_file(team_file)
        league_name = team_file.split('/')[-3]
        team_name = team_data["team-name"]
        
        # Store player data in DynamoDB table for players
        for player in team_data["players"]:
            player['league_name'] = league_name
            player['team_name'] = team_name
            update_or_insert_player(player)

    except Exception as e:
        print("Error processing file:", team_file)
        print(e)

print("Data updated or inserted successfully into DynamoDB tables.")
