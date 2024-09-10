from rest_framework import permissions


class IsAdminOrTrainer(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and (user.is_superuser or user.is_staff or user.is_trainer)

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
