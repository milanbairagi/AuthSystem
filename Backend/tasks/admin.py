from django.contrib import admin

from accounts.models import User
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "status", "owner", "created_at", "updated_at")
    list_filter = ("status", "created_at", "owner")
    search_fields = ("id", "title", "description", "owner__email", "owner__first_name", "owner__last_name")
    ordering = ("-updated_at", "-created_at",)
