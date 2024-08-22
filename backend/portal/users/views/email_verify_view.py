from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import (
    api_view, renderer_classes,
    permission_classes
)
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from users.utils.token import account_activation_token


@swagger_auto_schema(
    method='get',
    tags=["Авторизация и регистрация"],
    operation_id="email-verify/",
    operation_description="Вызывается, когда протзователь переходит по ссылке"
                          "из письма",
    responses={
        200: "Аккаунт активирован",
        400: "Ссылка не действительна",

    },
)
@api_view(('GET',))
@renderer_classes((JSONRenderer,))
@permission_classes((AllowAny,))
def activate(request):
    User = get_user_model()
    uidb64 = request.GET.get('uidb64')
    token = request.GET.get('token')

    try:
        uidb64 = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uidb64)

        if user.is_verified:
            return Response(
                {"message": "Аккаунт уже активирован"}, status=status.HTTP_200_OK
                )

        if account_activation_token.check_token(user, token):
            user.is_verified = True
            user.save()

            return Response(
                {"message": "Аккаунт активирован"}, status=status.HTTP_200_OK
            )

    except Exception:
        return Response(
            {"message": "Что-то пошло не так"}, status=status.HTTP_400_BAD_REQUEST
        )

    return Response(
        {"message": "Ссылка не действительна!"},
        status=status.HTTP_400_BAD_REQUEST
    )



