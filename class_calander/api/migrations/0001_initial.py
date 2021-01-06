# Generated by Django 3.1.4 on 2021-01-04 17:31

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('zoom', models.CharField(max_length=50)),
                ('host', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('class_days', models.CharField(default='0000000', max_length=7)),
                ('start_time', models.CharField(max_length=5)),
                ('class_duration', models.IntegerField(default=50)),
                ('code', models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True)),
            ],
        ),
    ]