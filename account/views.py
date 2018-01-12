from django.shortcuts import render, HttpResponse
from .forms import testform, FeedbackForm
from django.contrib import messages
# FeedbackForm, intentionform
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import csrf_exempt
from account.models import *
import os, queue
import json
import random
import logging

assign_queue = queue.Queue()

def updateQueue():
    global assign_queue
    print ("updateQueue yes")
    all_entries = Assign.objects.all().filter(done=0).order_by("?")
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

def generateFakeData():
    all_entries = list(Assign.objects.all().order_by("?"))
    for i in Assign.objects.all():
        i.wid1 = ""
        i.wid2 = ""
        i.wid3 = ""
        i.save()
    for i in range(20):
        entry = all_entries[i]
        y1 = (random.choice(list(range(193,407)))-300)/200
        x1 = (random.choice(list(range(184,411)))-300)/200
        y2 = (random.choice(list(range(193,407)))-300)/200
        x2 = (random.choice(list(range(184,411)))-300)/200
        emohit = EmotionHit.objects.create(mturk_id = "fake",
                    positivity1=x1,
                    excitement1 = y1,
                    bodyexpression1 = 'none',
                    positivity2 = x2,
                    excitement2 = y2,
                    bodyexpression2 = 'none',
                    length = 'length does not matter',
                    elapsedtime = 0.0,
                    assign_id = int(entry.id))
        emohit.save()
        assign = Assign.objects.get(id=int(entry.id))
        if not assign.wid1:
            assign.wid1='fake'
        elif not assign.wid2:
            assign.wid2='fake'
        else:
            assign.wid3='fake'
        assign.save()


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

def self_emotion(request):
    return(render(request,'account/self_emotion_tagging.html'))

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

            print("AAA")
            data1=models.Data()
            data1.fig_id=1
            data1.val1 = int(form.cleaned_data['val1_1'])
            data1.val2 = int(form.cleaned_data['val1_2'])
            data1.q1 = form.cleaned_data['q1_1']
            data1.save()
            data2=models.Data()
            data2.fig_id=2
            data2.val1 = int(form.cleaned_data['val2_1'])
            data2.val2 = int(form.cleaned_data['val2_2'])
            data2.q1 = form.cleaned_data['q2_1']
            data2.save()
            data2.save()
            #elapsedtime
            elapsedtime = float(form.cleaned_data['elapsedtime'])
            print(elapsedtime)
        # if(token== True):
        #     return(HttpResponseRedirect('/home/task/'))
        # else:
        #     return(HttpResponseRedirect('/home/feedback/'))
        #
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
            assign = Assign.objects.get(id=int(request.GET['id']))
            if not assign.wid1:
                assign.wid1=form.cleaned_data['mturk_id']
            elif not assign.wid2:
                assign.wid2=form.cleaned_data['mturk_id']
            else:
                assign.wid3=form.cleaned_data['mturk_id']
        else:
            return(render(request, 'account/questionaire.html', {'form':form,"message":True}))

        if request.GET['full'] == "True" and float(form.cleaned_data['elapsedtime'])<1200:
            return(HttpResponseRedirect('/home/task?full=True'))
        else:
            return(HttpResponseRedirect('/home/feedback/'))

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
    # form = FeedbackForm(request.POST)
    # print(form)
    # print(request.action)
    # if (request.method == 'POST'):
    #     print("feedback post method")
    #     # if form.is_valid():
    #         # feed_data=models.FeedbackModel()
    #         # #data.q1 = form.cleaned_data['q1'
    #         # feed_data.text = form.cleaned_data['text']
    #         # args = {'form': feed_data}
    #         # feed_data.save()
    #     return(HttpResponseRedirect('/home/thankyou/'))
    return(render(request,'account/feedback.html'))

def retrieve_emotion_data(request):
    video_name = request.GET.get("video_name")
    print (video_name)
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
            emohit = EmotionHit.objects.get(assign_id=assign.id, mturk_id=assign.wid1)
            cur_pos1= cur_pos1 + float(emohit.positivity1)
            cur_pos2= cur_pos2 + float(emohit.positivity2)
            cur_exc1= cur_exc1 + float(emohit.excitement1)
            cur_exc2= cur_exc2 + float(emohit.excitement2)
        if assign.wid2!="":
            no_val = False
            cur_count = cur_count + 1
            emohit = EmotionHit.objects.get(assign_id=assign.id, mturk_id=assign.wid2)
            cur_pos1= cur_pos1 + float(emohit.positivity1)
            cur_pos2= cur_pos2 + float(emohit.positivity2)
            cur_exc1= cur_exc1 + float(emohit.excitement1)
            cur_exc2= cur_exc2 + float(emohit.excitement2)
        if assign.wid3!="":
            no_val = False
            cur_count = cur_count + 1
            emohit = EmotionHit.objects.get(assign_id=assign.id, mturk_id=assign.wid3)
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
    print (data_to_return)
    return JsonResponse(data)
#updateAssignTable("./account/static/account/media/grumpy_customer.mp4",120)


# - video ID
# - segment ID (or starting time?)
# - worker ID
# - assignment ID (mturk has this param for all HITs)
# - time stamps (this should be a string of all time stamps a worker made)
# - comments
# - starting time of the task
# - ending time of the task (edited)
def save_emotion_exp3(request):
    video_id=request.POST.get("video_id")
    segment_id=request.POST.get("segment_id")
    mturk_id=request.POST.get("mturk_id")
    assign_id=request.POST.get("assign_id")
    timestamp=request.POST.get("timestamp")
    comments=request.POST.get("comments")
    start_time=request.POST.get("start_time")
    end_time=request.POST.get("end_time")
    exp3 = Experiment3.objects.create(video_id=video_id, segment_id=segment_id, mturk_id=mturk_id,assign_id=assign_id,
                                    timestamps=timestamps,comments=comments,start_time=start_time,end_time=end_time)
    exp3.save()
    return(HttpResponseRedirect('/home/feedback/'))

@csrf_exempt
def save_db(request):
    t = request.POST['type']
    aId = request.POST['aID']
    wId = request.POST['wID']
    if t == "selftag":
        js = json.loads(request.POST["result_json_string"])
        arousal = js['aro_self']
        valence = js['val_self']
        s = Selflabel.objects.create(aId=aId,
                                    wId=wId,
                                    arousal=arousal,
                                    valence=valence)
        s.save()
        print ("saved")
        return (HttpResponse(status=200))
    elif t == "label":
        timeUsed = float(request.POST['timeUsed'])
        start_time = request.POST['start_time']
        finish_time = request.POST["finish_time"]
        result_json_string = json.loads(request.POST["result_json_string"])
        for key,value in result_json_string.items():
            label_time = key
            arousal = value['aro']
            valence = value['val']
            label, created = Labels.objects.get_or_create(aId=aId,
                                                        wId=wId,
                                                        timeUsed=timeUsed,
                                                        start_time=start_time,
                                                        finish_time=finish_time,
                                                        label_time=label_time,
                                                        arousal=arousal,
                                                        valence=valence)
            print (label, created)
            if created:
                label.save()
    elif t == "feedback":
        js = json.loads(request.POST["result_json_string"])
        feedback1 = js['q1']
        feedback2 = js['q2']
        feedback3 = js['q3']
        f = Feedback.objects.create(aId=aId,
                                    wId=wId,
                                    feedback1=feedback1,
                                    feedback2=feedback2,
                                    feedback3=feedback3)
        f.save()



    # print (request.POST)
    # return (HttpResponseRedirect("/home/thankyou/"))
    print("save db on")
    return (HttpResponse(status=204))
