from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from mailings.utils.send_email import send_token
from users.serializers.register_serializer import RegisterSerializer


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
