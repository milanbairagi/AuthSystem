from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from ..models import User
from ..serializers.v1 import UserSerializer


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

# Retrieve current logged-in user
class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user