from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import (
    ListAPIView, GenericAPIView, CreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from groups.models import Group
from groups.permissions import IsAdminOrTrainer
from groups.serializers import GroupSerializer, GroupTrainerSerializer


class GroupMixin(GenericAPIView):
    serializer_class = GroupSerializer
    lookup_field = "slug"
    permission_classes = [IsAdminUser]
    queryset = Group.objects.all()


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Группы"],
    operation_id="groups-list_get/",
    operation_description="GET все группы (для админов)",
))
@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Группы"],
    operation_id="groups-list_post/",
    operation_description="POST группы с возможностью сразу указать тренеров (для админов)",
))
class GroupsAllView(ListAPIView, CreateAPIView, GroupMixin):
    pass


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Группы"],
    operation_id="groups-detail_get/",
    operation_description="GET группу по ID (только админы)",
))
@method_decorator(name='put', decorator=swagger_auto_schema(
    tags=["Группы"],
    operation_id="groups-detail_put/",
    operation_description="PUT группу по ID (только админы)",
))
@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Группы"],
    operation_id="groups-detail_patch/",
    operation_description="PATCH группу по ID (только админы)",
))
@method_decorator(name='delete', decorator=swagger_auto_schema(
    tags=["Группы"],
    operation_id="groups-detail_delete/",
    operation_description="DELETE группу по ID (только админы)",
))
class GroupsDetailView(RetrieveUpdateDestroyAPIView, GroupMixin):
    pass


class GroupsTrainerMixin(GroupMixin):
    serializer_class = GroupTrainerSerializer
    permission_classes = [IsAdminOrTrainer]

    def get_queryset(self):
        queryset = Group.objects.filter(trainers=self.request.user)

        return queryset


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Группы для тренеров"],
    operation_id="groups-trainer-list_get/",
    operation_description="GET все группы тренера. "
                          "ВАЖНО: ДОСТУП К ЭТИМ URLS ИМЕЕТ USER "
                          "С ГАЛКОЙ IS_TRAINER",
))
@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Группы для тренеров"],
    operation_id="groups-trainer-list_post/",
    operation_description="POST группы без возможности указать тренеров, "
                          "себя ставит автоматически. "
                          "ВАЖНО: ДОСТУП К ЭТИМ URLS ИМЕЕТ USER "
                          "С ГАЛКОЙ IS_TRAINER",
))
class GroupsTrainerListView(ListAPIView, CreateAPIView, GroupsTrainerMixin):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["trainers"] = [request.user.id]
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Группы для тренеров"],
    operation_id="groups-trainer-detail_get/",
    operation_description="GET свою группу по ID (только тренеры). "
                          "ВАЖНО: ДОСТУП К ЭТИМ URLS ИМЕЕТ USER "
                          "С ГАЛКОЙ IS_TRAINER",
))
@method_decorator(name='put', decorator=swagger_auto_schema(
    tags=["Группы для тренеров"],
    operation_id="groups-trainer-detail_put/",
    operation_description="PUT свою группу по ID (только тренеры). "
                          "ВАЖНО: ДОСТУП К ЭТИМ URLS ИМЕЕТ USER "
                          "С ГАЛКОЙ IS_TRAINER",
))
@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Группы для тренеров"],
    operation_id="groups-trainer-detail_patch/",
    operation_description="PATCH свою группу по ID (только тренеры). "
                          "ВАЖНО: ДОСТУП К ЭТИМ URLS ИМЕЕТ USER "
                          "С ГАЛКОЙ IS_TRAINER",
))
@method_decorator(name='delete', decorator=swagger_auto_schema(
    tags=["Группы для тренеров"],
    operation_id="groups-trainer-detail_delete/",
    operation_description="DELETE свою группу по ID (только тренеры). "
                          "ВАЖНО: ДОСТУП К ЭТИМ URLS ИМЕЕТ USER "
                          "С ГАЛКОЙ IS_TRAINER",
))
class GroupsTrainerDetailView(RetrieveUpdateDestroyAPIView, GroupsTrainerMixin):
    pass

