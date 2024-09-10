from django.urls import re_path, path
from . import views

urlpatterns = [
    re_path(r"^project-all-list/", views.ProjectAllListAPIView.as_view(), name="project-all-list"),
    re_path(r"^project-list/", views.ProjectListAPIView.as_view(), name="project-list"),
    path("project-detail/<slug:slug>/", views.ProjectDetailAPIView.as_view(), name="project-detail"),
    path("project-invite/<slug:slug>/", views.ProjectInviteAPIView.as_view(), name="project-invite"),
    path("project-change-url/<slug:slug>/", views.ProjectChangeUrlAPIView.as_view(), name="project-chnage-url"),
    path("deploy/<slug:slug>/", views.ProjectDeployAPIView.as_view(), name="project-deploy"),
]
