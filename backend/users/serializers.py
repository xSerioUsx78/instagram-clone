from django.core import exceptions
from django.contrib.auth import (
    authenticate, password_validation, get_user_model
)
from rest_framework import serializers
from .models import Profile
from story.models import Story
from view.models import Viewer


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        exclude = ('user',)


class UserBaseSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'is_verified', 'profile')


class ViewedUsersSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username',
                  'is_verified', 'profile')


class ViewerSerializer(serializers.ModelSerializer):

    user = ViewedUsersSerializer(read_only=True)

    class Meta:
        model = Viewer
        fields = ('user', 'viewed_time')


class StorySerializer(serializers.ModelSerializer):

    viewers = ViewerSerializer(read_only=True, many=True)

    class Meta:
        model = Story
        exclude = ('user',)


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(read_only=True)
    storys = StorySerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'is_verified', 'profile', 'storys')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        # get the password from the data
        password = data.get('password')

        errors = {}
        try:
            # validate the password and catch the exception
            password_validation.validate_password(password=password, user=User)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(RegisterSerializer, self).validate(data)

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user = User.objects.create_user(username, email, password)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Username or Password is invalid!"
        )
