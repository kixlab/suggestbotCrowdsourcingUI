

// Get a handle to the player
vd_player       = document.getElementById('myVideo');
btnPlayPause = document.getElementById('btnPlayPause');
progressBar  = document.getElementById('progress');
time_value_last =0;

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

vd_player.addEventListener('ended', function() { this.pause(); }, false);

progressBar.addEventListener("click", seek);

function seek(e) {
  if ($('#Add_button').prop("disabled")){
    var elem = document.getElementById("progress-bar");
    var percent;
    if(e.path[0].id=='progress-bar'){
      percent = e.offsetX / this.offsetWidth;
    }else{
      percent = (elem.offsetWidth + e.offsetX) / this.offsetWidth
    }

    if(percent * vd_player.duration < time_value_last){
      vd_player.currentTime = percent * vd_player.duration;
      $('#pr-bar-tooltip').tooltip('show');
      $('#progress-bar').attr('aria-valuenow', percent).css("width", percent+"%");
//      elem.style.width = percent + '%';
    }else{
      alert("h")
    }

>>>>>>> eda7579b5a021cba5bb59e6c812ef7b613a60402
  }
}

function playPauseVideo() {
  if (vd_player.paused || vd_player.ended) {
    // Change the button to a pause button
    changeButtonType(btnPlayPause, 'pause');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_pause.png";
    vd_player.play();
  }
  else {
    // Change the button to a play button
    changeButtonType(btnPlayPause, 'play');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_play.png";
    vd_player.pause();
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
  $('#pr-bar-tooltip').tooltip('show');
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

function enable_tagging() {
  $("#interactive_progress_bar").css("opacity", "0.3");
  $(".tooltip").css("opacity", "0.3");
  var elem1 = document.getElementById("label_pane");
  elem1.setAttribute("style","pointer-events: auto;");

  $('#Add_button').prop("disabled", false);
  $("#labeler").css("opacity", "1");


  // Change the button to a play button
  changeButtonType(btnPlayPause, 'play');
  document.getElementById('playpauseimg').src="../../static/account/img/icon_round_play.png";
  vd_player.pause();
}

$(document).ready(function(){
  var elem = document.getElementById("label_pane");
  elem.setAttribute("style","pointer-events: none;");

  // tagging happens here ! //////////////////////
  $("#Add_button").click(function(){
    $("#interactive_progress_bar").css("opacity", "1");
    $(".tooltip").css("opacity", "1")
    var string_time = parseInt(vd_player.currentTime).toString()
    add_data_to_data_structure(string_time, 'labeler')
    $('#Add_button').prop("disabled", true);
    $("#labeler").css("opacity", "0.3");
    var elem = document.getElementById("label_pane");
    elem.setAttribute("style","pointer-events: none;");
    delete_value_circle('labeler')

    // add red bar div in progress bar
    create_red_bar_div(string_time);

    // Change the button to a pause button
    changeButtonType(btnPlayPause, 'pause');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_pause.png";
    vd_player.play();
  });

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
  div.id = string_time;
  div.class = "toptooltip";

  document.getElementById("progress").appendChild(div);

  $(string_time).tooltip({'placement': "top"});
}
