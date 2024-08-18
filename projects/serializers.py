from rest_framework import serializers

from projects.models import Project


class ProjectChangeUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields = ['on_prod', 'url', 'slug']
        read_only_fields = ['slug']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields = [
            'owner',
            'members',
            'title',
            'description',
            'on_prod',
            'url',
            'created_at',
            'updated_at',
            'slug',
        ]
        read_only_fields = [
            'owner',
            'members',
            'on_prod',
            'url',
            'created_at',
            'updated_at',
            'slug',
        ]
