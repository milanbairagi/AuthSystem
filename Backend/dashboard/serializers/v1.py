from rest_framework import serializers

from accounts.models import User
from tasks.models import Task

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
    
    
class TaskSerializer(serializers.ModelSerializer):
    owner_email = serializers.EmailField(source="owner.email", read_only=True)
    owner_name = serializers.CharField(source="owner.get_full_name", read_only=True)
    class Meta:
        model = Task
        fields = ["id", "title", "owner_email", "owner_name", "status", "created_at"]
        read_only_fields = ["id", "title", "owner_email", "owner_name", "status", "created_at"]