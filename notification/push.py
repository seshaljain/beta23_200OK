import requests
import json
from django.conf import settings

def send_telegram_message(message: str):

    headers = {'Content-Type': 'application/json',}
    url = f'https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id={settings.TELEGRAM_CHAT_ID}&text={message}'

    response = requests.get(url, headers=headers, verify=False)
    return response


# res = send_telegram_message("Hello World from the program")

# print(res.json())

# send_telegram_message("Hello world!!!", chat_id, api_key)