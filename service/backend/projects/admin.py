from django.contrib import admin

from projects.models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "url"]
    search_fields = [
        "owner",
        "title",
        "title",
    ]
    list_filter = ["created_at", "updated_at"]

    fieldsets = (
        (None, {'fields': (
            'id', 'slug', 'title', 'description','on_prod', 'url', 'created_at', 'updated_at'
        )}),
        ('Owners', {'fields': (
            'owner', 'members'
        )})
    )

    readonly_fields = ["id", 'slug', "created_at", "updated_at"]
    filter_horizontal = ['members']
