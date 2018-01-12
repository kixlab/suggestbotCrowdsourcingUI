from .models import Video, Segment
from django.db.models import Sum
import os
import subprocess

def Video_into_Database():
    path = os.path.dirname(__file__)+"/static/account/media/"
    print(path)
    for filename in os.listdir(path):
        if filename.endswith(".mp4"):
            split_filename = filename.split("_")
            #retrieve video object for each files
            video_objects = Video.objects.filter(video_name = split_filename[0], video_condition = split_filename[1])
            if video_objects.count() ==0:
                video_object = Video(video_name = split_filename[0], video_condition = split_filename[1])
                video_object.save()
            else:
                video_object = video_objects[0]
            #get the duration of the file
            length_retrieve = subprocess.Popen(['ffprobe', filename], stdout = subprocess.PIPE, stderr = subprocess.STDOUT)
            duration = [x for x in result.stdout.readlines() if "Duration" in x]

            print(duration)

            #get the sequence number of the file
            """previous_segments = Segment.objects.filter(video = video_object)
            previous_segments_count = previous_segments.count()
            previous_segment_last = previous_segments.order_by('-sequence_num')[0]
            previous_segment_total_length = previous_segment_last.video_length + previous_segment_last.start_time_in_whole

            newseg = Segment(video = Video, file_name = filename, sequence_num = previous_segments_count, start_time_in_whole = previous_segment_total_length)
        """
        print(filename)
