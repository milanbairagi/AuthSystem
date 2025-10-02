from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser

from tasks.models import Task
from ..pagination import StandardResultsSetPagination
from accounts.models import User
from ..serializers.v1 import AdminUserSerializer, StatSerializer, AdminTaskSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination


class UserRoleUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    
    lookup_field = "id"
    
    
class StatView(ListAPIView):
    serializer_class = StatSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None

    def get_queryset(self):
        total_users = User.objects.count()
        total_tasks = Task.objects.count()
        total_pending_tasks = Task.objects.filter(status="pending").count()
        total_completed_tasks = Task.objects.filter(status="completed").count()

        stats_data = {
            "total_users": total_users,
            "total_tasks": total_tasks,
            "total_pending_tasks": total_pending_tasks,
            "total_completed_tasks": total_completed_tasks,
        }

        return [stats_data]


class RecentUserListView(ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination
    

class RecentTaskListView(ListAPIView):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = AdminTaskSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination