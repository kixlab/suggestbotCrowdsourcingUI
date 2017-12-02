from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.home),
    url(r'^about/$', views.about),
    url(r'^help/$', views.help),
    url(r'^introduction1/$', views.introduction1),
    url(r'^task/$', views.get),
    url(r'^thankyou/$', views.thankyou),
]
