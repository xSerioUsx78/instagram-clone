import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from model_utils.fields import StatusField
from model_utils import Choices

# Create your models here.


class User(AbstractUser):
    username_validator = ASCIIUsernameValidator()
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    email = models.EmailField(_('email address'), unique=True)
    is_verified = models.BooleanField(
        _('Is verified'),
        default=False,
        help_text=_(
            'This show the user is verified and have the blue tick or not.')
    )
    phone_number = PhoneNumberField(null=True)
    GENDER = Choices('Male', 'Female', 'Custom', 'Prefer not to say')
    gender = StatusField(null=True, choices_name='GENDER')


def get_image_upload_to(instance, filename):
    return f"users/{instance.user.id}/{uuid.uuid4()}/{filename}_{uuid.uuid4()}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to=get_image_upload_to, default="users/default.png")
    website = models.CharField(max_length=150, blank=True, null=True)
    bio = models.TextField(max_length=150, blank=True, null=True)
    similar_account_suggestions = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.user.username


class Following(models.Model):

    """
    follower_user field is the person who followed following_user field
    and we can access all the followings by a user by using follower_user related_name
    and we can access all the followers by a user by using following_user related name
    """

    follower_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='followings')
    following_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='followers')
    following_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['follower_user', 'following_user'],  name="unique_followers")
        ]

    def __str__(self):
        return f"{self.follower_user.username} follows {self.following_user.username}"
