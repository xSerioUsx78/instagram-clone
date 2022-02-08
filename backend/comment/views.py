from django.shortcuts import get_object_or_404
from core.utils import data_is_valid
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from like.models import Like
from like.serializers import LikeSerializer
from .models import Comment
from .serializers import CommentSerializer

# Create your views here.


class LikeView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        id = self.request.data.get('id')
        if data_is_valid(id):
            obj = get_object_or_404(Comment, id=id)
            try:
                like = Like.objects.create(
                    user=self.request.user,
                    content_object=obj
                )
            except:
                return Response(
                    {'detail': 'This user already liked this comment!'},
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
            obj = get_object_or_404(Comment, id=id)
            like = get_object_or_404(Like, comment=obj, user=self.request.user)
            like.delete()
            return Response(status=status.HTTP_201_CREATED)
        return Response({'detail': 'No data provided!'}, status=status.HTTP_400_BAD_REQUEST)


class ReplyCommentView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()\
        .select_related('user', 'user__profile',).prefetch_related(
        'likes', 'likes__user', 'likes__user__profile'
    )

    def get(self, request, pk, *args, **kwargs):
        queryset = super().get_queryset()
        queryset = queryset.filter(reply_id=pk)
        serializer = super().get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
