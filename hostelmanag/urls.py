"""hostelmanag URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from django.views.decorators.csrf import csrf_exempt


from graphene_django.views import GraphQLView

#oauth
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect


oauth = OAuth()

oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)


def protected_graphql_view(request):
    return oauth.auth0.authorize_redirect(
        request, request.build_absolute_uri(reverse("callback"))
    )


def callback(request):
    token = oauth.auth0.authorize_access_token(request)
    request.session["user"] = token
    return redirect(request.build_absolute_uri(reverse("graphql")))

#

from notification.view import send_telegram_notification

urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql_entry/", protected_graphql_view),
    path("callback/", callback, name="callback"),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True)), name="graphql"),
    path('notification/', send_telegram_notification, name="notification"),
]
