from rest_framework import permissions


class OwnUserPermission(permissions.BasePermission):
    """
    Object-level permission to only allow updating his own profile
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if bool(request.user and request.user.is_staff):
            return True

        # obj here is a UserProfile instance
        return obj == request.user