# Generated by Django 3.2.9 on 2021-11-09 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_rename_updated_post_updated_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likes_count',
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='post',
            name='viewers_count',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
