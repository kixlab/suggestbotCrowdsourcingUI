/**
*
*  gup(name) :: retrieves URL parameters if provided
*
*  Prepares the page for MTurk on load.
*  1. looks for a form element with id="mturk_form", and sets its METHOD / ACTION
*    1a. All that the task page needs to do is submit the form element when ready
*  2. disables form elements if HIT hasn't been accepted
*
**/

// selector used by jquery to identify your form
var form_selector = "#mturk_form";

// set timer
var start_time;
var start_hit_time;
var finish_time;


// function for getting URL parameters
function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
  return "";
  else return unescape(results[1]);
}

function validateAndSubmit() { // added by Jean
  // collecting information

  // calculate time used
  finish_time = new Date();
  var time_used = (finish_time - start_time) / 1000.0;
  var hit_time_used = (finish_time - start_hit_time) / 1000.0;

  console.log("\nTime used: " + time_used + " seconds");

  var assignmentID = gup("assignmentId");
  var workerID = gup("workerId");

  // assembling data package
  var dataPackage = { //::: TODO: change here [start] :::
    aID : assignmentID,
    wID : workerID,
    expParameter : exp_parameter,
    isPrePopulated : is_prepopulated.toString(),
    imgurl : url,
    comment : $('#comment').val(),
    improvement : $('#improvement').val(),
    timeUsed : time_used,
    hitTimeUsed : hit_time_used,
    start_time : start_time,
    finish_time : finish_time
  };

  $.ajax({
    url: "./php/saveInput.php",
    type: "POST",
    async: false,
    data: dataPackage,
    dataType: "text",
    success: function(d) {
      console.log("Saving information succeeded!");
      $("#mturk_form").submit();
      alert("Thank you for submitting the task! Your HIT is being processed and evaluated as part of a quality check. You'll be paid soon.");
    },
    fail: function() {
      alert("Saving information failed!");
    }
  }); //::: TODO: change here [end] :::
}

//  Turkify the captioning page.
$(document).ready(function () {

  // start timer
  start_time = new Date();

  $("#submitBtn").click(function(event) {
    // force submit
    $("#submitBtn").attr('type', 'submit');
    validateAndSubmit();
  });

  // is assigntmentId is a URL parameter
  if((aid = gup("assignmentId"))!="" && $(form_selector).length>0) {

    // If the HIT hasn't been accepted yet, disabled the form fields.
    if(aid == "ASSIGNMENT_ID_NOT_AVAILABLE") {
      $('input,textarea,select').attr("DISABLED", "disabled");
    }

    // Add a new hidden input element with name="assignmentId" that
    // with assignmentId as its value.
    var aid_input = $("<input type='hidden' name='assignmentId' value='" + aid + "'>").appendTo($(form_selector));
    var workerId_input = $("<input type='hidden' name='workerId' value='" + gup("workerId") + "'>").appendTo($(form_selector));
    var hitId_input = $("<input type='hidden' name='hitId' value='" + gup("hitId") + "'>").appendTo($(form_selector));

    // Make sure the submit form's method is POST
    $(form_selector).attr('method', 'POST');
  }
});