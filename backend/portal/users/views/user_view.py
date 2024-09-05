from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, GenericAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from users.permissions.is_admin_or_trainer_permission import IsAdminOrTrainer
from users.permissions.owner_user_permission import OwnUserPermission
from users.serializers.user_serializer import UserSerializer


class UserMixin(GenericAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Пользователи"],
    operation_id="user-list/",
    operation_description="Список пользователей",
))
class UserListAPIView(ListAPIView, UserMixin):
    permission_classes = [IsAdminOrTrainer]


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Пользователи"],
    operation_id="user-detail_get/",
    operation_description="GET Пользователь по ID",
))
@method_decorator(name='put', decorator=swagger_auto_schema(
    tags=["Пользователи"],
    operation_id="user-detail_put/",
    operation_description="PUT Пользователь по ID",
))
@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Пользователи"],
    operation_id="user-detail_patch/",
    operation_description="PATCH Пользователь по ID",
))
@method_decorator(name='delete', decorator=swagger_auto_schema(
    tags=["Пользователи"],
    operation_id="user-detail_delete/",
    operation_description="DELETE Пользователь по ID",
))
class UserDetailAPIView(RetrieveUpdateDestroyAPIView, UserMixin):
    permission_classes = [OwnUserPermission, IsAuthenticated]
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
