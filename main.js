const songImage = document.getElementById("song-cover");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

const songs = [
    {
        image: "music/that band cover.jpg",
        name: "That Band",
        artist: "Kessoku Band",
        audio: "music/that band.flac",
    },
    {
        image: "music/mosi mosi cover.jpg",
        name: "Mosi Mosi?",
        artist: "Sasane",
        audio: "music/mosi mosi.flac",
    },
    {
        image: "music/complete the mission.jpg",
        name: "Complete the Mission",
        artist: "Kaptain",
        audio: "music/complete the mission.mp3",
    },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;
updateSong();

prevSongButton.addEventListener("click", () => {
    console.log("next")
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
})

nextSongButton.addEventListener("click", () => {
    console.log("previous")
    if (currentSongIndex == songs.length - 1) {
        return;
    }
    currentSongIndex++;
    updateSong();
})

playpauseButton.addEventListener("click", () => {
    if (!audio.paused) {
        audio.pause();
        playpauseButton.classList.remove("fa-pause")
        playpauseButton.classList.add("fa-play")
    }
    else {
        audio.play();
        playpauseButton.classList.remove("fa-play")
        playpauseButton.classList.add("fa-pause")
    }
})

function updateSong() {
    
    const song = songs[currentSongIndex];
    songImage.src = song.image
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = () => {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    }
}

songSlider.addEventListener("change", () => {
    audio.currentTime = songSlider.value;
})

function moveSlider() {
        console.log("AUGH KEEP GOING!")
        songSlider.value = audio.currentTime;
};

audio.addEventListener('ended', () => {
    currentSongIndex++;
    updateSong();
    audio.play();
    playpauseButton.classList.remove("fa-play")
    playpauseButton.classList.add("fa-pause")
})
setInterval(moveSlider, 1000);