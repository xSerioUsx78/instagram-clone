# Generated by Django 3.2.9 on 2022-02-01 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0003_comment_likes_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='replies_count',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
