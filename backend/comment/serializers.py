from django.utils import timesince, timezone
from rest_framework import serializers
from users.serializers import UserBaseSerializer
from like.serializers import LikeSerializer
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):

    user = UserBaseSerializer(read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    commented_time = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'user', 'text', 'commented_time',
                  'likes', 'likes_count', 'replies_count')

    def get_commented_time(self, obj):
        return timesince.timesince(obj.commented_time, timezone.now())
