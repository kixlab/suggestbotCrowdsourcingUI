from django import forms
# from . import models
#
class testform(forms.Form):
    # MTurk id of the worker
    mturk_id=forms.CharField(required=False, widget = forms.HiddenInput())

    # input for character 1
    positivity1=forms.CharField(widget = forms.HiddenInput(), required = False)
    excitement1=forms.CharField(widget = forms.HiddenInput(), required = False)
    bodyexpression1 = forms.CharField(widget = forms.HiddenInput(), required = False)

    # input for character 2
    positivity2=forms.CharField(widget = forms.HiddenInput(), required = False)
    excitement2=forms.CharField(widget = forms.HiddenInput(), required = False)
    bodyexpression2 = forms.CharField(widget = forms.HiddenInput(), required = False)
    _len = forms.CharField(widget=forms.HiddenInput(), required= False)
    elapsedtime = forms.CharField(widget=forms.HiddenInput(), required=False)

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
