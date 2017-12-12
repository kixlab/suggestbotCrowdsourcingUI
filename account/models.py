from django.db import models

# Create your models here.
class Data(models.Model):
    mturk_id=models.CharField(max_length=15)
    val1=models.CharField(max_length=20)
    val2=models.CharField(max_length=20)
    q1=models.CharField(max_length=200)

    def __str__(self):
        return self.mturk_id

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
