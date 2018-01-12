from django.contrib import admin
from .models import Assign, Labels, Selflabel, Feedback
# Register your models here.

# You do not need to write your models here.
# Migration does it for you.

admin.site.register(Assign)
admin.site.register(Labels)
admin.site.register(Selflabel)
admin.site.register(Feedback)
