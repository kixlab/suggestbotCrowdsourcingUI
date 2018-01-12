from django.contrib import admin
from .models import Assign, Labels, Selflabel, Feedback, Video, Segment, Taskmarker
# Register your models here.

# You do not need to write your models here.
# Migration does it for you.
admin.site.register(Video)
admin.site.register(Segment)
admin.site.register(Assign)
admin.site.register(Labels)
admin.site.register(Selflabel)
admin.site.register(Feedback)
admin.site.register(Taskmarker)
