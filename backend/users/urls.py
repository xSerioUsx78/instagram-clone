from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, UserView, UserInfoView,
    FollowUserView, UnFollowUserView, UserSuggestionsView
)


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('user/', UserView.as_view()),
    path('info/<str:username>/', UserInfoView.as_view()),
    path('follow/', FollowUserView.as_view()),
    path('unfollow/', UnFollowUserView.as_view()),
    path('suggestions/', UserSuggestionsView.as_view())
]