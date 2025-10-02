from accounts.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "role", "date_joined"]
        read_only_fields = ["id", "first_name", "last_name", "email", "date_joined"]  # Only role is writable
        
        
class StatSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_tasks = serializers.IntegerField()
    total_pending_tasks = serializers.IntegerField()
    total_completed_tasks = serializers.IntegerField()