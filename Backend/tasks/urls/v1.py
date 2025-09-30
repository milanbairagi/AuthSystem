from django.urls import path

from ..views.v1 import TaskListCreateView, TaskRetrieveUpdateDestroyView


urlpatterns = [
    path("", TaskListCreateView.as_view(), name="task-list-create"),
    path("<int:id>/", TaskRetrieveUpdateDestroyView.as_view(), name="task-rud"),
]
