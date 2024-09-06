from django.contrib.auth import get_user_model
from django.db import models

from common.utils.slug_generator import SlugGeneratorMixin


class Event(SlugGeneratorMixin):
    name = models.CharField(max_length=255)
    about = models.TextField()
    address = models.CharField(max_length=255)
    is_attestation = models.BooleanField(default=False)
    is_seminar = models.BooleanField(default=False)
    reg_start = models.DateTimeField(blank=True, null=True)
    reg_end = models.DateTimeField(blank=True, null=True)
    date_start = models.DateTimeField(blank=True, null=True)
    date_end = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(get_user_model(), blank=True, related_name='event_members')
    organizers = models.ManyToManyField(get_user_model(), blank=True, related_name='event_organizers')

    def __str__(self):
        return self.name
