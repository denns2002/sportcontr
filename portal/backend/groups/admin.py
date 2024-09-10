from django.contrib import admin

from groups.models import Group


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    fields = [
        "id",
        'slug',
        'name',
        'description',
        'trainers',
        'members',
    ]
    list_display = ['name']
    readonly_fields = ['id', 'slug']
    search_fields = [
        "name",
        "description",
    ]
    filter_horizontal = [
        'trainers',
        'members',
    ]
