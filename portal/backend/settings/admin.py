from django.contrib import admin

from settings.models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'news',
        'groups',
        'events'
    ]

    def has_add_permission(self, request):
        base_add_permission = super(SiteSettingsAdmin, self).has_add_permission(request)
        if base_add_permission:
            count = SiteSettings.objects.all().count()
            if count == 0:
                return True

        return False
