from rest_framework import serializers

from settings.models import SiteSettings


class SettingsSerializer(serializers.ModelSerializer):
    logo = serializers.FileField(required=False)
    favicon = serializers.FileField(required=False)

    class Meta:
        model = SiteSettings
        fields = (
            'title',
            'favicon',
            'logo',
            'palette',
            'typography',
            'news',
            'groups',
            'events',
        )
