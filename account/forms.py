from django import forms

class testform(forms.Form):
    mturk_id=forms.CharField(required=True, widget=forms.TextInput())
    val1=forms.CharField(widget = forms.HiddenInput(), required = False)
    val2=forms.CharField(widget = forms.HiddenInput(), required = False)
    post = forms.CharField()
