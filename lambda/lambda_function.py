import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("ChristmasCharacters")

def lambda_handler(event, context):
    route_key = event.get("routeKey") or f"{event.get('requestContext', {}).get('http', {}).get('method', 'GET')} {event.get('rawPath', '/')}"

    try:
        if route_key == "GET /characters":
            response = table.scan()
            items = response.get("Items", [])
            status_code = 200
            body = items
        else:
            status_code = 400
            body = {"error": f"Unsupported route: {route_key}"}
    except Exception as e:
        status_code = 500
        body = {"error": str(e)}

    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(body)
    }
