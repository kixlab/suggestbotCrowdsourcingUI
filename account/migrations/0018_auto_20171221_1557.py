# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-21 15:57
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0017_assign_emotionhit'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Assign',
        ),
        migrations.DeleteModel(
            name='EmotionHit',
        ),
    ]
