
//write tutorial as a list of string
var tutotext=['Please watch the video and pay attention to the emotions of the person presented in the left screenshot',
'Whenever you notice an emotion change in the person, click on the tag button.',
'Pick a point in the map and Click add button to save your responses.',
'You can edit any of your tag by click on the red tip  on top of the tag.',
'Press the Submit button after tagging the whole video.']

var tutoimgdone='tutorial_'

$(document).ready(function(){
  Show_tuto(false, tutotext, tutoimgdone)
})
