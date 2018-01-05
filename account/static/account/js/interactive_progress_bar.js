

// Get a handle to the player
vd_player       = document.getElementById('myVideo');
btnPlayPause = document.getElementById('btnPlayPause');
progressBar  = document.getElementById('progress');

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
  var elem = document.getElementById("progress-bar");
  var percent = e.offsetX / this.offsetWidth;
  vd_player.currentTime = percent * vd_player.duration;

  $('#pr-bar-tooltip').tooltip('show');

  $('#progress-bar').attr('aria-valuenow', percent);
  elem.style.width = percent + '%';
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

  $('#pr-bar-tooltip').tooltip('show');
  // Update the progress bar's value
  $('#progress-bar').attr('aria-valuenow', percentage);
  elem.style.width = percentage + '%';
}

// Updates a button's title, innerHTML and CSS class
function changeButtonType(btn, value) {
  btn.title     = value;
  //btn.innerHTML = value;
  btn.className = value;
}

function enable_tagging() {
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
    $('#Add_button').prop("disabled", true);
    $("#labeler").css("opacity", "0.3");
    var elem = document.getElementById("label_pane");
    elem.setAttribute("style","pointer-events: none;");

    // Change the button to a pause button
    changeButtonType(btnPlayPause, 'pause');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_pause.png";
    vd_player.play();
  });

});
