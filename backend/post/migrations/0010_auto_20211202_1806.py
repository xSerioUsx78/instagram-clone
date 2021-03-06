# Generated by Django 3.2.9 on 2021-12-02 14:36

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0009_postsaved'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='postsaved',
            options={'ordering': ['-saved_time']},
        ),
        migrations.AddField(
            model_name='postsaved',
            name='saved_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='postsaved',
            unique_together={('post', 'user')},
        ),
    ]
