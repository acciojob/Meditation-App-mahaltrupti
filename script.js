//your JS code here. If required.
  document.addEventListener('DOMContentLoaded', () => {
            const app = document.getElementById('app');
            const videoSource = document.getElementById('video-source');
            const soundSource = document.getElementById('sound-source');
            const timeDisplay = document.querySelector('.time-display');
            const playButton = document.querySelector('.play');
            const playIcon = document.getElementById('play-icon');
            const pauseIcon = document.getElementById('pause-icon');
            
            const timeButtons = document.querySelectorAll('#time-select button');
            const soundButtons = document.querySelector('.sound-picker').children;

            // Audio and Video Assets
            const sounds = [
                { name: 'beach', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', video: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
                { name: 'rain', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', video: 'https://www.w3schools.com/tags/mov_bbb.mp4' }
            ];

            let isPlaying = false;
            let timerInterval = null;
            let currentDuration = 600; // Default to 10 minutes (600 seconds)
            let initialDuration = 600;

            const updateTimeDisplay = (time) => {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            };

            const togglePlayPause = () => {
                if (isPlaying) {
                    soundSource.pause();
                    videoSource.pause();
                    clearInterval(timerInterval);
                    playIcon.classList.remove('hidden');
                    pauseIcon.classList.add('hidden');
                } else {
                    soundSource.play();
                    videoSource.play();
                    
                    if (currentDuration > 0) {
                        timerInterval = setInterval(() => {
                            currentDuration--;
                            updateTimeDisplay(currentDuration);
                            if (currentDuration <= 0) {
                                clearInterval(timerInterval);
                                soundSource.pause();
                                videoSource.pause();
                                playIcon.classList.remove('hidden');
                                pauseIcon.classList.add('hidden');
                            }
                        }, 1000);
                    } else {
                        // If timer reached 0, reset and play
                        currentDuration = initialDuration;
                        updateTimeDisplay(currentDuration);
                        soundSource.play();
                        videoSource.play();
                        timerInterval = setInterval(() => {
                            currentDuration--;
                            updateTimeDisplay(currentDuration);
                            if (currentDuration <= 0) {
                                clearInterval(timerInterval);
                                soundSource.pause();
                                videoSource.pause();
                                playIcon.classList.remove('hidden');
                                pauseIcon.classList.add('hidden');
                            }
                        }, 1000);
                    }
                    
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                }
                isPlaying = !isPlaying;
            };

            const switchMode = (mode) => {
                const sound = sounds.find(s => s.name === mode);
                if (sound) {
                    // Update video source
                    videoSource.querySelector('source').src = sound.video;
                    videoSource.load();
                    
                    // Update audio source
                    soundSource.querySelector('source').src = sound.src;
                    soundSource.load();

                    // If currently playing, play the new assets
                    if (isPlaying) {
                        videoSource.play();
                        soundSource.play();
                    }

                    // Set active class on button
                    Array.from(soundButtons).forEach(btn => btn.classList.remove('active'));
                    document.getElementById(`${mode}-button`).classList.add('active');
                }
            };

            const setTime = (minutes) => {
                currentDuration = minutes * 60;
                initialDuration = minutes * 60;
                updateTimeDisplay(currentDuration);
                
                // Set active class on button
                timeButtons.forEach(btn => btn.classList.remove('active'));
                
                if (minutes === 2) {
                    document.getElementById('smaller-mins').classList.add('active');
                } else if (minutes === 5) {
                    document.getElementById('medium-mins').classList.add('active');
                } else {
                    document.getElementById('long-mins').classList.add('active');
                }
            };
            
            // Event Listeners
            playButton.addEventListener('click', togglePlayPause);
            
            // Initial state setting
            updateTimeDisplay(currentDuration);
            document.getElementById('long-mins').classList.add('active');
            document.getElementById('beach-button').classList.add('active');

            // Attach event listeners to sound buttons
            document.getElementById('beach-button').addEventListener('click', () => switchMode('beach'));
            document.getElementById('rain-button').addEventListener('click', () => switchMode('rain'));

            // Attach event listeners to time buttons
            document.getElementById('smaller-mins').addEventListener('click', () => setTime(2));
            document.getElementById('medium-mins').addEventListener('click', () => setTime(5));
            document.getElementById('long-mins').addEventListener('click', () => setTime(10));
        });