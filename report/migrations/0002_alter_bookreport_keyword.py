# Generated by Django 4.1.2 on 2022-10-20 08:23

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('report', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookreport',
            name='keyword',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=45), blank=True, default=list, size=5),
        ),
    ]
