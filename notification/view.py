from django.http import HttpResponse
from .push import send_telegram_message

def send_telegram_notification(request):
    try:
        message = request.GET.get("data")
    except Exception as e:
        return HttpResponse("Error: " + str(e))
    print(message)
    res = send_telegram_message(message)
    print(res.json())
    return HttpResponse(status=res.status_code)