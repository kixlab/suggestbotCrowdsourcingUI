from django.db import models
import datetime
# Create your models here.

# Extra Instructions
# Whenever you update the model, run the followings:
# 1) python manage.py makemigrations
# 2) python manage.py migrate


# one video meta data with its experiment condition (A, B, C)
class Video(models.Model):
    video_name = models.CharField(max_length=50, default = "")
    video_condition = models.CharField(max_length=20)
    summary = models.TextField(default="")
    def __str__(self):
        return self.video_name+"_"+self.video_condition

# one video segment
class Segment(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=50, default = "")
    sequence_num = models.IntegerField(default = -1)
    #How long the video
    video_length = models.FloatField(default = 0)
    #where the segment is actually positioned in the whole video
    start_time_in_whole = models.FloatField(default = 0)
    def __str__(self):
        return self.video.video_name + "_" + self.video.video_condition + "_" + str(self.sequence_num)+"_"+str(self.start_time_in_whole)


class Assign(models.Model):
    # name of the video file
    vname = models.CharField(max_length=20)

    #sequence #
    seq = models.IntegerField()

    # startOffset of the video
    start = models.FloatField()

    # True if assignment is for full video, False if we are assigning 5-seconds of the video
    full = models.BooleanField()

    # we update worker id in two steps
    # 1) updated to "active" right after the assignment
    # 2) update to Mturk ID once they successfully make the HIT
    # worker id 1,2,3
    wid1 = models.CharField(max_length=15)
    wid2 = models.CharField(max_length=15)
    wid3 = models.CharField(max_length=15)

    # True if all wid1-3 is filled
    done = models.BooleanField(default=False)

    def __str__(self):
        return (vname+" "+"Done" if self.done else "Not done yet")


class Labels(models.Model):
    aId = models.CharField(max_length=20)
    wId = models.CharField(max_length=20)
    #the video model that this label is referring to
    video = models.ForeignKey(Video, on_delete=models.CASCADE, null=True, blank=True)
    #the video segment that this label is referring to
    segment = models.ForeignKey(Segment, on_delete=models.CASCADE, null=True, blank=True)
    #position of label in the whole video
    label_time_in_whole = models.FloatField(default =-1)
    #position of label in the snippet of the video
    label_time_in_video = models.FloatField(default =-1)
    #emotion values
    arousal = models.FloatField()
    valence = models.FloatField()
    def __str__(self):
        return self.video.video_name+"_"+self.video.video_condition+"_"+str(self.label_time_in_whole)
class Selflabel(models.Model):
    aId = models.CharField(max_length=20)
    wId = models.CharField(max_length=20)
    arousal = models.FloatField()
    valence = models.FloatField()
    def __str__(self):
        return self.wId
class Feedback(models.Model):
    aId = models.CharField(max_length=20)
    wId = models.CharField(max_length=20)
    feedback1 = models.TextField()
    feedback2 = models.TextField()
    feedback3 = models.TextField()
    def __str__(self):
        return self.wId
#data model for checking whether a task is being done or have been done
class Taskmarker(models.Model):
    aId=models.CharField(max_length=20)
    wId=models.CharField(max_length=20)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, null=True, blank=True)
    segment = models.ForeignKey(Segment, on_delete=models.CASCADE, null=True, blank=True)
    start_time = models.DateTimeField(default = datetime.datetime.now())
    end_time = models.DateTimeField(default = datetime.datetime.now())
    done = models.BooleanField(default = False)
    def __str__(self):
        return self.video.video_name+"_"+self.video.video_condition+"_"+str(self.segment.sequence_num)+"_"+self.wId
