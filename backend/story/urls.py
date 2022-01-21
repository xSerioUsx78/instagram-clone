from django.urls import path
from .views import UserFollowingStorysView


urlpatterns = [
    path('', UserFollowingStorysView.as_view()),
]
