import uuid
from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from taggit.managers import TaggableManager

# Create your models here.

User = get_user_model()


def get_file_upload_to(instance, filename):
    year = datetime.now().strftime('%Y')
    month = datetime.now().strftime('%m')
    day = datetime.now().strftime('%d')
    return f'storys/{instance.user.id}/{year}/{month}/{day}/{uuid.uuid4()}/{filename}'


class Story(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='storys')
    file = models.FileField(upload_to=get_file_upload_to)
    users_tag = TaggableManager(blank=True)
    created_time = models.DateTimeField(auto_now_add=True)
    viewers = GenericRelation(
        'view.Viewer',
        content_type_field='content_type',
        object_id_field='object_id',
        related_query_name='story')

    class Meta:
        ordering = ['-created_time']

    def __str__(self):
        return self.user.username
