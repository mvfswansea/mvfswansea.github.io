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
            league_id = query_params.get('leagueId')  # Get leagueId from query parameters
            date = query_params.get('date')
            return get_fixtures(league_id, date)  # Pass leagueId to get_fixtures
            
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

def get_fixtures(league_id, date):  # Accept league_id and date
    try:
        response = fixtures_table.query(
            KeyConditionExpression=Key('league_id').eq(league_id) & Key('date').eq(date)
        )

        fixtures = {}
        for item in response['Items']:
            if date not in fixtures:
                fixtures[date] = {}
            fixtures[date][item['team']] = {
                "opposition": item['opposition'],
                "played": item['played'],
                "pitchResult": item['pitchResult'],
                "overallResult": item['overallResult']
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
