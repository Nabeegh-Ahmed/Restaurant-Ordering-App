import redis
import time

redis_client = redis.Redis(host='localhost', port=6379, db=0)
redis_pubsub = redis_client.pubsub()
redis_pubsub.subscribe('user')

print(redis_client.get("tRPC"))

while True:
    message = redis_pubsub.get_message()
    if message:
        print(message)
    time.sleep(0.001)
    
