//your JS code here. If required.
 let currentSound = new Audio('Sounds/beach.mp3');
let timer;
let timeDisplay = document.querySelector('.time-display');

document.getElementById('beach-sound').addEventListener('click', () => {
    currentSound.pause();
    currentSound = new Audio('Sounds/beach.mp3');
    currentSound.play();
});

document.getElementById('rain-sound').addEventListener('click', () => {
    currentSound.pause();
    currentSound = new Audio('Sounds/rain.mp3');
    currentSound.play();
});

// Timer functionality
document.getElementById('smaller-mins').addEventListener('click', () => startTimer(2));
document.getElementById('medium-mins').addEventListener('click', () => startTimer(5));
document.getElementById('long-mins').addEventListener('click', () => startTimer(10));

function startTimer(minutes) {
    let seconds = minutes * 60;
    timeDisplay.textContent = `${minutes}:0`;
    timer = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
            currentSound.pause();
            alert("Time's up!");
        } else {
            timeDisplay.textContent = `${Math.floor(seconds / 60)}:${seconds % 60}`;
        }
    }, 1000);
}

// Play/Pause functionality
document.querySelector('.play').addEventListener('click', () => {
    if (currentSound.paused) {
        currentSound.play();
    } else {
        currentSound.pause();
    }
});
