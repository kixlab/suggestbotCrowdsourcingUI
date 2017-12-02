from django.db import models

# Create your models here.
class Data(models.Model):
    mturk_id=models.CharField(max_length=15)
    val1=models.IntegerField()
    val2=models.IntegerField()
    q1=models.CharField(max_length=200)

    def __str__(self):
        return self.mturk_id
