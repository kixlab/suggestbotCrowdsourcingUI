

// Get a handle to the player
vd_player       = document.getElementById('myVideo');
btnPlayPause = document.getElementById('btnPlayPause');
progressBar  = document.getElementById('progress');
time_value_last =0;
revise_tag = 0;

// Add a listener for the timeupdate event so we can update the progress bar
vd_player.addEventListener('timeupdate', updateProgressBar, false);

// Add a listener for the play and pause events so the buttons state can be updated
vd_player.addEventListener('play', function() {
  // Change the button to be a pause button
  changeButtonType(btnPlayPause, 'pause');
}, false);

vd_player.addEventListener('pause', function() {
  // Change the button to be a play button
  changeButtonType(btnPlayPause, 'play');
}, false);

vd_player.addEventListener('ended', function() {
  $("#submitBtn").prop("disabled", false)
  this.pause();
 }, false);

progressBar.addEventListener("click", seek);

function seek(e) {
  if ($('#Add_button').prop("disabled")){
    var elem = document.getElementById("progress-bar");
    var percent;
    if(e.path[0].id=='progress-bar'){
      percent = e.offsetX / this.offsetWidth;
    }else if(e.path[0].className.includes("red_bar")){
      percent = ($("#"+e.path[0].id).position().left-$("#progress-bar").position().left+e.offsetX) / this.offsetWidth;
    }else{
      percent = (elem.offsetWidth + e.offsetX) / this.offsetWidth
    }

    if(percent * vd_player.duration < time_value_last){
      vd_player.currentTime = percent * vd_player.duration;
      updateProgressBar();
    }else{
      alert("You can only jump to the time you have seen before.")
    }
  }
}

function playPauseVideo() {
  if (vd_player.paused || vd_player.ended) {
    // Change the button to a pause button
    changeButtonType(btnPlayPause, 'pause');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_pause.png";
    vd_player.play();
    return false
  }
  else {
    // Change the button to a play button
    changeButtonType(btnPlayPause, 'play');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_play.png";
    vd_player.pause();
    return false
  }
}

// Update the progress bar
function updateProgressBar() {
  // Work out how much of the media has played via the duration and currentTime parameters

  var elem = document.getElementById("progress-bar");
  var percentage = Math.floor((100 / vd_player.duration) * vd_player.currentTime);
  if(time_value_last < vd_player.currentTime){
    time_value_last = vd_player.currentTime
  }
  $('#pr-bar-tooltip').tooltip({trigger: 'manual'}).tooltip('show');
  $("#tag-tooltip").parent().on("click", function(){
    console.log("double click dude!")
    enable_tagging();
  })


  // Update the progress bar's value
  $('#progress-bar').attr('aria-valuenow', percentage);
  var sub_bar_length = Math.floor((100/vd_player.duration) * (time_value_last))-percentage;
  $('#progress-bar-sub').attr('aria-valuenow', sub_bar_length).css("width", sub_bar_length.toString()+"%")

  elem.style.width = percentage + '%';
}

// Updates a button's title, innerHTML and CSS class
function changeButtonType(btn, value) {
  btn.title     = value;
  //btn.innerHTML = value;
  btn.className = value;
}

function enable_tagging(add_tag=false) {
  blur_progress_bar(add_tag)
  if(add_tag){
    retrieve_data_from_data_structure(add_tag, 'labeler');
  }else{
    var st_time = parseInt(vd_player.currentTime).toString();
    add_tag=retrieve_data_from_data_structure(st_time, 'labeler');
    if(add_tag){
      revise_tag=st_time
    }
  }
  //$("#interactive_progress_bar").css("opacity", "0.3");
  //$(".tooltip").css("opacity", "0.3");
  var elem1 = document.getElementById("label_pane");
  elem1.setAttribute("style","pointer-events: auto;");
  if(add_tag!=false){
    $("#Add_button").text("Revise")
    $("#Delete_button").text("Delete")
  }else{
    $("#Add_button").text("Add")
    $("#Delete_button").text("Cancel")
  }
  $('#Add_button').prop("disabled", false);
  $('#Delete_button').prop("disabled", false);
  $("#label_pane").css("opacity", "1");


  // Change the button to a play button
  changeButtonType(btnPlayPause, 'play');
  document.getElementById('playpauseimg').src="../../static/account/img/icon_round_play.png";
  vd_player.pause();
}

