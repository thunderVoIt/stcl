// Array to store played songs
let playedSongs = [
    { id: '1', songName: `On My Way <br><div class="subtitle">Alan Walker</div>`, poster: "img/1.jpg" },
    { id: '2', songName: `Alan Walker-Fade <br><div class="subtitle">Alan Walker</div>`, poster: "img/2.jpg" },
    { id: '3', songName: `Cartoon - On & On <br><div class="subtitle"> Daniel Levi</div>`, poster: "img/3.jpg" },
    { id: '4', songName: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`, poster: "img/4.jpg" },
    { id: '5', songName: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`, poster: "img/5.jpg" },
    { id: '6', songName: `Electronic Music <br><div class="subtitle">Electro</div>`, poster: "img/6.jpg" },
    { id: '7', songName: `Agar Tum Sath Ho <br><div class="subtitle">Tamashaa</div>`, poster: "img/7.jpg" },
    { id: '8', songName: `Suna Hai <br><div class="subtitle">Neha Kakker</div>`, poster: "img/8.jpg" },
    { id: '9', songName: `Dilber <br><div class="subtitle">Satyameva Jayate</div>`, poster: "img/9.jpg" },
    { id: '10', songName: `Duniya <br><div class="subtitle">Luka Chuppi</div>`, poster: "img/10.jpg" },
    { id: '11', songName: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`, poster: "img/11.jpg" },
    { id: '12', songName: `Putt Jatt Da <br><div class="subtitle">Putt Jatt Da</div>`, poster: "img/12.jpg" },
    { id: '13', songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`, poster: "img/13.jpg" },
    { id: '14', songName: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`, poster: "img/14.jpg" },
    { id: '15', songName: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`, poster: "img/15.jpg" }
];

// Function to get 5 random songs
function getRandomSongs() {
    const shuffled = playedSongs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
}

// Function to display the popup
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

// Function to hide the popup
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Function to update the song list in the popup
function updateSongList() {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
    const songs = getRandomSongs();
    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="song-poster">
                <img src="${song.poster}" alt="${song.songName}">
            </div>
            <div class="song-details">
                <div class="song-name">${song.songName}</div>
            </div>
            <button class="playListPlay playButton" id="${song.id}"></button>
        `;
        songList.appendChild(li);
    });
    
    // Add event listeners to the play buttons
    Array.from(document.getElementsByClassName('playListPlay')).forEach(element => {
        element.addEventListener('click', (e) => {
            const index = e.target.id;
            const music = new Audio(`audio/${index}.mp3`);
            const poster_master_play = document.getElementById('poster_master_play');
            const title = document.getElementById('title');
            const masterPlay = document.getElementById('masterPlay');
            const wave = document.getElementById('wave');
            const songs = playedSongs;
            
            // Stop all currently playing songs
            document.querySelectorAll('audio').forEach(audio => audio.pause());
            
            // Play selected song
            music.src = `audio/${index}.mp3`;
            poster_master_play.src = `img/${index}.jpg`;
            music.play();
            
            // Update UI
            const song_title = songs.find(song => song.id === index);
            if (song_title) {
                const { songName } = song_title;
                title.innerHTML = songName;
            }
            
            masterPlay.classList.remove('bi-play-fill');
            masterPlay.classList.add('bi-pause-fill');
            wave.classList.add('active2');
            
            music.addEventListener('ended', () => {
                masterPlay.classList.add('bi-play-fill');
                masterPlay.classList.remove('bi-pause-fill');
                wave.classList.remove('active2');
            });
        });
    });
}

// Handle "Last Listening" click event
document.getElementById('lastListening').addEventListener('click', function() {
    showPopup();
    updateSongList();
});

// Handle "Close" button click event
document.getElementById('closePopup').addEventListener('click', function() {
    hidePopup();
});
