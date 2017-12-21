from django.shortcuts import render, HttpResponse
from .forms import testform
from django.contrib import messages
# FeedbackForm, intentionform
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
from django.utils.datastructures import MultiValueDictKeyError
from account.models import *
import os, queue
import json

assign_queue = queue.Queue()

def updateQueue():
    global assign_queue
    print ("updateQueue yes")
    all_entries = Assign.objects.all().filter(done=0)
    for i in all_entries:
        if not assign_queue.full():
            assignment = {}
            assignment['id'] = i.id
            assignment['vname'] = i.vname
            assignment['start'] = i.start
            assignment['full'] = i.full
            assign_queue.put(assignment)
        else:
            break
    print ("assigned")

# Input
# 1) vname (type: str) - specific location of the video file
# 2) duration (type: int) - duration of mp4 in seconds
# e.g. updateAssignTable("./account/static/account/media/grumpy_customer.mp4",120)
def updateAssignTable(video_location,duration):
    if os.path.isfile(video_location):
        vname = os.path.basename(video_location)
        segments = duration//5 if duration%5==0 else duration//5+1
        assign = Assign.objects.create(vname=vname,start=0,full=True, seq=0)
        assign.save()
        for i in range(segments):
            start = 5*i
            if start+5>duration:
                start = duration-5
            assign = Assign.objects.create(vname=vname,start=start,full=False, seq=i*2)
            assign.save()
            start = 5*i+2.5
            if start+5>duration:
                continue
            assign = Assign.objects.create(vname=vname,start=start,full=False, seq=i*2+1)
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
            if assign_queue.empty() or assign_queue.qsize()<10:
                updateQueue()
            assignment = assign_queue.get()
            print (assignment)
            return(render(request,'account/task.html', assignment))
    except MultiValueDictKeyError:
        if assign_queue.empty() or assign_queue.qsize()<10:
            updateQueue()
        assignment = assign_queue.get()
        print (assignment)
        return(render(request,'account/task.html', assignment))

def get(request):
    if request.method == 'POST':
        form = testform(request.POST)
        if form.is_valid():
            emotion=EmotionHit.objects.create(mturk_id = form.cleaned_data['mturk_id'],
                                            positivity1=float(form.cleaned_data['positivity1']),
                                            excitement1 = float(form.cleaned_data['excitement1']),
                                            bodyexpression1 = form.cleaned_data['bodyexpression1'],
                                            positivity2 = float(form.cleaned_data['positivity2']),
                                            excitement2 = float(form.cleaned_data['excitement2']),
                                            bodyexpression2 = form.cleaned_data['bodyexpression2'],
                                            length = form.cleaned_data['length'],
                                            elapsedtime = float(form.cleaned_data['elapsedtime']),
                                            assign_id = int(request.GET['id']))
            emotion.save()
        else:
            return(render(request, 'account/questionaire.html', {'form':form,"message":True}))
        if request.GET['full'] == "True" and float(form.cleaned_data['elapsedtime'])<1200:
            return(HttpResponseRedirect('/home/task?full=True'))
        else:
            return(HttpResponseRedirect('/home/feedback.html'))
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

def retrieve_emotion_data(request):
    video_name = request.GET.get("video_name")
    assigns = Assign.objects.filter(vname=video_name, full=False)
    data_to_return=[]
    for assign in assigns:
        no_val = True
        cur_count=0
        cur_pos1=0
        cur_pos2=0
        cur_exc1=0
        cur_exc2=0
        dic={}
        if assign.wid1 != "":
            no_val = False
            cur_count = cur_count + 1
            emohit = EmotionHit.objects.get(assign_id=assign.seq, mturk_id=assign.wid1)
            cur_pos1= cur_pos1 + float(emohit.positivity1)
            cur_pos2= cur_pos2 + float(emohit.positivity2)
            cur_exc1= cur_exc1 + float(emohit.excitement1)
            cur_exc2= cur_exc2 + float(emohit.excitement2)
        if assign.wid2!="":
            no_val = False
            cur_count = cur_count + 1
            emohit = EmotionHit.objects.get(assign_id=assign.seq, mturk_id=assign.wid2)
            cur_pos1= cur_pos1 + float(emohit.positivity1)
            cur_pos2= cur_pos2 + float(emohit.positivity2)
            cur_exc1= cur_exc1 + float(emohit.excitement1)
            cur_exc2= cur_exc2 + float(emohit.excitement2)
        if assign.wid3!="":
            no_val = False
            cur_count = cur_count + 1
            emohit = EmotionHit.objects.get(assign_id=assign.seq, mturk_id=assign.wid3)
            cur_pos1= cur_pos1 + float(emohit.positivity1)
            cur_pos2= cur_pos2 + float(emohit.positivity2)
            cur_exc1= cur_exc1 + float(emohit.excitement1)
            cur_exc2= cur_exc2 + float(emohit.excitement2)
        if no_val:
            dic=""
        else:
            dic['return_pos1'] = cur_pos1/cur_count
            dic['return_exc1'] = cur_exc1/cur_count
            dic['return_pos2'] = cur_pos2/cur_count
            dic['return_exc2'] = cur_exc1/cur_count
        data_to_return.append(dic)

    data ={
        'data' : json.dumps(data_to_return)
    }
    return JsonResponse(data)
#updateAssignTable("./account/static/account/media/grumpy_customer.mp4",120)
