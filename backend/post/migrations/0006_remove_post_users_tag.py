# Generated by Django 3.2.9 on 2021-11-24 18:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0005_post_comments_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='users_tag',
        ),
    ]
