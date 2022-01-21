from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

# Create your models here.


User = get_user_model()


class Like(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="likes")
    liked_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('content_type', 'object_id', 'user')
        ordering = ['-liked_time']

    def __str__(self):
        return f'{self.user.username} liked {self.content_object.user.username}'
