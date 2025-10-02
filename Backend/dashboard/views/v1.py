from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser

from ..pagination import StandardResultsSetPagination
from accounts.models import User
from ..serializers.v1 import UserSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination


class UserRoleUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    
    lookup_field = "id"