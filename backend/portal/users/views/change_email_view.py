from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.decorators import (
    api_view, renderer_classes,
    permission_classes
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from mailings.utils.send_email import send_token
from users.permissions.owner_user_permission import OwnUserPermission
from users.serializers.change_email_serializer import ChangeEmailSerializer
from users.utils.token import account_activation_token


@method_decorator(name='post', decorator=swagger_auto_schema(
    tags=["Смена почты"],
    operation_id="change-email/",
    operation_description="Запрос на смену почты",
    responses={
        200: "Письмо отправленно",
        400: "Адрес уже занят",

    },
))
class ChangeEmailAPIView(generics.GenericAPIView):
    permission_classes = [OwnUserPermission, IsAuthenticated]
    serializer_class = ChangeEmailSerializer

    def post(self, request):
        """Change email"""
        email = request.data.get("email")
        user = request.user

        if get_user_model().objects.filter(email=email):
            return Response(
                {'message': "Адрес электронной почты уже используется"}, status=status.HTTP_400_BAD_REQUEST)

        subject = 'Смена адреса электронной почты'
        body = "Здравствуйте, " + user.first_name.title() + \
               "!\nИспользуйте эту ссылку для смены адреса электронной почты.\n" \
               "Если это не вы отправили запрос, то напишите нам!\n\n"
        params = f"&email={request.data['email']}"
        send_token(request, "email-verify-new", subject, body, user, email=email, params=params, is_change_email=True)

        return Response({'message': "Письмо было отправленно на почту"}, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='get',
    tags=["Смена почты"],
    operation_id="email-verify-new/",
    operation_description="Вызывается, когда протзователь переходит по ссылке"
                          "из письма для смены почты",
    responses={
        200: "Адрес электронной почты изменен",
        400: "Ссылка не действительна",

    },
)
@api_view(('GET',))
@renderer_classes((JSONRenderer,))
@permission_classes((AllowAny,))
def activate_new_email(request):
    User = get_user_model()
    uidb64 = request.GET.get('uidb64')
    token = request.GET.get('token')
    email = request.GET.get('email')

    try:
        uidb64 = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uidb64)

        if account_activation_token.check_token(user, token):
            user.email = email
            user.save()

            return Response(
                {"message": "Ваш адрес электронной почты успешно изменен"},
                status=status.HTTP_200_OK
                )

    except Exception:
        pass

    return Response(
        {"message": "Ссылка для смены почты не действительна"},
        status=status.HTTP_400_BAD_REQUEST
    )



