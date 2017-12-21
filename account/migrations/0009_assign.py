# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-21 08:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0008_delete_assign'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assign',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vname', models.CharField(max_length=20)),
                ('start', models.FloatField()),
                ('full', models.BooleanField()),
                ('wid1', models.CharField(max_length=15)),
                ('wid2', models.CharField(max_length=15)),
                ('wid3', models.CharField(max_length=15)),
                ('done', models.BooleanField(default=False)),
            ],
        ),
    ]