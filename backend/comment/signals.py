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


def increase_replies_count(sender, instance, created, *args, **kwargs):
    if created:
        if instance.reply:
            instance.reply.replies_count += 1
            instance.reply.save()


post_save.connect(increase_replies_count, sender=Comment)


def decrease_replies_count(sender, instance, *args, **kwargs):
    if instance.reply:
        instance.reply.replies_count -= 1
        instance.reply.save()


post_delete.connect(decrease_replies_count, sender=Comment)
