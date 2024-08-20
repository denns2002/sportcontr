from itertools import chain

from django.contrib.auth import get_user_model
from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters, status
from rest_framework.generics import (
    GenericAPIView, ListAPIView,
    RetrieveUpdateDestroyAPIView, UpdateAPIView
)
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from mailings.utils.send_email import send_token
from projects.models import Project
from projects.permissions import ProjectOwnerPermission
from projects.serializers import (
    ProjectSerializer, ProjectChangeUrlSerializer,
    ProjectInviteSerializer
)


class ProjectMixin(GenericAPIView):
    permission_classes = [ProjectOwnerPermission, IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'url']
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        queryset = list(chain(Project.objects.filter(owner=user), Project.objects.filter(members=user)))

        return queryset


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-all-list/",
    operation_description="Все проекты",
))
class ProjectAllListAPIView(ListAPIView, ProjectMixin):
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Project.objects.all()


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-list_get/",
    operation_description="Проекты пользователя",
))
@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-list_create/",
    operation_description="Новый проект",
))
class ProjectListAPIView(ListAPIView, ProjectMixin):
    #TODO: сделать создание проекта во втором апи связанное с этим POST
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['owner'] = request.user
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-detail_get/",
    operation_description="GET проект по slug, доступно только если owner или в members",
))
@method_decorator(name='put', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-detail_put/",
    operation_description="PUT проект по slug, доступно только если owner или в members",
))
@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-detail_patch/",
    operation_description="PATCH проект по slug, доступно только если owner или в members",
))
@method_decorator(name='delete', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-detail_delete/",
    operation_description="DELETE проект по slug, доступно только если owner или в members",
))
class ProjectDetailAPIView(RetrieveUpdateDestroyAPIView, ProjectMixin):
    pass


@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-change-url_patch/",
    operation_description="Только для админов, позволяет сделать статус в проде и поменять урл",
))
@method_decorator(name='put', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-change-url_put/",
    operation_description="Только для админов, позволяет сделать статус в проде и поменять урл",
))
class ProjectChangeUrlAPIView(UpdateAPIView, ProjectMixin):
    permission_classes = [IsAdminUser]
    serializer_class = ProjectChangeUrlSerializer

    def get_queryset(self):
        return Project.objects.all()

@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Проекты"],
    operation_id="project-invite_post/",
    operation_description="Владелец может пригласить пользователя в свой "
                          "проект по его email"
))
class ProjectInviteAPIView(ProjectMixin):
    serializer_class = ProjectInviteSerializer

    def post(self, request, slug):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = get_user_model().objects.get(email=serializer.data['email'])
                project = Project.objects.get(slug=slug)
                project.members.add(user)
                project.save()
                return Response({'message': 'Пользователь добавлен в ваш проект'}, status=status.HTTP_200_OK)

            except Exception as e:
                print(e)
        return Response({'message': 'Такого пользователя не существует'}, status=status.HTTP_400_BAD_REQUEST)