from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from .models import Profile


User = get_user_model()


def user_created(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)


post_save.connect(user_created, sender=User)
