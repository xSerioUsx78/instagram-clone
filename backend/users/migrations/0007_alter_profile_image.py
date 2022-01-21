# Generated by Django 3.2.9 on 2021-11-24 18:01

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20211107_1920'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='users/default.png', upload_to=users.models.get_image_upload_to),
        ),
    ]
