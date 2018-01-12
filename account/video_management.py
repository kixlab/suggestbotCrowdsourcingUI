from .models import Video, Segment, Labels, Taskmarker
from django.db.models import Sum, Case, When, IntegerField, Count
import os
from moviepy.editor import VideoFileClip
import datetime
MAX_TASK_NUM = 3
TASK_TIME_LIMIT = 30

def Video_into_Database():

    Video.objects.all().delete()
    Segment.objects.all().delete()
    path = os.path.dirname(__file__)+"/static/account/media/"
    print(path)
    for foldername in os.listdir(path):
        print(os.path.isdir(os.path.join(path,foldername)))
        if os.path.isdir(os.path.join(path,foldername)):
            print(foldername)
            folderpath = os.path.join(path, foldername)
            for filename in os.listdir(folderpath):
                filepath = os.path.join(folderpath, filename)

                if filename.endswith(".mp4"):
                    split_filename = filename.split("_")
                    print(split_filename)
                    #retrieve video object for each files
                    video_objects = Video.objects.filter(video_name = split_filename[0], video_condition = foldername)
                    print(video_objects)
                    if video_objects.count() ==0:
                        video_object = Video(video_name = split_filename[0], video_condition = foldername)
                        video_object.save()
                    else:
                        video_object = video_objects[0]
                    #get the duration of the file
                    duration = VideoFileClip(filepath).duration
                    print(duration)
                    cur_count = int(filename[-6:-4])
                    newseg = Segment(video = video_object, file_name = filepath, sequence_num = cur_count, video_length=duration)
                    newseg.save()
            generated_segments = Segment.objects.filter(video = video_object).order_by('sequence_num')
            video_start = 0
            for segment in generated_segments:
                segment.start_time_in_whole = video_start
                video_start = video_start + segment.video_length
                segment.save()

def deployer(parameter, aId, wId):
    path = os.path.dirname(__file__)+"/static/account/media/"
    Taskmarker.objects.filter(done = False, start_time__lte = datetime.datetime.now()-datetime.timedelta(minutes=TASK_TIME_LIMIT)).delete()
    if "uniform" in parameter:
        parameter_split = parameter.split("_")
        video = Video.objects.get(video_name = parameter_split[0], video_condition = parameter_split[1])
        segments = Segment.objects.filter(video = video)
        video_markers = Taskmarker.objects.filter(video = video)
        already_marked = video_markers.values('segment__sequence_num').annotate(done_labels_count = Sum(Case(When(done=True, then=1), When(done=False, then=0), output_field=IntegerField())), total_labels_count = Count('segment'))
        unmarked = segments.exclude(sequence_num__in = [q['segment__sequence_num'] for q in already_marked])
        print(already_marked)
        print(unmarked)
        if unmarked.count() > 0 :
            segment = unmarked[0]

        else:
            already_marked_not_done = already_marked.filter(done_labels_count__lt = MAX_TASK_NUM)
            if already_marked_not_done.count()>0:
                segment = segments.get(sequence_num = already_marked_not_done[0]['segment__sequence_num'])

            else:
                segment = segments.get(sequence_num = already_marked[0]['segment__sequence_num'])
        taskmarker = Taskmarker(aId = aId, wId = wId, video = video, segment = segment)
        taskmarker.save()
        filename = segment.file_name
        return filename
    elif "manual" in parameter:
        #parameter should be videoname.mp4
        path = os.path.join(path, "manual")
        path = os.path.join(path, parameter)
        return path
    elif "single" in parameter:
        #parameter should be videoname.mp4
        path = os.path.join(path, "manual")
        path = os.path.join(path, parameter)
        return path
