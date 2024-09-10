from django.contrib.auth import get_user_model
from django.db import models

from common.utils.slug_generator import SlugGeneratorMixin


class Group(SlugGeneratorMixin):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    trainers = models.ManyToManyField(get_user_model(), blank=True, related_name='group_trainers')
    members = models.ManyToManyField(get_user_model(), blank=True, related_name='group_members')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name, verbose_name_plural = "Группа", "Группы"
