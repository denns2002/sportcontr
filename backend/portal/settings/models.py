from django.db import models

from django.contrib.sites.models import Site


class SiteSettings(models.Model):
    site = models.OneToOneField(Site, on_delete=models.CASCADE)

    title = models.CharField(max_length=255, default='SiteName')
    favicon = models.FileField(blank=True, null=True)
    logo = models.FileField(blank=True, null=True)

    palette = models.CharField(max_length=255, blank=True, null=True)
    typography = models.CharField(max_length=255, blank=True, null=True)

    news = models.BooleanField(default=False)
    groups = models.BooleanField(default=False)
    events = models.BooleanField(default=False)

    def __str__(self):
        return 'НАСТРОЙКИ САЙТА'

    def save(self):
        if not self.site:
            self.site = Site.objects.all().first()

        super().save()

    class Meta:
        verbose_name = verbose_name_plural = 'НАСТРОЙКИ САЙТА'
