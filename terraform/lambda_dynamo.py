import json
import boto3

dynamodb = boto3.resource('dynamodb')
leagues_table = dynamodb.Table('Leagues')
players_table = dynamodb.Table('Players')

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type'
}

def lambda_handler(event, context):
    http_method = event['httpMethod']
    path = event['path']
    query_params = event['queryStringParameters'] or {}

    print(query_params)

    if http_method == 'GET':
        if path.startswith('/league'):
            league_name = query_params.get('leagueName')
            league_id = query_params.get('leagueId')
            
            return get_league(league_name, league_id)
            # return get_league(event)
        elif path.startswith('/player/'):
            return get_player(event)
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
    print(league_name)
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

def get_player(event):
    player_id = event['pathParameters']['playerId']
    response = players_table.get_item(Key={'playerId': player_id})
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
