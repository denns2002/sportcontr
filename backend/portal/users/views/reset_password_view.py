from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.utils.encoding import DjangoUnicodeDecodeError, smart_str
from django.utils.http import urlsafe_base64_decode
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from mailings.utils.send_email import send_token
from users.serializers.reset_password_serializer import (
    RequestPasswordResetSerializer,
    SetNewPasswordSerializer
)
from users.utils.token import account_activation_token


@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Восстановление пароля"],
    operation_id="request-pass-reset/",
    operation_description="Запрос на восстановление пароля -> password-token-check/",
    responses={
        200: "Письмо отправленно",
        401: "Почта не зарегистрирована",

    },
))
class RequestPasswordResetAPIView(GenericAPIView):
    """
    Send password reset link with tokens to email if the user has
    forgotten the login password.
    """

    permission_classes = [AllowAny]
    serializer_class = RequestPasswordResetSerializer

    def post(self, request):
        email = request.data.get("email", "")

        if get_user_model().objects.filter(email=email).exists():
            user = get_user_model().objects.get(email=email)
            subject = 'Восстановление пароля'
            body = "Здравствуйте, " + user.first_name.title() + \
                   "!\nИспользуйте эту ссылку, чтобы восстановить ваш пароль.\n\n"
            send_token(request, "email-verify", subject, body, user,  is_reset_password=True)

            return Response(
                {"message": "Мы отправили письмо для восстановления на вашу электронную почту"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"message": "Этот адрес электронной почты не зарегистрирован"},
            status=status.HTTP_404_NOT_FOUND
        )


@method_decorator(name='get', decorator=swagger_auto_schema(
    tags=["Восстановление пароля"],
    operation_id="password-token-check/",
    operation_description="Ссылка для проверки восстановления пароля -> set-password-token/",
    responses={
        200: "Токены валидны",
        400: "Токены не действительны",

    },
))
class PasswordTokenCheckAPI(GenericAPIView):
    """
    Token and uid verification.
    """

    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        try:
            uidb64 = smart_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(id=uidb64)

            if not account_activation_token.check_token(user, token):
                raise DjangoUnicodeDecodeError

            return Response({
                "message": "Valid", "uidb64": uidb64, "token": token
            }, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError:
            return Response(
                {"message": "Ссылка не действительна, сделайте новый запрос"},
                status=status.HTTP_400_BAD_REQUEST,
            )


@method_decorator(name='patch', decorator=swagger_auto_schema(
    tags=["Восстановление пароля"],
    operation_id="set-password-token/",
    operation_description="Итоговая форма смены пароля",
    responses={
        200: "Пароль изменен",
        401: "Ссылка истекла",

    },
))
class SetPasswordTokenAPI(GenericAPIView):
    """
    Token and uid verification.
    """

    permission_classes = [AllowAny,]
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            return Response(
                {"message": "Пароль успешно изменен"},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
