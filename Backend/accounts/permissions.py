from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    """
    Allows access only to admin users (role="admin").
    """
    def has_permission(self, request, view):
        user = request.user
        return user and user.is_authenticated and user.role == "admin"