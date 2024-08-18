from rest_framework import permissions

from projects.models import Project


class ProjectOwnerPermission(permissions.BasePermission):
    """
    Object-level permission to only allow updating his own profile
    """

    # def has_permission(self, request, view):
    #     user = request.user
    #     is_owner = Project.objects.filter(owner=user).exists()
    #     is_member = Project.objects.filter(members=user).exists()
    #     return is_owner or is_member

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if bool(request.user and request.user.is_staff):
            return True

        # obj here is a UserProfile instance
        return obj.owner == request.user or request.user in obj.members