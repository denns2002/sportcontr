from django.utils.decorators import method_decorator
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import (
    GenericAPIView, ListAPIView, CreateAPIView,
    RetrieveUpdateDestroyAPIView
)

from common.permissions.safe_any_unsafe_admin import SafeAnyUnsafeAdmin
from common.permissions.settings_permission import HasSettingsPermission
from news.models import News
from news.serializers import NewsSerializer


class NewsMixin(GenericAPIView):
    serializer_class = NewsSerializer
    lookup_field = "slug"
    permission_classes = [SafeAnyUnsafeAdmin, HasSettingsPermission('news')]
    queryset = News.objects.filter(is_published=True).order_by('-created_at')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_published']

    def get_queryset(self):
        queryset = News.objects.order_by('-created_at')
        user = self.request.user
        if user.is_authenticated and (user.is_staff or user.is_superuser):
            is_published = self.request.query_params.get('is_published')
            if is_published:
                queryset = queryset.filter(is_published=is_published)

            return queryset

        return queryset.filter(is_published=True)

    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Новости"],
    operation_id="news-list_get/",
    operation_description="GET все новости",
))
@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Новости"],
    operation_id="news-list_post/",
    operation_description="POST новости (только админы)",
))
class NewsListCreateAPIView(ListAPIView, CreateAPIView, NewsMixin):
    pass


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Новости"],
    operation_id="news-detail_get/",
    operation_description="GET новость по ID",
))
@method_decorator(name='put', decorator=swagger_auto_schema(
    tags=["Новости"],
    operation_id="news-detail_put/",
    operation_description="PUT новость по ID (только админы)",
))
@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Новости"],
    operation_id="news-detail_patch/",
    operation_description="PATCH новость по ID (только админы)",
))
@method_decorator(name='delete', decorator=swagger_auto_schema(
    tags=["Новости"],
    operation_id="news-detail_delete/",
    operation_description="DELETE новость по ID (только админы)",
))
class NewsDetailAPIView(RetrieveUpdateDestroyAPIView, NewsMixin):
    pass
