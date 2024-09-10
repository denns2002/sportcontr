from rest_framework import serializers

from groups.models import Group


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            'id',
            'slug',
            'name',
            'description',
            'trainers',
            'members',
        )
        read_only_fields = [
            'id',
            'slug',
        ]


class GroupTrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            'id',
            'slug',
            'name',
            'description',
            'members',
            'trainers',
        )
        read_only_fields = [
            'id',
            'slug',
            'trainers',
        ]
