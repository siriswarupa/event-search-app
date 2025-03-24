import requests
import concurrent.futures

URL = "http://127.0.0.1:8000/api/search/?query=159.62.125.136&start_time=1725850449&end_time=1725855086"

import time

def send_request():
    start_time = time.time()
    response = requests.get(URL, timeout=5)
    elapsed_time = time.time() - start_time
    print(f"Status: {response.status_code}, Response Time: {elapsed_time:.2f}s, Length: {len(response.text)}")


# Use ThreadPoolExecutor to send 10 requests simultaneously
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    futures = [executor.submit(send_request) for _ in range(10)]
    concurrent.futures.wait(futures)
