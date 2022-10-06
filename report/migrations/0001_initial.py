# Generated by Django 4.1.2 on 2022-10-06 15:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        ('book', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Text',
            fields=[
                ('TextID', models.BigIntegerField(primary_key=True, serialize=False)),
                ('Original', models.TextField()),
                ('Correct', models.TextField()),
                ('Feedback', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='BookReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Step', models.SmallIntegerField()),
                ('Format', models.SmallIntegerField()),
                ('Keyword', models.TextField()),
                ('Page', models.SmallIntegerField()),
                ('Complete', models.BooleanField()),
                ('Bookmark', models.BooleanField()),
                ('Time', models.DateTimeField(auto_now=True)),
                ('BookID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book.book')),
                ('TextID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='report.text')),
                ('UserID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.user')),
            ],
            options={
                'unique_together': {('UserID', 'BookID')},
            },
        ),
    ]
