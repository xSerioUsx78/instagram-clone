from django.urls import path
from .views import (
    PostView, LikeView, CommentView,
    PostSavedView, PostDetailView, CreatePostView,
    UserProfilePostsView, UserProfileSavedPostsView
)


urlpatterns = [
    path('', PostView.as_view()),
    path('like/', LikeView.as_view()),
    path('comment/', CommentView.as_view()),
    path('saved/', PostSavedView.as_view()),
    path('create/', CreatePostView.as_view()),
    path('user/<str:username>/', UserProfilePostsView.as_view()),
    path('user/<str:username>/saved/', UserProfileSavedPostsView.as_view()),
    path('<int:id>/', PostDetailView.as_view())
]
