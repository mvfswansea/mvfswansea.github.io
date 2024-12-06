import json
import boto3
import os
import uuid  # Import uuid for unique ids

# Load AWS credentials and configure AWS SDK
session = boto3.Session(
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    region_name="eu-west-2"
)

dynamodb = session.resource('dynamodb')
leagues_table = dynamodb.Table('Leagues')
fixtures_table = dynamodb.Table('Fixtures')  # Assuming Fixtures table exists

# Function to load data from JSON file
def load_data_from_file(filepath):
    with open(filepath, 'r') as file:
        return json.load(file)

# Folder paths for league and fixture data
folder_path = '../db_data/Season11'
league_data_folder = os.path.join(folder_path, 'LeagueData')
fixture_data_folder = os.path.join(folder_path, 'FixtureData')

# Process league data
for root, dirs, files in os.walk(league_data_folder):
    if root == league_data_folder:
        for file in files:
            if file.endswith('League.json'):
                league_file = os.path.join(root, file)
                print("Processing league file:", league_file)
                try:
                    league_data = load_data_from_file(league_file)
                    league_name = league_data.get("league-name")
                    teams = league_data.get("teams")
                    league_id = league_data.get("id")

                    # Store league data in DynamoDB table for leagues
                    leagues_table.put_item(
                        Item={
                            'id': league_id,
                            'league_name': league_name,
                            'teams': teams
                        }
                    )
                except Exception as e:
                    print("Error processing file:", league_file)
                    print(e)

# Process fixture data
for root, dirs, files in os.walk(fixture_data_folder):
    if root == fixture_data_folder:
        for file in files:
            if file.endswith('Fixtures.json'):
                fixture_file = os.path.join(root, file)
                print("Processing fixture file:", fixture_file)
                try:
                    fixture_data = load_data_from_file(fixture_file)
                    league_id = fixture_data.get("league-id")
                    fixtures = fixture_data.get("fixtures")

                    # Create the overall structure for this league
                    league_entry = {
                        'league_id': league_id,
                        'fixtures': {}  # Initialize the fixtures structure
                    }
                    
                    # Prepare to populate fixtures with teams for each date
                    for date, teams in fixtures.items():
                        # Initialize the date entry if it doesn't exist
                        if date not in league_entry['fixtures']:
                            league_entry['fixtures'][date] = {}

                        # Populate fixtures with teams
                        for team, details in teams.items():
                            league_entry['fixtures'][date][team] = {
                                'opposition': details['opposition'],
                                'played': details['played'],
                                'pitchResult': details['pitchResult'],
                                'overallResult': details['overallResult'],

                                'matchReport': {
                                'scorers': details['matchReport']['scorers'] if 'matchReport' in details else {},
                                'scalesMOTM': details['matchReport']['scalesMOTM'] if 'matchReport' in details else '',
                                'pitchMOTM': details['matchReport']['pitchMOTM'] if 'matchReport' in details else '',
                                'opponentMOTM': details['matchReport']['opponentMOTM'] if 'matchReport' in details else '',
                                'writeUp': details['matchReport']['writeUp'] if 'matchReport' in details else ''
                            }
                            }

                    # Store the entire league entry in DynamoDB
                    fixtures_table.put_item(Item=league_entry)

                except Exception as e:
                    print("Error processing file:", fixture_file)
                    print(e)
print("Data successfully updated or inserted into DynamoDB tables.")
