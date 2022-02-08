from django.urls import path
from .views import LikeView, ReplyCommentView


urlpatterns = [
    path('like/', LikeView.as_view()),
    path('<pk>/replies/', ReplyCommentView.as_view())
]
