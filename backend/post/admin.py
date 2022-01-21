from django.contrib import admin
from .models import Post, PostFiles, PostSaved

# Register your models here.


class PostFilesInline(admin.StackedInline):
    model = PostFiles
    extra = 0


@admin.register(Post)
class PostInline(admin.ModelAdmin):
    inlines = (PostFilesInline,)


admin.site.register(PostFiles)
admin.site.register(PostSaved)