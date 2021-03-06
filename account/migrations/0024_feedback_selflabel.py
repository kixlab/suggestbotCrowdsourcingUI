# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-10 11:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0023_data_feedbackmodel_intention_labels'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aId', models.CharField(max_length=20)),
                ('wId', models.CharField(max_length=20)),
                ('feedback1', models.TextField()),
                ('feedback2', models.TextField()),
                ('feedback3', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Selflabel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aId', models.CharField(max_length=20)),
                ('wId', models.CharField(max_length=20)),
                ('arousal', models.FloatField()),
                ('valence', models.FloatField()),
            ],
        ),
    ]
