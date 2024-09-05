from rest_framework import permissions


class IsAdminOrTrainer(permissions.BasePermission):
    """
    Object-level permission to only allow updating his own profile
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser or request.user.is_trainer):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser or request.user.is_trainer):
            return True
        return False
