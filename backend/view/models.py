from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

# Create your models here.


User = get_user_model()


class Viewer(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="viewer")
    viewed_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('content_type', 'object_id', 'user')
        ordering = ['-viewed_time']

    def __str__(self):
        return f'{self.user.username} viewed {self.content_object}'
