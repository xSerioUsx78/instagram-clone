from django.db.models.signals import post_save, post_delete
from .models import Comment


def increase_comments(sender, instance, created, *args, **kwargs):
    if created:
        instance.content_object.comments_count += 1
        instance.content_object.save()


post_save.connect(increase_comments, sender=Comment)


def decrease_comments(sender, instance, *args, **kwargs):
    instance.content_object.comments_count -= 1
    instance.content_object.save()


post_delete.connect(decrease_comments, sender=Comment)
