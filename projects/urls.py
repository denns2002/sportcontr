from django.urls import re_path, path
from . import views

urlpatterns = [
    re_path(r"^project-all-list/", views.ProjectAllListAPIView.as_view(), name="project-all-list"),
    re_path(r"^project-list/", views.ProjectListAPIView.as_view(), name="project-list"),
    path("project-detail/<slug:slug>/", views.ProjectDetailAPIView.as_view(), name="project-detail"),
    # path("project-members/<slug:slug>/", views.ProjectMembersAPIView.as_view(), name="project-members"),
    path("project-change-url/<slug:slug>/", views.ProjectChangeUrlAPIView.as_view(), name="project-chnage-url"),
]
