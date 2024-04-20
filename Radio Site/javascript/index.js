const audio = new Audio('../photo-vedio/AUR - TU HAI KAHAN - Raffey - Usama - Ahad (Official Music Video)_256k.mp3');
let isPlaying = false;
const icon = document.getElementById('play-pause');

window.onload = function () {
    // audio.play();
    icon.classList.add('fa-pause');
    icon.classList.remove('fa-play');
    isPlaying = true;
};


function togglePlay() {
    if (isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

// Event listener to reset playback position when the audio ends
audio.addEventListener('ended', function () {
    this.currentTime = 0;
    if (isPlaying) {
        this.play();
    }
});
function skipForward() {
    audio.currentTime += 10;
}

function skipBackward() {
    audio.currentTime -= 10;
}

function rewind() {
    audio.currentTime -= 5;
}

function fastForward() {
    audio.currentTime += 5;
}

// Update current time and total time
audio.addEventListener('timeupdate', function () {
    document.getElementById('currentTime').innerText = formatTime(audio.currentTime);
    document.getElementById('totalTime').innerText = formatTime(audio.duration);
});

// Format time in minutes and seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
}

// Update current time, total time, and progress bar with dot
audio.addEventListener('timeupdate', function () {
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const progressBar = document.querySelector('.progress-bar');
    const progressDot = document.querySelector('.progress-dot');

    // Update current time display
    currentTimeDisplay.innerText = formatTime(audio.currentTime);

    // Update total time display only if it's not already set
    if (!totalTimeDisplay.innerText.includes(':')) {
        totalTimeDisplay.innerText = formatTime(audio.duration);
    }

    // Update progress bar width
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    // Update position of progress dot
    const progressBarWidth = progressBar.offsetWidth;
    const dotPosition = (audio.currentTime / audio.duration) * progressBarWidth;
    progressDot.style.left = `${dotPosition}px`;
});

// Function to format time in mm:ss format
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
