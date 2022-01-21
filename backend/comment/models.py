from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

# Create your models here.


User = get_user_model()


class Comment(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField()
    reply = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='replies',
        blank=True,
        null=True
    )
    commented_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-commented_time']

    def __str__(self):
        return f'{self.user.username} commented on {self.content_object}'
