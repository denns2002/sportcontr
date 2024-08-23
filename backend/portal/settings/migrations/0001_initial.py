# Generated by Django 5.1 on 2024-08-23 09:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sites', '0002_alter_domain_unique'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='SiteName', max_length=255)),
                ('favicon', models.FileField(blank=True, null=True, upload_to='')),
                ('logo', models.FileField(blank=True, null=True, upload_to='')),
                ('palette', models.CharField(blank=True, max_length=255, null=True)),
                ('typography', models.CharField(blank=True, max_length=255, null=True)),
                ('news', models.BooleanField(default=False)),
                ('groups', models.BooleanField(default=False)),
                ('events', models.BooleanField(default=False)),
                ('site', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='sites.site')),
            ],
            options={
                'verbose_name': 'НАСТРОЙКИ САЙТА',
                'verbose_name_plural': 'НАСТРОЙКИ САЙТА',
            },
        ),
    ]
