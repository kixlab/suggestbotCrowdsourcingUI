from django import forms
# from . import models
#
class testform(forms.Form):
    # MTurk id of the worker
    mturk_id=forms.CharField(required=True, widget = forms.TextInput())

    # input for character 1
    positivity1=forms.CharField(widget = forms.HiddenInput(), required = True)
    excitement1=forms.CharField(widget = forms.HiddenInput(), required = True)
    bodyexpression1 = forms.CharField(widget = forms.HiddenInput(), required = True)

    # input for character 2
    positivity2=forms.CharField(widget = forms.HiddenInput(), required = True)
    excitement2=forms.CharField(widget = forms.HiddenInput(), required = True)
    bodyexpression2 = forms.CharField(widget = forms.HiddenInput(), required = True)
    length = forms.CharField(widget=forms.HiddenInput(), required= True)
    elapsedtime = forms.CharField(widget=forms.HiddenInput(), required=True)
    #current_offset= forms.IntegerField(widget = forms.HiddenInput(), required = True)

#
# class intentionform(forms.ModelForm):
#     mturk_id=forms.CharField(required=False, widget = forms.HiddenInput())
#     val1=forms.CharField(widget = forms.HiddenInput(), required = False)
#     val2=forms.CharField(widget = forms.HiddenInput(), required = False)
#
#     class Meta:
#         model= models.Intention
#         fields = "__all__"
#
# class FeedbackForm(forms.Form):
#     text=forms.CharField(widget = forms.HiddenInput(), required = False)
