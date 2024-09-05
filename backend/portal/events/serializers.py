from django.contrib.auth import get_user_model
from rest_framework import serializers

from events.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = [
            'id',
            'slug',
            'created_at',
            'members',
            'organizers',
        ]


class EventOrgsSerializer(serializers.ModelSerializer):
    organizers = serializers.PrimaryKeyRelatedField(many=True, queryset=get_user_model().objects.all())

    class Meta:
        model = Event
        fields = ['organizers']
        read_only_fields = ['organizers']


class EventMembersSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=get_user_model().objects.all())

    class Meta:
        model = Event
        fields = ['members']
        read_only_fields = ['members']
