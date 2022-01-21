from rest_framework import serializers
from users.serializers import UserBaseSerializer
from .models import Like


class LikeSerializer(serializers.ModelSerializer):

    user = UserBaseSerializer(read_only=True)

    class Meta:
        model = Like
        fields = ('user', 'liked_time')
