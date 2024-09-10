from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from users.serializers.login_serializer import (
    LoginSerializer,
    VerifySerializer
)

from mailings.utils.send_email import send_token
from users.serializers.user_serializer import UserSerializer


@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Авторизация и регистрация"],
    operation_id="login/",
    operation_description="Вход пользователя, возвращает токен",
    responses={
        200: "Даст token, данные о пользователе можно получить по ручке verify/",
        401: "Не верные данные",

    },
))
class LoginAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        """
        Login.
        """
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid(raise_exception=True):
            user = (get_user_model().objects.filter(email=serializer.data.get("username")).first()
                    or get_user_model().objects.filter(username=serializer.data.get("username")).first())
            Token.objects.filter(user=user).delete()
            token = Token.objects.create(user=user)

            if not user.is_verified:
                subject = 'Подтвердите вашу почту'
                body = "Здравствуйте, " + user.first_name.title() + \
                       "!\nИспользуйте ссылку ниже, чтобы подтверить регистрацию. \n\n"
                send_token(request, "email-verify", subject, body, user, is_verification=True)

                return Response(
                    {"message": f"Здравствуйте, {user.first_name.title()}! На вашу "
                                f"почту отправленно письмо подтверждения"},
                    status=status.HTTP_200_OK,
                )
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Авторизация и регистрация"],
    operation_id="verify/",
    operation_description="Если передать токен, то вернет данные пользователя",
    responses={
        200: "Дает данные",
        400: "Токен не существует",

    },
))
class VerifyAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = VerifySerializer

    def post(self, request, *args, **kwargs):
        token = request.data
        serializer = self.serializer_class(data=token)
        if serializer.is_valid():
            try:
                token = Token.objects.get(key=token['token'])
                user = get_user_model().objects.get(id=token.user.id)
                kwargs.setdefault('context', self.get_serializer_context())
                user = UserSerializer(user)
                user = user.data
                if user['avatar']:
                    user['avatar'] = f'{"https" if request.is_secure() else "http"}://{request.META["HTTP_HOST"]}{user["avatar"]}'
                return Response({'user': user}, status=status.HTTP_200_OK)
            except Exception:
                return Response({'message': 'Токен не существует'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




