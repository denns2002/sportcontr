from django.contrib.auth import get_user_model
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers

from users.models import UserPhonenumber


class UserPhonenumbersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPhonenumber
        fields = ['telephone']


class UserSerializer(WritableNestedModelSerializer):
    userphonenumber_set = UserPhonenumbersSerializer(many=True)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = get_user_model()
        fields = [
            "id", "username", "email",
            "is_staff", "is_active", "is_superuser",
            "is_verified", "is_trainer", "first_name",
            "last_name", 'middle_name', 'birth_date',
            'avatar', "created_at", "updated_at",
            "userphonenumber_set"
        ]
        read_only_fields = [
            "id", "created_at", "updated_at", "is_staff",
            "is_active", "is_verified", 'email'
        ]
