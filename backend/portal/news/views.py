from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import (
    GenericAPIView, ListAPIView, CreateAPIView,
    RetrieveUpdateDestroyAPIView
)

from common.permissions.safe_any_unsafe_admin import SafeAnyUnsafeAdmin
from news.models import News
from news.serializers import NewsSerializer


class NewsMixin(GenericAPIView):
    serializer_class = NewsSerializer
    lookup_field = "slug"
    permission_classes = [SafeAnyUnsafeAdmin]
    queryset = News.objects.filter(is_published=True)


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
