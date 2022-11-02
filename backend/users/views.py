from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    UserSuggestionsSerializer
)
from .models import Following


User = get_user_model()


class RegisterView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        data = {
            "user": UserSerializer(
                user, context=self.get_serializer_context()).data,
            "token": token.key
        }
        return Response(data=data, status=status.HTTP_200_OK)


class LogoutView(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        # We get the user and destroy the token
        user = request.user
        try:
            token = Token.objects.get(user=user)
            token.delete()
        finally:
            # And at the last point we return HTTP_204_NO_CONTENT response
            # even there was a token or not.
            return Response(status=status.HTTP_204_NO_CONTENT)


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user


class UserInfoView(generics.GenericAPIView):

    def get(self, request, username, *args, **kwargs):
        user = get_object_or_404(User, username=username)
        posts_count = user.posts.count()
        followings_count = user.followings.count()
        followers_count = user.followers.count()
        followed_by_user = user.followers.filter(
            follower_user=self.request.user).exists()
        user_data = UserSerializer(user, read_only=True, context={
                                   'request': request}).data
        data = {
            "posts_count": posts_count,
            "followings_count": followings_count,
            "followers_count": followers_count,
            'followed_by_user': followed_by_user,
            'user': user_data
        }
        return Response(data)


class FollowUserView(generics.GenericAPIView):

    def post(self, *args, **kwargs):
        follower_user = self.request.user
        following_user_username = self.request.data.get('username')
        if follower_user.followings.filter(following_user__username=following_user_username).exists():
            return Response({"message": "The was followed already."}, status=status.HTTP_200_OK)

        following_user = get_object_or_404(User, username=following_user_username)
        Following.objects.create(
            follower_user=follower_user, following_user=following_user
        )
        return Response({"message": "The user was followed successfully."}, status=status.HTTP_201_CREATED)


class UnFollowUserView(generics.GenericAPIView):

    def delete(self, *args, **kwargs):
        follower_user = self.request.user
        following_user_username = self.request.data.get('username')
        get_object_or_404(
            Following, 
            follower_user=follower_user, 
            following_user__username=following_user_username
        ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserSuggestionsView(generics.ListAPIView):
    serializer_class = UserSuggestionsSerializer
    queryset = User.objects.all()

    def get_queryset(self, *args, **kwargs):
        queryset = super().get_queryset()
        user = self.request.user
        followers_users = user.followers.values_list(
            "follower_user__username", flat=True)
        followings_users = user.followings.values_list(
            "following_user__username", flat=True)
        queryset = queryset.filter(is_active=True).exclude(
            (
                Q(username__in=followings_users) | Q(id=user.id)
                |
                Q(username__in=followers_users) | Q(id=user.id))
        ).distinct()[:5]
        return queryset
