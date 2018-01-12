
//write tutorial as a list of string
var tutotext=['Please watch the video and pay attention to the emotions of the person presented in the left screenshot',
'Whenever you notice an emotion change in the person, click on the tag button.',
'You can click on a point on the map which best describes the actors emotion.',
'After that, you can click add button to save your response. You can add multiple reponses by repeating the procedure.',
'You can revise or delete any of your tag by click on the red tip on top of the tag.',
'After choosing one to revise, you can revise the emotion label by picking a point on the map again.',
'If you pick new point, you can store the change with revise button',
'If you want to delete the label, click the delete button.',
'After you have seen all the video, and done with the tagging emotions, end with submit button.']

var tutoimgdone='tutorial_img/tutorial_'

$(document).ready(function(){
  Show_tuto(false, tutotext, tutoimgdone)
})
