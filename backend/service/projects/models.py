from django.contrib.auth import get_user_model
from django.db import models

from common.utils.slug_generator import SlugGeneratorMixin


class Project(SlugGeneratorMixin):
    owner = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    members = models.ManyToManyField(get_user_model(), related_name='project_members', blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    on_prod = models.BooleanField(default=False)
    url = models.CharField(max_length=255, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

