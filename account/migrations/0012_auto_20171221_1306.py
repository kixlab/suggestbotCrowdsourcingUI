# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-21 13:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0011_auto_20171221_1305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assign',
            name='start',
            field=models.FloatField(),
        ),
    ]