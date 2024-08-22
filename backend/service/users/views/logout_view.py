from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, authentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Авторизация и регистрация"],
    operation_id="logout/",
    operation_description="Выход пользователя, удаляет токен",
    responses={200: 'Unauthorized'},
))
@permission_classes((IsAuthenticated,))
class Logout(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()

        return Response(status=status.HTTP_200_OK)
