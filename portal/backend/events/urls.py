from django.urls import path

from events.views import (
    EventDetailAPIView, EventListCreateAPIView,
    EventOrgsAPIView, EventMembersAPIView
)

urlpatterns = [
    path("detail/<slug:slug>/", EventDetailAPIView.as_view(), name="events-detail"),
    path("<slug:slug>/orgs/", EventOrgsAPIView.as_view(), name="events-orgs"),
    path("<slug:slug>/members/add/", EventMembersAPIView.as_view(), name="events-members"),
    path("", EventListCreateAPIView.as_view(), name="events")
]


