# Generated by Django 4.1.2 on 2022-10-29 10:13

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('title', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('author', models.CharField(max_length=255)),
                ('genre', models.CharField(max_length=45)),
                ('chapters', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chapter', models.SmallIntegerField(default=0)),
                ('content', models.TextField()),
                ('content_lines', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), blank=True, default=list, size=None)),
                ('pages', models.SmallIntegerField(default=0)),
                ('quizzes', models.SmallIntegerField(default=0)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='content', to='book.book')),
            ],
        ),
        migrations.AddConstraint(
            model_name='content',
            constraint=models.UniqueConstraint(fields=('book', 'chapter'), name='book_chapter'),
        ),
    ]
