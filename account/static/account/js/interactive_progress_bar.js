

// Get a handle to the player
player       = document.getElementById('myVideo');
btnPlayPause = document.getElementById('btnPlayPause');
progressBar  = document.getElementById('progress');

// Add a listener for the timeupdate event so we can update the progress bar
player.addEventListener('timeupdate', updateProgressBar, false);

// Add a listener for the play and pause events so the buttons state can be updated
player.addEventListener('play', function() {
  // Change the button to be a pause button
  changeButtonType(btnPlayPause, 'pause');
}, false);

player.addEventListener('pause', function() {
  // Change the button to be a play button
  changeButtonType(btnPlayPause, 'play');
}, false);

player.addEventListener('ended', function() { this.pause(); }, false);

progressBar.addEventListener("click", seek);

function seek(e) {
  var elem = document.getElementById("progress-bar");
  var percent = e.offsetX / this.offsetWidth;
  player.currentTime = percent * player.duration;

  $('#pr-bar-tooltip').tooltip('show');

  $('#progress-bar').attr('aria-valuenow', percent);
  elem.style.width = percent + '%';
}

function playPauseVideo() {
  if (player.paused || player.ended) {
    // Change the button to a pause button
    changeButtonType(btnPlayPause, 'pause');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_pause.png";
    player.play();
  }
  else {
    // Change the button to a play button
    changeButtonType(btnPlayPause, 'play');
    document.getElementById('playpauseimg').src="../../static/account/img/icon_round_play.png";
    player.pause();
  }
}

// Update the progress bar
function updateProgressBar() {
  // Work out how much of the media has played via the duration and currentTime parameters
  var elem = document.getElementById("progress-bar");
  var percentage = Math.floor((100 / player.duration) * player.currentTime);

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
  var elem = document.getElementById("label_pane");
  elem.setAttribute("style","pointer-events: auto;");
}

$(document).ready(function(){
  var elem = document.getElementById("label_pane");
  elem.setAttribute("style","pointer-events: none;");

  $('#tag-tooltip').click(function(){
    var elem = document.getElementById("label_pane");
    elem.setAttribute("style","pointer-events: auto;");
  });
});
