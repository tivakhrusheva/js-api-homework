import os
import ydb
import string
import random
import json
import base64


driver_config = ydb.DriverConfig(
    endpoint=os.getenv('YDB_ENDPOINT'), 
    database=os.getenv('YDB_DATABASE'),
    credentials=ydb.iam.ServiceAccountCredentials.from_file("key.json")
)

driver = ydb.Driver(driver_config)
driver.wait(fail_fast=True, timeout=5)
pool = ydb.SessionPool(driver)

def randomword(length: int = 10) -> str:
	letters = string.ascii_lowercase
	return ''.join(random.choice(letters) for i in range(length))

def isBase64(sb):
        try:
                if isinstance(sb, str):
                        # If there's any unicode here, an exception will be thrown and the function will return false
                        sb_bytes = bytes(sb, 'ascii')
                elif isinstance(sb, bytes):
                        sb_bytes = sb
                else:
                        raise ValueError("Argument must be string or bytes")
                return base64.b64encode(base64.b64decode(sb_bytes)) == sb_bytes
        except Exception:
                return False

def handler(event, context):
    print(f"event={event}")
    if isinstance(event, dict):
        if 'path' in event:
            if event['path'] == '/get_random_item':
                query = f""" SELECT * FROM `store_items`"""
                res = pool.retry_operation_sync(lambda s: s.transaction().execute(
                    query,
                    commit_tx=True,
                    settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2)
                ))
                return {
                    'statusCode': 200,
                    'body': {k: v.decode("utf-8") for k, v in res[0].rows[random.randint(0, len(res[0].rows)-1)].items()}
                    }
                
            if event['path'] == '/add_item':
                if 'body' in event:
                    if not isBase64(event['body']):
                        print("it's supposed to be valid json")  # debug
                        body = json.loads(event['body'])
                    else:
                        print("it's base64")  # debug
                        body = json.loads(base64.b64decode(event['body'], altchars=None, validate=False).decode("utf-8"))
                    try:
                        user_id = body['userId']
                        print(f"user_id = {user_id}")
                    except KeyError:
                            return {
                            'statusCode': 400,
                            'body': 'Element `userId` is required!',
                        }
                    try:
                        item_n = body['itemN']
                        print(f"item_n = {item_n}")
                    except KeyError:
                        return {
                            'statusCode': 400,
                            'body': 'Element `itemN` is required!',
                        }
                    try:
                        item_name = body['itemName']
                        print(f"item_name = {item_name}")
                    except KeyError:
                        return {
                            'statusCode': 400,
                            'body': 'Element `itemName` is required!',
                    }
                    try:
                        item_price = body['itemPrice']
                        print(f"item_price = {item_price}")
                    except KeyError:
                        return {
                            'statusCode': 400,
                            'body': 'Element `itemPrice` is required!',
                        }
                    try:
                        item_url = body['itemUrl']
                    except KeyError:
                        return {
                            'statusCode': 400,
                            'body': 'Element `itemUrl` is required!',
                        }
                    query_get = f"""
                    SELECT COUNT(*) AS n FROM `store_users`;
                    """
                    res = pool.retry_operation_sync(lambda s: s.transaction().execute(
                                                query_get,
                                                commit_tx=True,
                                                settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2)
                                            ))
                    count_n = int(res[0].rows[0]['n'])
                    query_insert = f"""
                    INSERT INTO `store_users` (id, item_n, item_name, item_price, item_url, user_id)
                    VALUES('{count_n+1}', '{item_n}', '{item_name}', '{item_price}', '{item_url}', '{user_id}');
                    """
                    print(f"query = {query_insert}")
                    pool.retry_operation_sync(lambda s: s.transaction().execute(
                                                query_insert,
                                                commit_tx=True,
                                                settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2)
                                            ))
                    return {
                            'statusCode': 200,
                            'body': event['body']
                        }
                else:
                    print("no body here")  # debug
            if event['path'] == '/get_cart/{user}':
                if 'params' in event:
                        if 'user' in event['params']:
                            user_id = event['params']['user']
                            query = f"""
                            SELECT  *
                                    FROM `store_users`
                                    WHERE user_id = '{user_id}'
                                    ORDER BY (CAST(id AS Int32?));
                            """
                            res = pool.retry_operation_sync(lambda s: s.transaction().execute(
                                                query,
                                                commit_tx=True,
                                                settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2)
                                            ))
                            if res[0].rows:
                                return {
                                    'statusCode': 200,
                                    'body': {k: v.decode("utf-8") for k, v in res[0].rows[-1].items()}
                                }
                            else:
                                return {
                                    'statusCode': 404,
                                    'body': f'User with id {user_id} not found',
                                }
                        else:
                            return {
                                    'statusCode': 400,
                                    'body': 'Missing parameter `user_id`!',
                                }