# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-12 13:51
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0031_auto_20180112_1351'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskmarker',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 1, 12, 13, 51, 28, 697380)),
        ),
        migrations.AlterField(
            model_name='taskmarker',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 1, 12, 13, 51, 28, 697295)),
        ),
    ]