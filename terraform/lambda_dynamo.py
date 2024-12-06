import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
leagues_table = dynamodb.Table('Leagues')
players_table = dynamodb.Table('Players')
fixtures_table = dynamodb.Table('Fixtures')

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type'
}

def lambda_handler(event, context):
    http_method = event['httpMethod']
    path = event['path']
    query_params = event['queryStringParameters'] or {}

    if http_method == 'GET':
        if path.startswith('/league'):
            league_name = query_params.get('leagueName')
            league_id = query_params.get('leagueId')
            return get_league(league_name, league_id)
        
        elif path.startswith('/team'):
            team_name = query_params.get('teamName')
            return get_team(team_name)
        
        elif path.startswith('/player'):
            player_id = query_params.get('playerId')
            return get_player(player_id)
        
        elif path.startswith('/fixtures'):
            league_id = query_params.get('leagueId')
            date = query_params.get('date')
            return get_fixtures(league_id, date)
            
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Not Found'),
                'headers': headers
            }
    else:
        return {
            'statusCode': 405,
            'body': json.dumps('Method Not Allowed'),
            'headers': headers
        }

def get_league(league_name, league_id):
    response = leagues_table.get_item(Key={'id': league_id})
    if 'Item' in response:
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item']),
            'headers': headers
        }
    else:
        return {
            'statusCode': 404,
            'body': json.dumps('League not found'),
            'headers': headers
        }

def get_team(team_name):
    try:
        response = players_table.scan(
            FilterExpression=Attr('official_team_name').eq(team_name)
        )
        if 'Items' in response and len(response['Items']) > 0:
            return {
                'statusCode': 200,
                'body': json.dumps(response['Items']),
                'headers': headers
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Team not found'),
                'headers': headers
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}"),
            'headers': headers
        }

def get_player(player_id):
    response = players_table.get_item(Key={'id': player_id})
    if 'Item' in response:
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item']),
            'headers': headers
        }
    else:
        return {
            'statusCode': 404,
            'body': json.dumps('Player not found'),
            'headers': headers
        }

def get_fixtures(league_id, date):
    try:
        response = fixtures_table.query(
            KeyConditionExpression=Key('league_id').eq(league_id)
        )
        
        fixtures = {}
        
        for item in response['Items']:
            # Access the fixtures object
            fixtures_data = item.get('fixtures')
            
            # Iterate through each date in the fixtures
            for fixture_date, teams in fixtures_data.items():
                if fixture_date == date:  # Check if the date matches the requested date
                    fixtures[fixture_date] = {}
                    
                    # Now process each team under the date
                    for team_name, team_details in teams.items():
                        name = team_name
                        opposition = team_details.get('opposition')
                        played = team_details.get('played')
                        pitch_result = team_details.get('pitchResult')
                        overall_result = team_details.get('overallResult')

                        # Extract match report details, with fallback for missing data
                        match_report = team_details.get('matchReport', {})

                        scorers = match_report.get('scorers', {})
                        scorers = {player: int(goals) for player, goals in scorers.items()}
                        
                        scales_motm = match_report.get('scalesMOTM', '')
                        pitch_motm = match_report.get('pitchMOTM', '')
                        opponent_motm = match_report.get('opponentMOTM', '')
                        write_up = match_report.get('writeUp', '')
                        
                        fixtures[fixture_date][team_name] = {
                            "opposition": opposition,
                            "played": played,
                            "pitchResult": pitch_result,
                            "overallResult": overall_result,
                            "matchReport": {
                                "scorers": scorers,
                                "scalesMOTM": scales_motm,
                                "pitchMOTM": pitch_motm,
                                "opponentMOTM": opponent_motm,
                                "writeUp": write_up
                            }
                        }

        if not fixtures:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'No fixtures found for the specified date'}),
                'headers': headers
            }

        return {
            'statusCode': 200,
            'body': json.dumps({'fixtures': fixtures}),
            'headers': headers
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}"),
            'headers': headers
        }
