from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    email = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=68, write_only=True)

    class Meta:
        model = get_user_model()
        fields = ["username", 'email', "password"]

    def validate(self, attrs):
        user = (
            get_user_model().objects.filter(email=attrs.get("username")).first()
            or get_user_model().objects.filter(username=attrs.get("username")).first()
        )
        if user:
            if user.check_password(attrs.get("password")):
                return attrs

            if not user.is_active:
                raise AuthenticationFailed("Аккаунт отключен, обратитесь в поддержку.")

        raise AuthenticationFailed("Не правильные данные.")


class VerifySerializer(serializers.Serializer):
    token = serializers.CharField()

