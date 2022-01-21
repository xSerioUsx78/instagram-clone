from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Following, Profile


User = get_user_model()


@admin.register(User)
class MyUserAdmin(UserAdmin):
    pass


admin.site.register(Profile)
admin.site.register(Following)
