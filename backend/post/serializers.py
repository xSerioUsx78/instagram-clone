from django.contrib.auth import get_user_model
from django.utils import timesince, timezone
from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from .models import Post, PostFiles, PostSaved
from users.serializers import ProfileSerializer, ViewerSerializer
from like.serializers import LikeSerializer
from comment.serializers import CommentSerializer
from story.serializers import StorySerializer


User = get_user_model()


class UserPostSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(read_only=True)
    storys = StorySerializer(
        source="filtered_storys", many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'profile', 'is_verified', 'storys')


class UsersTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class PostFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFiles
        exclude = ('post',)


class PostSavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostFiles
        fields = ('id',)


class BasePostSerializer(serializers.ModelSerializer):
    files = PostFilesSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'files', 'likes_count', 'comments_count')


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):

    user = UserPostSerializer(read_only=True)
    files = PostFilesSerializer(many=True, read_only=True)
    tags = TagListSerializerField()
    users_tag = UsersTagSerializer(many=True, read_only=True)
    created_time = serializers.SerializerMethodField()
    updated_time = serializers.SerializerMethodField()
    viewers = ViewerSerializer(
        many=True, read_only=True, source="filtered_viewers")
    likes = LikeSerializer(many=True, read_only=True, source="filtered_likes")
    comments = CommentSerializer(
        many=True, read_only=True, source="filtered_comments")
    saved = PostSavedSerializer(
        read_only=True, many=True, source="filtered_saved")

    class Meta:
        model = Post
        fields = '__all__'

    def get_created_time(self, obj):
        return timesince.timesince(obj.created_time, timezone.now())

    def get_updated_time(self, obj):
        if obj.updated_time:
            return timesince.timesince(obj.updated_time, timezone.now())
        return None
