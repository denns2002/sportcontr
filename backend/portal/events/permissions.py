from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class SafeAnyUnsafeOrgs(permissions.BasePermission):
    """
    Object-level permission to only allow updating his own profile
    """
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        if request.user in obj.organizers.all():
            return True

        return request.user.is_authenticated and (request.user.is_superuser or request.user.is_staff)


class IsTrainerOrOrgs(permissions.BasePermission):
    """
    Object-level permission to only allow updating his own profile
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.is_superuser or request.user.is_staff)

    def has_object_permission(self, request, view, obj):
        if request.user in obj.organizers.all():
            return True

        return request.user.is_authenticated and (request.user.is_superuser or request.user.is_staff or request.user.is_trainer)
