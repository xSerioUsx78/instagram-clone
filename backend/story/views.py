from django.contrib.auth import get_user_model
from django.db.models.query import Prefetch
from rest_framework import generics
from .serializers import UserStorysSerializer
from story.models import Story

# Create your views here.


User = get_user_model()


class UserFollowingStorysView(generics.ListAPIView):
    serializer_class = UserStorysSerializer
    queryset = User.objects.all().prefetch_related('profile')

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(
            followers__in=self.request.user.followings.all(),
            storys__isnull=False).distinct()\
                .prefetch_related(
                    Prefetch(
                        'storys', queryset=Story.objects.exclude(
                            viewers__user=self.request.user
                        ), to_attr='filtered_storys'
                    )
                )
        return queryset
