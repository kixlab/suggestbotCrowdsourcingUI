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

//var assignmentID = gup("assignmentId");
//var workerID = gup("workerId");

function validateAndSubmit() { // added by Jean
  // collecting information

  // calculate time used
  finish_time = new Date();
  var time_used = (finish_time - start_time) / 1000.0;

  console.log("\nTime used: " + time_used + " seconds");

//  var assignmentID = gup("assignmentId");
//  var workerID = gup("workerId");

  // assembling data package
  var dataPackage = { //::: TODO: change here [start] :::
    type: 'label',
    aID : localStorage.getItem('assignmentID'),
    wID : localStorage.getItem('workerID'),
    timeUsed : time_used,
    start_time : start_time,
    finish_time : finish_time,
    video_file : video_file,
    video_condition : video_condition,
    result_json_string: JSON.stringify(label_data_structure)
  };

  $.ajax({
    url: "/home/save_db/",
    type: "POST",
    data: dataPackage,
    success: function(d) {
      console.log("succeeded saving db");
    }
  });
}

//this function is submitting worker's self emotion tag
function selfTagSubmit() { // added by Arti
  // collecting information

  console.log("preparing datapacakage for self emotion tag");

//  var assignmentID = gup("assignmentId");
//  var workerID = gup("workerId");

  // assembling data package
  var selfEmotiondataPackage = { //::: TODO: change here [start] :::
    type: "selftag",
    aID : localStorage.getItem('assignmentID'),
    wID : localStorage.getItem('workerID'),
    result_json_string: JSON.stringify(selflabel_data_structure)
  };

  $.ajax({
    url: "/home/save_db/",
    type: "POST",
    data: selfEmotiondataPackage,
    success: function(d) {
    //  window.location.assign("/home/task/");
      //window.location.href = '/home/task/';
      //window.location = '/home/task';
      console.log("succeeded saving worker's self emotion tag to db");
    }
  })

}

//submitting feedback form
function feedbackSubmit() { // added by Arti
  // collecting information

  console.log("preparing datapacakage for feedback");

//  var assignmentID = gup("assignmentId");
//  var workerID = gup("workerId");

  // assembling data package
  var feedbackdataPackage = { //::: TODO: change here [start] :::
    type: "feedback",
    aID : localStorage.getItem('assignmentID'),
    wID : localStorage.getItem('workerID'),
    result_json_string: JSON.stringify(feedback_data_structure)
  };

  $.ajax({
    url: "/home/save_db/",
    type: "POST",
    data: feedbackdataPackage,
    success: function(d) {
      $("#mturk_form").submit();
      alert("Thank you for submitting the task! Your HIT is being processed and evaluated as part of a quality check. You'll be paid soon.");
      console.log("succeeded saving worker's feedback to db");
    }
  });
}
//  Turkify the captioning page.
$(document).ready(function () {

  // start timer
  start_time = new Date();

  $("#submitBtn").click(function(event) {
    // force submit
    $("#submitBtn").attr('type', 'submit');
    validateAndSubmit();
    //window.location.href = '/account/feedback.html';
  });

  //send workerId and assignmentId if it is introduction page
  $("#intro_worker_id").val(localStorage.getItem('workerID'))
  $("#intro_assignment_id").val(localStorage.getItem('assignmentID'))

  // is assigntmentId is a URL parameter
  if((aid = localStorage.getItem('assignmentID'))!="" && $(form_selector).length>0) {

    // If the HIT hasn't been accepted yet, disabled the form fields.
    if(aid == "ASSIGNMENT_ID_NOT_AVAILABLE") {
      $('input,textarea,select').attr("DISABLED", "disabled");
    }

    // Add a new hidden input element with name="assignmentId" that
    // with assignmentId as its value.
    var aid_input = $("<input type='hidden' name='assignmentId' value='" + aid + "'>").appendTo($(form_selector));
    var workerId_input = $("<input type='hidden' name='workerId' value='" + localStorage.getItem('workerID') + "'>").appendTo($(form_selector));
    var hitId_input = $("<input type='hidden' name='hitId' value='" + localStorage.getItem('hitID') + "'>").appendTo($(form_selector));

    // Make sure the submit form's method is POST
    $(form_selector).attr('method', 'POST');

    // Set the Action of the form to the provided "turkSubmitTo" field
    if((submit_url=localStorage.getItem('turkSubmitTo'))!="") {
        $(form_selector).attr('action', submit_url + '/mturk/externalSubmit');
    }
  }
});
