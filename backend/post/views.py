from django.db.models.query import Prefetch
from django.shortcuts import get_object_or_404
from django.db.models import Q
from core.utils import data_is_valid
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from comment.models import Comment
from comment.serializers import CommentSerializer
from like.models import Like
from like.serializers import LikeSerializer
from view.models import Viewer
from story.models import Story
from .models import Post, PostSaved
from .serializers import PostSavedSerializer, PostSerializer, BasePostSerializer


class PostView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()\
        .select_related(
        'user', 'user__profile'
    )\
        .prefetch_related(
        'files', 'users_tag',
        'users_tag__profile', 'tags',
        'saved'
    )

    def get_queryset(self):
        user_followings = self.request.user.followings.all()
        queryset = super().get_queryset()
        queryset = queryset.filter(
            user__followers__in=user_followings
        )\
            .prefetch_related(
            Prefetch('viewers', queryset=Viewer.objects.filter(
                user__followers__in=user_followings
            ).select_related('user', 'user__profile'), to_attr='filtered_viewers'),
            Prefetch('likes', queryset=Like.objects.filter(
                Q(user__followers__in=user_followings) | Q(
                    user=self.request.user)
            ).distinct().select_related('user', 'user__profile'), to_attr='filtered_likes'),
            Prefetch('comments', queryset=Comment.objects.filter(
                Q(user__followers__in=user_followings) | Q(
                    user=self.request.user)
            ).distinct().select_related('user', 'user__profile').prefetch_related(
                'likes', 'likes__user', 'likes__user__profile'
            ), to_attr='filtered_comments'),
            Prefetch('user__storys', queryset=Story.objects.exclude(
                viewers__user=self.request.user
            ), to_attr='filtered_storys'),
            Prefetch('saved', queryset=PostSaved.objects.filter(
                user=self.request.user,
            ), to_attr='filtered_saved')
        )
        return queryset


class PostDetailView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id, *args, **kwargs):
        user_followings = request.user.followings.all()
        posts = Post.objects.prefetch_related('files',)
        obj = get_object_or_404(
            posts.select_related(
                'user', 'user__profile'
            ).prefetch_related(
                'files', 'users_tag',
                'users_tag__profile', 'tags',
                'saved',
                Prefetch('viewers', queryset=Viewer.objects.filter(
                    user__followers__in=user_followings
                ).select_related('user', 'user__profile'), to_attr='filtered_viewers'),
                Prefetch('likes', queryset=Like.objects.filter(
                    Q(user__followers__in=user_followings) | Q(
                        user=request.user)
                ).distinct().select_related('user', 'user__profile'), to_attr='filtered_likes'),
                Prefetch('comments', queryset=Comment.objects.filter(
                    reply=None
                ).distinct().select_related('user', 'user__profile',).prefetch_related(
                    'likes', 'likes__user', 'likes__user__profile'
                ), to_attr='filtered_comments'),
                Prefetch('user__storys', queryset=Story.objects.exclude(
                    viewers__user=request.user
                ), to_attr='filtered_storys'),
                Prefetch('saved', queryset=PostSaved.objects.filter(
                    user=request.user,
                ), to_attr='filtered_saved')
            ), id=id)
        obj_serialized = PostSerializer(obj).data
        more_posts = posts.filter(user=obj.user).exclude(id=id)
        more_posts_serialized = BasePostSerializer(more_posts, many=True).data
        data = {
            'obj': obj_serialized,
            'more_posts': more_posts_serialized
        }
        return Response(data, status=status.HTTP_200_OK)


class LikeView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        id = self.request.data.get('id')
        if data_is_valid(id):
            obj = get_object_or_404(Post, id=id)
            try:
                like = Like.objects.create(
                    user=self.request.user,
                    content_object=obj
                )
            except:
                return Response(
                    {'detail': 'This user already liked this post!'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            return Response(
                {'like': LikeSerializer(like, read_only=True).data},
                status=status.HTTP_201_CREATED
            )
        return Response({'detail': 'No data provided!'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, *args, **kwargs):
        id = self.request.data.get('id')
        if data_is_valid(id):
            obj = get_object_or_404(Post, id=id)
            like = get_object_or_404(Like, post=obj, user=self.request.user)
            like.delete()
            return Response(status=status.HTTP_201_CREATED)
        return Response({'detail': 'No data provided!'}, status=status.HTTP_400_BAD_REQUEST)


class CommentView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        id = self.request.data.get('id')
        text = self.request.data.get('text')
        reply_id = self.request.data.get('reply_id')
        if data_is_valid(id) and data_is_valid(text):
            obj = get_object_or_404(Post, id=id)
            comment = Comment.objects.create(
                user=self.request.user,
                text=text,
                content_object=obj,
                reply_id=reply_id
            )
            return Response(
                {'comment': CommentSerializer(comment, read_only=True).data},
                status=status.HTTP_201_CREATED
            )
        return Response({'detail': 'No data provided!'}, status=status.HTTP_400_BAD_REQUEST)


class PostSavedView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        id = self.request.data.get('id')
        if data_is_valid(id):
            obj = get_object_or_404(Post, id=id)
            try:
                post_saved = PostSaved.objects.create(
                    user=self.request.user,
                    post=obj
                )
                return Response(
                    {'saved': PostSavedSerializer(
                        post_saved, read_only=True).data},
                    status=status.HTTP_201_CREATED
                )
            except:
                return Response(
                    {'detail': 'This user already were saved this post!'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response({'detail': 'No data provided!'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, *args, **kwargs):
        id = self.request.data.get('id')
        if data_is_valid(id):
            obj = get_object_or_404(Post, id=id)
            saved = get_object_or_404(
                PostSaved, post=obj, user=self.request.user)
            saved.delete()
            return Response(status=status.HTTP_201_CREATED)
        return Response({'detail': 'No data provided!'}, status=status.HTTP_400_BAD_REQUEST)