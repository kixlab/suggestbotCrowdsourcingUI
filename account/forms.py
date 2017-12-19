from django import forms
from . import models

class testform(forms.ModelForm):
    mturk_id=forms.CharField(required=False, widget = forms.HiddenInput())
    val1=forms.CharField(widget = forms.HiddenInput(), required = False)
    val2=forms.CharField(widget = forms.HiddenInput(), required = False)
    q1 = forms.CharField(widget = forms.HiddenInput(), required = False)
    current_offset= forms.IntegerField(widget = forms.HiddenInput(), required = True)

    class Meta:
        model= models.Data
        fields = "__all__"

class intentionform(forms.ModelForm):
    mturk_id=forms.CharField(required=False, widget = forms.HiddenInput())
    val1=forms.CharField(widget = forms.HiddenInput(), required = False)
    val2=forms.CharField(widget = forms.HiddenInput(), required = False)

    class Meta:
        model= models.Intention
        fields = "__all__"

class FeedbackForm(forms.Form):
    text=forms.CharField(widget = forms.HiddenInput(), required = False)
