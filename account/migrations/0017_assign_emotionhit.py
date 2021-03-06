# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-21 15:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0016_auto_20171221_1549'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assign',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vname', models.CharField(max_length=20)),
                ('seq', models.IntegerField()),
                ('start', models.FloatField()),
                ('full', models.BooleanField()),
                ('wid1', models.CharField(max_length=15)),
                ('wid2', models.CharField(max_length=15)),
                ('wid3', models.CharField(max_length=15)),
                ('done', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='EmotionHit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assign_id', models.IntegerField()),
                ('mturk_id', models.CharField(max_length=15)),
                ('positivity1', models.FloatField()),
                ('excitement1', models.FloatField()),
                ('positivity2', models.FloatField()),
                ('excitement2', models.FloatField()),
                ('bodyexpression1', models.CharField(max_length=50)),
                ('bodyexpression2', models.CharField(max_length=50)),
                ('length', models.TextField()),
                ('elapsedtime', models.FloatField()),
            ],
        ),
    ]
