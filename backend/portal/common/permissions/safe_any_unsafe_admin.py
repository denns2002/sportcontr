from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class SafeAnyUnsafeAdmin(permissions.BasePermission):
    """
    Object-level permission to only allow updating his own profile
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return request.user and (request.user.is_superuser or request.user.is_staff)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return request.user and (request.user.is_superuser or request.user.is_staff)
