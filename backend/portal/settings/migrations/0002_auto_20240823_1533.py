from django.db import migrations


def populate_my_table(apps, schema_editor):
    Data = apps.get_model('settings', 'SiteSettings')
    Site = apps.get_model('sites', 'Site')
    Data.objects.create(site=Site.objects.all().first())


class Migration(migrations.Migration):

    dependencies = [
        ('settings', '0001_initial'),
    ]

    operations = [
      migrations.RunPython(populate_my_table),
    ]
