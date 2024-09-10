from django.contrib import admin

from news.models import News


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    fields = [
        'id',
        'slug',
        'image',
        'title',
        'description',
        'is_published',
        'author',
        'created_at',
        'updated_at',
    ]
    list_display = ['title', 'is_published', 'created_at', 'updated_at']
    readonly_fields = ['id', 'slug', 'created_at', 'updated_at', 'author']
    search_fields = [
        "title",
        "description",
        "created_at",
        "updated_at",
    ]
    list_filter = ["is_published"]
