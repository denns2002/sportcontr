from django.contrib.auth import get_user_model
from django.http import FileResponse
from django.utils.crypto import get_random_string
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from mailings.utils.send_email import send_token
from users.serializers.register_serializer import (
    RegisterSerializer,
    RegisterManySerializer
)
from users.utils.generate_excel_file import generate_excel_file


@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Авторизация и регистрация"],
    operation_id="register/",
    operation_description="Регистрация пользователя с отправкой письма на почту",
    responses={
        200: 'Отправит письмо с подтверждением',
        201: 'Создает пользователя сразу (пока не активно)',
        400: 'Есть неуникальные поля'
    },
))
class RegisterAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        """Register and send email verify if the user is not verified."""

        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        user = get_user_model().objects.get(email=user_data['email'])

        if not user.is_verified:
            subject = 'Подтвердите вашу почту'
            body = "Здравствуйте, " + user.first_name.title() + \
                   "!\nИспользуйте ссылку ниже, чтобы подтверить регистрацию. \n\n"
            send_token(
                request, "email-verify", subject, body, user,
                is_verification=True
            )
            return Response(
                {
                    "message": f"Здравствуйте, {user.first_name.title()}! На вашу "
                               f"почту отправленно письмо подтверждения"
                },
                status=status.HTTP_200_OK,
            )
        return Response(user_data, status=status.HTTP_201_CREATED)


@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Авторизация и регистрация"],
    operation_id="register-many/",
    operation_description="Регистрация нескольких пользователей без отправки "
                          "писем на почту. Возвращает excel документ "
                          "со списками ФИО, дат рождения, логинами и паролями",
    responses={
        201: 'Пользователи созданы успешно',
        400: 'Ошибка в заполнении',
    },
))
class RegisterManyAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterManySerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            data = serializer.validated_data['users']

            for i, user in enumerate(data):
                username = get_random_string(length=8)
                password = get_random_string(length=10)
                data[i]['username'] = username
                data[i]['password'] = password

                user = get_user_model().objects.create(
                    username=user['username'],
                    first_name=user['first_name'],
                    last_name=user['last_name'],
                    middle_name=user['middle_name'],
                    birth_date=user['birth_date'],
                )
                user.set_password(password)
                user.save()

            filepath = generate_excel_file(data)
            url = f'{"https" if request.is_secure() else "http"}://{request.META["HTTP_HOST"]}/media/{filepath}'
            return Response({'url': url}, status=status.HTTP_200_OK)

        return Response({'message': 'Не правильно заполнены данные'},
                        status=status.HTTP_400_BAD_REQUEST)
