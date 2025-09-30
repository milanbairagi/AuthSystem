from django.urls import path

from ..views.v1 import UserCreateView, CurrentUserView


urlpatterns = [
    path("register/", UserCreateView.as_view(), name="user-register"),
    path("me/", CurrentUserView.as_view(), name="user-me"),
]