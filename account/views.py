from django.shortcuts import render, HttpResponse
from account.forms import testform
from django.http import HttpResponseRedirect
from . import models

# Create your views here.
def home(request):
    return(render(request,'account/home.html'))

def about(request):
    return(render(request,'account/about.html'))

def help(request):
    return(render(request,'account/help.html'))

def introduction1(request):
    return(render(request,'account/introduction1.html'))

def get(request):
    if request.method == 'POST':
        form = testform(request.POST)
        if form.is_valid():
            data=models.Data()
            data.q1 = form.cleaned_data['post']
            data.mturk_id = form.cleaned_data['mturk_id']
            data.val1 = form.cleaned_data['val1']
            data.val2 = form.cleaned_data['val2']
            args = {'form': form}
            return(HttpResponseRedirect('/home/thankyou/'))
    else:
        form = testform()
        return(render(request,'account/task.html', {'form': form}))

def thankyou(request):
    return(render(request,'account/thankyou.html'))