function revise_tagging(string_time){
  revise_tag = string_time;
  enable_tagging(revise_tag);
  //$('body').prepend($("#"+string_time))
  console.log($("#"+string_time))


}

$(document).ready(function(){
  submit_stringify_value()
  var elem = document.getElementById("label_pane");
  elem.setAttribute("style","pointer-events: none;");
  $("#label_pane").css("opacity", "0.3");

  // tagging happens here ! //////////////////////
  $("#Add_button").click(function(){

    if (select_dic['labeler']) {
      unblur_progress_bar()
      //$("#interactive_progress_bar").css("opacity", "1");
      //$(".tooltip").css("opacity", "1")

      if (revise_tag){
        var string_time = revise_tag;
      }else{
        var string_time = parseInt(vd_player.currentTime).toString();
        // add red bar div in progress bar
        if(label_data_structure[string_time]==null){
          create_red_bar_div(string_time);
        }

      }
      revise_tag = 0;

      add_data_to_data_structure(string_time, 'labeler')
      $('#Add_button').prop("disabled", true);
      $('#Delete_button').prop("disabled", true);
      $("#label_pane").css("opacity", "0.3");
      var elem = document.getElementById("label_pane");
      elem.setAttribute("style","pointer-events: none;");
      delete_value_circle('labeler')

      // Change the button to a pause button
      changeButtonType(btnPlayPause, 'pause');
      document.getElementById('playpauseimg').src="../../static/account/img/icon_round_pause.png";
      vd_player.play();
    }
    else{
      alert("Please label emotion of the character.");
    }
  });
  $("#Delete_button").click(function(){
    unblur_progress_bar()
    if (revise_tag){
      var string_time = revise_tag;
      delete_red_bar_div(string_time);
    }else{
      var string_time = parseInt(vd_player.currentTime).toString();
      // add red bar div in progress bar
    }
    revise_tag = 0;
    delete_data_from_data_structure(string_time)
    $('#Add_button').prop("disabled", true);
    $('#Delete_button').prop("disabled", true);
    $("#label_pane").css("opacity", "0.3");
    var elem = document.getElementById("label_pane");
    elem.setAttribute("style","pointer-events: none;");
    delete_value_circle('labeler')

    // Change the button to a pause button
    changeButtonType(btnPlayPause, 'pause');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_pause.png";
    vd_player.play();
  })

});

function create_red_bar_div(string_time){

  var barwidth = document.getElementById('progress').offsetWidth;

  var barlocation = barwidth * vd_player.currentTime / vd_player.duration + 8;

  var div = document.createElement("div");
  div.style.width = "5px";
  div.style.height = "20px";
  div.style.position = "absolute";
  div.style.background = "red";
  div.style.left = barlocation + 'px';
  //div.style.pointerEvents = "none";
  div.id = string_time;
  div.title = "<a href='#label_pane' id='tag-tooltip_"+string_time+"' style='color:red' onclick='revise_tagging(" + string_time + ")'>H</a>";
  //div.title = 'H';

  document.getElementById("progress").appendChild(div);
  $("#"+string_time).addClass("red_bar")

  div.setAttribute("data-placement", "top");       // Create a "class" attribute

  $("#"+string_time).tooltip({
    placement: 'top',
    trigger: 'manual',
    html: true,
    template: '<div class="tooltip red-tooltip"><div class="tooltip-inner"></div><div class="tooltip-arrow"></div></div>'
  }).tooltip('show');

}

function delete_red_bar_div(string_time){
  $("#tag-tooltip_"+string_time).parent().parent().remove()
  $("#"+string_time).remove()

}

function blur_progress_bar(unblurred = false){
  $("#controls").css("opacity", "0.3")
  $("#progress").css("background-color", "rgba(233, 236, 239, 0.3)")
  $(".progressbar").css("opacity", "0.3")
  $(".tooltip").css("opacity", "0.3");
  $(".red_bar").css("opacity", "0.3")
  console.log(unblurred)
  if(unblurred!=false){
    $("#"+unblurred).css("opacity", "1")
    $("#tag-tooltip_"+unblurred).parent().parent().css("opacity", "1")
  }
}
function unblur_progress_bar(){
  $("#controls").css("opacity", "1")
  $("#progress").css("background-color", "rgba(233, 236, 239, 1)")
  $(".progressbar").css("opacity", "1")
  $(".tooltip").css("opacity", "1");
  $(".red_bar").css("opacity", "1")
}
