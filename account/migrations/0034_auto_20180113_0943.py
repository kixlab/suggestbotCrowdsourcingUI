# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-13 09:43
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0033_auto_20180112_1408'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='summary',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='taskmarker',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 1, 13, 9, 43, 30, 156928)),
        ),
        migrations.AlterField(
            model_name='taskmarker',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 1, 13, 9, 43, 30, 156882)),
        ),
    ]