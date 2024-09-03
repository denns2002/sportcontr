from rest_framework import permissions
from django.apps import apps


class HasSettingsPermission(permissions.BasePermission):
    def __init__(self, application):
        self.field = application.lower()

    def __call__(self):
        return self

    def has_permission(self, request, view):
        try:
            settings = apps.get_model('settings', 'SiteSettings')
            settings = settings.objects.all().first()
            if settings:
                return getattr(settings, self.field)
        except (LookupError, AttributeError):
            return False

        return False

    has_object_permission = has_permission
