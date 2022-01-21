from django.urls import path
from .views import PostView, likeView, CommentView, PostSavedView, PostDetailView


urlpatterns = [
    path('', PostView.as_view()),
    path('<id>/', PostDetailView.as_view()),
    path('like/', likeView.as_view()),
    path('comment/', CommentView.as_view()),
    path('saved/', PostSavedView.as_view())
]
