//your JS code here. If required.
 const audio = document.getElementById('sound-source');
const video = document.getElementById('video-source');
const playButton = document.querySelector('.play');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('#time-select button');
const beachButton = document.getElementById('beach-button');
const rainButton = document.getElementById('rain-button');

let duration = 600; // default to 10 minutes
let timer;
let currentTime = 0;
let isPlaying = false;

// Format time helper
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update Time Display
function updateTimeDisplay() {
  const timeLeft = duration - currentTime;
  timeDisplay.textContent = formatTime(timeLeft);
}

// Reset playback
function resetPlayback() {
  clearInterval(timer);
  audio.pause();
  video.pause();
  audio.currentTime = 0;
  video.currentTime = 0;
  currentTime = 0;
  updateTimeDisplay();
  isPlaying = false;
  playIcon.classList.remove('hidden');
  pauseIcon.classList.add('hidden');
}

// Play or Pause functionality
playButton.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    isPlaying = true;
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');

    timer = setInterval(() => {
      currentTime++;
      updateTimeDisplay();
      if (currentTime >= duration) {
        resetPlayback();
      }
    }, 1000);
  } else {
    resetPlayback();
  }
});

// Handle Time Selection
timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'smaller-mins') duration = 120;
    if (button.id === 'medium-mins') duration = 300;
    if (button.id === 'long-mins') duration = 600;
    currentTime = 0;
    updateTimeDisplay();
    resetPlayback();
  });
});

// Handle Sound/Video switching
beachButton.addEventListener('click', () => {
  audio.src = "Sounds/beach.mp3";
  video.src = "Videos/beach.mp4";
  resetPlayback();
});

rainButton.addEventListener('click', () => {
  audio.src = "Sounds/rain.mp3";
  video.src = "Videos/rain.mp4";
  resetPlayback();
});

// Set default time on page load
updateTimeDisplay();
