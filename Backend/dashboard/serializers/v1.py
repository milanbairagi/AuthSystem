from rest_framework import serializers

from accounts.models import User
from tasks.models import Task

class AdminUserSerializer(serializers.ModelSerializer):
    tasks = serializers.IntegerField(source="tasks.count", read_only=True)
    name = serializers.CharField(source="get_full_name", read_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "name", "role", "date_joined", "tasks"]
        read_only_fields =["id", "email", "name", "date_joined", "tasks"]  # Only role is writable
        
        
class StatSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_tasks = serializers.IntegerField()
    total_pending_tasks = serializers.IntegerField()
    total_completed_tasks = serializers.IntegerField()
    
    
class AdminTaskSerializer(serializers.ModelSerializer):
    owner_email = serializers.EmailField(source="owner.email", read_only=True)
    owner_name = serializers.CharField(source="owner.get_full_name", read_only=True)
    class Meta:
        model = Task
        fields = ["id", "title", "owner_email", "owner_name", "status", "created_at"]
        read_only_fields = ["id", "title", "owner_email", "owner_name", "status", "created_at"]