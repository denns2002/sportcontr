from django.http import Http404
from django.shortcuts import render
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from settings.models import SiteSettings
from settings.serializers import SettingsSerializer


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Настройки"],
    operation_id="settings_get/",
    operation_description="GET нынешние настройки (только админы)",
))
@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Настройки"],
    operation_id="settings_post/",
    operation_description="POST создать настройки (только админы)",
))
@method_decorator(name='put', decorator=swagger_auto_schema(
    tags=["Настройки"],
    operation_id="settings_put/",
    operation_description="PUT изменить настройки (только админы)",
))
@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Настройки"],
    operation_id="settings_patch/",
    operation_description="PATCH изменить настройки (только админы)",
))
@method_decorator(name='delete', decorator=swagger_auto_schema(
    tags=["Настройки"],
    operation_id="settings_delete/",
    operation_description="DELETE удалить настройки (только админы)",
))
class SettingsView(RetrieveUpdateDestroyAPIView, CreateAPIView):
    serializer_class = SettingsSerializer
    permission_classes = [IsAdminUser]
    queryset = SiteSettings.objects.all()

    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()

    def get_object(self):
        obj = self.queryset.first()
        if obj:
            self.check_object_permissions(self.request, obj)

            return obj

        raise Http404

    def post(self, request, *args, **kwargs):
        if not SiteSettings.objects.all().count():
            return self.create(request, *args, **kwargs)

        return Response({'message': 'Настройки уже существуют'}, status=status.HTTP_409_CONFLICT)

    def retrieve(self, request, *args, **kwargs):
        instance = self.queryset.first()
        if instance:
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'message': 'Создайте настройки'}, status=status.HTTP_404_NOT_FOUND)

