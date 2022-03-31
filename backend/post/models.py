import uuid
from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from taggit.managers import TaggableManager

# Create your models here.

User = get_user_model()


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts')
    description = models.TextField(blank=True, null=True)
    tags = TaggableManager(blank=True, related_name="post_tags")
    location = models.CharField(max_length=100, blank=True, null=True)
    users_tag = models.ManyToManyField(
        User, blank=True, related_name="post_user_tags")
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(blank=True, null=True)
    edited = models.BooleanField(default=False)
    viewers = GenericRelation(
        'view.Viewer',
        content_type_field='content_type',
        object_id_field='object_id',
        related_query_name='post')
    likes = GenericRelation(
        'like.Like',
        content_type_field='content_type',
        object_id_field='object_id',
        related_query_name='post')
    comments = GenericRelation(
        'comment.Comment',
        content_type_field='content_type',
        object_id_field='object_id',
        related_query_name='post')
    likes_count = models.PositiveBigIntegerField(default=0)
    viewers_count = models.PositiveBigIntegerField(default=0)
    comments_count = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        return self.user.username


def get_file_upload_to(instance, filename):
    year = datetime.now().strftime('%Y')
    month = datetime.now().strftime('%m')
    day = datetime.now().strftime('%d')
    return f'posts/{instance.post.user.id}/{instance.post.id}/{year}/{month}/{day}/{uuid.uuid4()}/{filename}'


class PostFiles(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to=get_file_upload_to)
    created_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_time']

    def __str__(self):
        return self.post.user.username


class PostSaved(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="saved")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="post_saved")
    saved_time = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        unique_together = ('post', 'user')
        ordering = ['-saved_time']

    def __str__(self):
        return self.user.username
