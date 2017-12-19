from django.shortcuts import render, HttpResponse
from .forms import testform, FeedbackForm, intentionform
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
            #data.q1 = form.cleaned_data['q1']
            data.mturk_id = form.cleaned_data['mturk_id']
            data.val1 = form.cleaned_data['val1']
            data.val2 = form.cleaned_data['val2']
            data.q1 = form.cleaned_data['q1']
            args = {'form': data}
            data.save()
            return(HttpResponseRedirect('/home/feedback/'))
    else:
        form = testform()
        return(render(request,'account/task.html', {'form': form}))

def getIntention(request):
    if request.method == 'POST':
        form = intentionform(request.POST)
        if form.is_valid():
            data=models.Intention()
            #data.q1 = form.cleaned_data['q1']
            data.mturk_id = form.cleaned_data['mturk_id']
            args = {'form': data}
            data.save()
            return(HttpResponseRedirect('/home/feedback/'))
    else:
        form = intentionform()
    return(render(request,'account/intention.html', {'form': form}))

def thankyou(request):
    return(render(request,'account/thankyou.html'))

def feedback(request):
    form = FeedbackForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            feed_data=models.FeedbackModel()
            #data.q1 = form.cleaned_data['q1'
            feed_data.text = form.cleaned_data['text']
            args = {'form': feed_data}
            feed_data.save()
        return(HttpResponseRedirect('/home/thankyou/'))
    return(render(request,'account/feedback.html'))
