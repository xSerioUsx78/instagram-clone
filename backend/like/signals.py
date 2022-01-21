from django.db.models.signals import post_save, post_delete
from .models import Like


def increase_likes(sender, instance, created, *args, **kwargs):
    if created:
        instance.content_object.likes_count += 1
        instance.content_object.save()


post_save.connect(increase_likes, sender=Like)


def decrease_likes(sender, instance, *args, **kwargs):
    instance.content_object.likes_count -= 1
    instance.content_object.save()


post_delete.connect(decrease_likes, sender=Like)
