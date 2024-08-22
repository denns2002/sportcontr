from django.urls import path

from news.views import NewsListCreateAPIView, NewsDetailAPIView

urlpatterns = [
    path("", NewsListCreateAPIView.as_view(), name="news-list"),
    path("detail/<slug:slug>/", NewsDetailAPIView.as_view(), name="news-detail"),
]
