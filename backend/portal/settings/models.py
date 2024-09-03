from django.db import models

from django.contrib.sites.models import Site


class SiteSettings(models.Model):
    site = models.OneToOneField(Site, on_delete=models.CASCADE)

    title = models.CharField(max_length=255, default='SiteName', verbose_name='Название сайта')
    favicon = models.FileField(blank=True, null=True, verbose_name='Иконка в браузере')
    logo = models.FileField(blank=True, null=True, verbose_name='Логотип сайта')

    palette = models.CharField(max_length=255, blank=True, null=True, verbose_name='Палитра')
    typography = models.CharField(max_length=255, blank=True, null=True, verbose_name='Типография')

    news = models.BooleanField(default=False, verbose_name='Включить Новости')
    groups = models.BooleanField(default=False, verbose_name='Включить Группы')
    events = models.BooleanField(default=False, verbose_name='Включить Мероприятия')

    def __str__(self):
        return 'НАСТРОЙКИ САЙТА'

    def save(self, *args, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.site:
            self.site = Site.objects.all().first()

        super().save()

    class Meta:
        verbose_name = verbose_name_plural = 'НАСТРОЙКИ САЙТА'
