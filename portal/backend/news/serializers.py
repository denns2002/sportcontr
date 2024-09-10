from rest_framework import serializers

from news.models import News


class NewsSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = News
        fields = (
            'id',
            'slug',
            'image',
            'title',
            'description',
            'is_published',
            'author',
            'created_at',
            'updated_at'
        )
        read_only_fields = [
            'id',
            'slug',
            'author',
            'created_at',
            'updated_at'
        ]
