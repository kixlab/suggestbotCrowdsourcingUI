from django import forms
from . import models

class testform(forms.Form):
    #mturk_id=forms.CharField(required=False, widget = forms.HiddenInput())
    val1_1=forms.CharField(widget = forms.HiddenInput(), required = False)
    val1_2=forms.CharField(widget = forms.HiddenInput(), required = False)
    q1_1 = forms.CharField(widget = forms.HiddenInput(), required = False)
    val2_1=forms.CharField(widget = forms.HiddenInput(), required = False)
    val2_2=forms.CharField(widget = forms.HiddenInput(), required = False)
    q2_1 = forms.CharField(widget = forms.HiddenInput(), required = False)
    _len = forms.CharField(widget=forms.HiddenInput(), required= False)
    #current_offset= forms.IntegerField(widget = forms.HiddenInput(), required = True)

    #class Meta:
    #    model= models.Data
    #    fields = "__all__"

class intentionform(forms.ModelForm):
    mturk_id=forms.CharField(required=False, widget = forms.HiddenInput())
    val1=forms.CharField(widget = forms.HiddenInput(), required = False)
    val2=forms.CharField(widget = forms.HiddenInput(), required = False)

    class Meta:
        model= models.Intention
        fields = "__all__"

class FeedbackForm(forms.Form):
    text=forms.CharField(widget = forms.HiddenInput(), required = False)
