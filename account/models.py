from django.db import models

# Create your models here.

# Extra Instructions
# Whenever you update the model, run the followings:
# 1) python manage.py makemigrations
# 2) python manage.py migrate

class Data(models.Model):
    fig_id=models.IntegerField(default = 0, max_length=15)
    val1=models.IntegerField(max_length=20)
    val2=models.IntegerField(max_length=20)
    q1=models.CharField(max_length=200)

    def __str__(self):
        return str(self.fig_id)+"_"+str(self.val1)+"_"+str(self.val2)

class Intention(models.Model):
    mturk_id=models.CharField(max_length=15)
    val1=models.CharField(max_length=20)
    val2=models.CharField(max_length=50)

    def __str__(self):
        return self.mturk_id

class FeedbackModel(models.Model):
    text=models.CharField(max_length=500)

    def __str__(self):
        return self.text

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

class EmotionHit(models.Model):
    # id of the row in Assign table
    segment_id = models.IntegerField()
    mturk_id = models.CharField(max_length=15)
    positivity1 = models.FloatField()
    excitement1 = models.FloatField()
    positivity2 = models.FloatField()
    excitement2 = models.FloatField()
    bodyexpression1 = models.CharField(max_length=50)
    bodyexpression2 = models.CharField(max_length=50)
    length = models.TextField()
    elapsedtime = models.FloatField()

# # - video ID
# # - segment ID (or starting time?)
# # - worker ID
# # - assignment ID (mturk has this param for all HITs)
# # - time stamps (this should be a string of all time stamps a worker made)
# # - comments
# # - starting time of the task
# # - ending time of the task (edited)
#
class Experiment3(models.Model):
    video_id = models.CharField(max_length=20)
    segment_id = models.IntegerField()
    mturk_id = models.CharField(max_length=15)
    timestamps = models.CharField(max_length=20)
    comments = models.TextField()
    start_time = models.CharField(max_length=20)
    end_time = models.CharField(max_length=20)

#
#
# class IntentionHit(models.Model):

class Labels(models.Model):
    aId = models.CharField(max_length=20)
    wId = models.CharField(max_length=20)
    timeUsed = models.FloatField()
    start_time = models.CharField(max_length=40)
    finish_time = models.CharField(max_length=40)
    label_time = models.IntegerField()
    arousal = models.FloatField()
    valence = models.FloatField()
