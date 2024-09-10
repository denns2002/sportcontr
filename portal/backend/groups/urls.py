from django.urls import path

from groups.views import (
    GroupsAllView, GroupsTrainerListView,
    GroupsTrainerDetailView, GroupsDetailView
)

urlpatterns = [
    path('detail/<slug:slug>/', GroupsDetailView.as_view(), name='groups-detail'),
    path('', GroupsAllView.as_view(), name='groups-list'),
    path('trainer/detail/<slug:slug>/', GroupsTrainerDetailView.as_view(), name='groups-trainer-detail'),
    path('trainer/', GroupsTrainerListView.as_view(), name='groups-trainer-list'),

]
