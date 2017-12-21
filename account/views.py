from django.shortcuts import render, HttpResponse
from .forms import testform
from django.contrib import messages
# FeedbackForm, intentionform
from django.http import HttpResponseRedirect
from django.utils.datastructures import MultiValueDictKeyError
from account.models import *
import os, queue
# Input
# 1) vname (type: str) - specific location of the video file
# 2) duration (type: int) - duration of mp4 in seconds
# e.g. updateAssignTable("./account/static/account/media/grumpy_customer.mp4",1200)

assign_queue = queue.Queue()

def updateQueue():
    global assign_queue
    print ("updateQueue yes")
    q = queue.Queue(maxsize=300)
    all_entries = Assign.objects.all().filter(done=0)
    for i in all_entries:
        if not q.full():
            assignment = {}
            assignment['id'] = i.id
            assignment['vname'] = i.vname
            assignment['start'] = i.start
            assignment['full'] = i.full
            q.put(assignment)
        else:
            break
    print ("assigned")
    assign_queue = q

# while True:
#     updateQueue()
#     time.sleep(1)

def updateAssignTable(video_location,duration):
    print (video_location)
    if os.path.isfile(video_location):
        vname = os.path.basename(video_location)
        segments = duration//5 if duration%5==0 else duration//5+1
        assign = Assign.objects.create(vname=vname,start=0,full=True)
        assign.save()
        for i in range(segments):
            start = 5*i
            if start+5>duration:
                start = duration-5
            assign = Assign.objects.create(vname=vname,start=start,full=False)
            assign.save()
            start = 5*i+2.5
            if start+5>duration:
                continue
            assign = Assign.objects.create(vname=vname,start=start,full=False)
            assign.save()
    else:
        print ("Please check video location again")

# Create your views here.
def home(request):
    return(render(request,'account/home.html'))

def about(request):
    return(render(request,'account/about.html'))

def help(request):
    return(render(request,'account/help.html'))

def introduction1(request):
    return(render(request,'account/introduction1.html'))

def task(request):
    try:
        if request.GET['full'] == "True":
            return(render(request,'account/task.html', {"full":True}))
        else:
            if assign_queue.empty() or assign_queue.qsize()<50:
                updateQueue()
            assignment = assign_queue.get()
            print (assignment)
            return(render(request,'account/task.html', assignment))
    except MultiValueDictKeyError:
        if assign_queue.empty() or assign_queue.qsize()<50:
            updateQueue()
        assignment = assign_queue.get()
        print (assignment)
        return(render(request,'account/task.html', assignment))

def get(request):
    if request.method == 'POST':
        form = testform(request.POST)
        if form.is_valid():
            emotion=EmotionHit.objects.create(positivity1=int(form.cleaned_data['positivity1']),
                                            excitement1 = int(form.cleaned_data['excitement1']),
                                            bodyexpression1 = form.cleaned_data['bodyexpression1'],
                                            positivity2 = int(form.cleaned_data['positivity2']),
                                            excitement2 = int(form.cleaned_data['excitement2']),
                                            bodyexpression2 = form.cleaned_data['bodyexpression2'],
                                            length = form.cleaned_data['length'],
                                            elapsedtime = float(form.cleaned_data['elapsedtime']),
                                            assign_id = int(request.GET['id']))
            print(emotion)
            emotion.save()
            print("saved")
        else:
            return(render(request, 'account/questionaire.html', {'form':form,"message":True}))
        if request.GET['full'] == "True":
            return(HttpResponseRedirect('/home/task?full=True'))
        else:
            return(HttpResponseRedirect('/home/'))
    else:
        form = testform()
        return(render(request,'account/questionaire.html', {'form': form}))

def getIntention(request):
    if request.method == 'POST':
        form = intentionform(request.POST)
        if form.is_valid():
            # data=models.Intention()
            # #data.q1 = form.cleaned_data['q1']
            # data.mturk_id = form.cleaned_data['mturk_id']
            # args = {'form': data}
            # data.save()
            return(HttpResponseRedirect('/home/feedback/'))
    else:
        form = intentionform()
        return(render(request,'account/intention.html', {'form': form}))

def thankyou(request):
    return(render(request,'account/thankyou.html'))

def feedback(request):
    form = FeedbackForm(request.POST)
    print(form)
    if request.method == 'POST':
        # if form.is_valid():
            # feed_data=models.FeedbackModel()
            # #data.q1 = form.cleaned_data['q1'
            # feed_data.text = form.cleaned_data['text']
            # args = {'form': feed_data}
            # feed_data.save()
        return(HttpResponseRedirect('/home/thankyou/'))
    return(render(request,'account/feedback.html'))
