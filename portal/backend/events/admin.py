from django.contrib import admin

from events.models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_attestation', 'is_seminar', 'reg_start', 'date_start']
    readonly_fields = ['id', 'slug', 'created_at']
    search_fields = [
        "name",
        "about",
        "address",
    ]
    list_filter = ["is_attestation", "is_seminar"]
    filter_horizontal = ['members', 'organizers']
