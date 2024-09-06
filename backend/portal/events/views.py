from rest_framework.generics import (
    GenericAPIView, ListAPIView, CreateAPIView,
    RetrieveUpdateDestroyAPIView, UpdateAPIView
)
from rest_framework.permissions import IsAdminUser

from common.permissions.safe_any_unsafe_admin import SafeAnyUnsafeAdmin
from common.permissions.settings_permission import HasSettingsPermission
from events.models import Event
from events.permissions import SafeAnyUnsafeOrgs, IsTrainerOrOrgs
from events.serializers import (
    EventSerializer, EventOrgsSerializer,
    EventMembersSerializer
)


class EventMixin(GenericAPIView):
    serializer_class = EventSerializer
    lookup_field = "slug"
    permission_classes = [IsAdminUser, HasSettingsPermission('events')]
    queryset = Event.objects.all().order_by('-created_at')

    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()


# Create your views here.
class EventListCreateAPIView(ListAPIView, CreateAPIView, EventMixin):
    permission_classes = [SafeAnyUnsafeAdmin, HasSettingsPermission('events')]


class EventDetailAPIView(RetrieveUpdateDestroyAPIView, EventMixin):
    permission_classes = [SafeAnyUnsafeOrgs, HasSettingsPermission('events')]


class EventOrgsAPIView(UpdateAPIView, EventMixin):
    serializer_class = EventOrgsSerializer


class EventMembersAPIView(UpdateAPIView, EventMixin):
    serializer_class = EventMembersSerializer
    permission_classes = [IsTrainerOrOrgs, HasSettingsPermission('events')]