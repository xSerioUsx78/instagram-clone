from rest_framework import serializers
from users.serializers import UserBaseSerializer
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):

    user = UserBaseSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'user', 'text', 'commented_time')
