from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "password", "role"]
        read_only_fields = ["id", "role"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        instance = self.Meta.model.objects.create_user(**validated_data)
        return instance
