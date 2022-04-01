from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, UserView, UserInfoView,
    FollowUserView, UnFollowUserView, UserSuggestionsView
)


app_name = "users"


urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('user/', UserView.as_view(), name="user"),
    path('info/<str:username>/', UserInfoView.as_view(), name="info"),
    path('follow/', FollowUserView.as_view(), name="follow"),
    path('unfollow/', UnFollowUserView.as_view(), name="unfollow"),
    path('suggestions/', UserSuggestionsView.as_view(), name="suggestions")
]