# Generated by Django 3.2.9 on 2021-11-11 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_auto_20211109_1858'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='comments_count',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
