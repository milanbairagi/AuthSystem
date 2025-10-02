from django.urls import path

from ..views.v1 import UserListView, UserRoleUpdateView


urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:id>/role/', UserRoleUpdateView.as_view(), name='user-role-update'),
]
