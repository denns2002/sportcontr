from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from users.utils.token import account_activation_token


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ["email"]


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            uidb64 = force_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(id=uidb64)
            if not account_activation_token.check_token(user, token):
                raise AuthenticationFailed(
                    {"message": "Не правильная ссылка"}, 401
                )

            user.set_password(password)
            user.save()

            return user
        except Exception as e:
            raise AuthenticationFailed(
                {"message": "Не правильная ссылка"}, 401
            )
