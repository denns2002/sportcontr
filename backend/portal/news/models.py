from django.contrib.auth import get_user_model
from django.db import models

from common.utils.slug_generator import SlugGeneratorMixin


class News(SlugGeneratorMixin):
    image = models.ImageField(blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_published = models.BooleanField(default=True)
    author = models.ForeignKey(get_user_model(), null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name, verbose_name_plural = "Новость", "Новости"
