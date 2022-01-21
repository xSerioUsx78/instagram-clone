from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Story
from users.serializers import ProfileSerializer, ViewedUsersSerializer
from view.models import Viewer


User = get_user_model()


# class ViewerSerializer(serializers.ModelSerializer):

#     user = ViewedUsersSerializer(read_only=True)

#     class Meta:
#         model = Viewer
#         fields = ('user', 'viewed_time')


class StorySerializer(serializers.ModelSerializer):

    # viewers = ViewerSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = ('id',)


class UserStorysSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    storys = StorySerializer(many=True, read_only=True,
                             source="filtered_storys")

    class Meta:
        model = User
        fields = ('id', 'username', 'is_verified', 'profile', 'storys')
