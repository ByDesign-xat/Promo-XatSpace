        // Sistema de validación de contraseña
function verificarPassword() {
    const pass = document.getElementById('pass-input').value;
    const errorMsg = document.getElementById('error-msg');
    const authPanel = document.getElementById('auth-panel');
    const mainContent = document.getElementById('main-content');

    if (pass === '0000') {

        authPanel.style.opacity = '0';

        setTimeout(() => {

            authPanel.style.display = 'none';
            mainContent.style.display = 'block';

            // Pornește muzica automat
            if (musicPlaylist.length > 0) {

                musicAudio.play()
                    .then(() => {

                        document.getElementById('music-play').textContent = '⏸';

                        document
                            .querySelector('.music-cover-wrap')
                            .classList.add('playing');

                    })
                    .catch(error => {
                        console.log('Autoplay blocat de browser:', error);
                    });

            }

        }, 500);

    } else {

        errorMsg.style.display = 'block';

    }
}

        // Permitir presionar Enter para iniciar sesión
        document.getElementById('pass-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verificarPassword();
            }
        });

        // Toggle del ojo para ver/ocultar contraseña
        const toggleEye = document.getElementById('toggle-eye');
        const passInput = document.getElementById('pass-input');
        toggleEye.addEventListener('click', () => {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                toggleEye.textContent = '🔒';
            } else {
                passInput.type = 'password';
                toggleEye.textContent = '👁️';
            }
        });

// Reloj en vivo - hora local del dispositivo
function actualizarReloj() {
    const opciones = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const horaLocal = new Date().toLocaleTimeString('eu-EU', opciones);

    document.getElementById('live-clock').textContent =
        `Current time: ${horaLocal}`;
}

setInterval(actualizarReloj, 1000);
actualizarReloj();

        // Control de pestañas independientes
        function switchTab(tabName) {
            const tabs = document.querySelectorAll('.section-tab');
            tabs.forEach(tab => tab.classList.remove('active-section'));

            const buttons = document.querySelectorAll('nav button');
            buttons.forEach(btn => btn.classList.remove('active'));

            document.getElementById('sec-' + tabName).classList.add('active-section');
            document.getElementById('btn-' + tabName).classList.add('active');
        }

        // Botón interactivo para desplegar el mensaje especial de Gisse
        function toggleGisseMsg() {
            const box = document.getElementById('gisse-msg-content');
            if (box.style.display === 'block') {
                box.style.display = 'none';
            } else {
                box.style.display = 'block';
            }
        }

        // Generar corazones cayendo de fondo
        const rainContainer = document.getElementById('rain-container');
        const heartSymbols = ['✨', '💜', '🌸'];
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-rain';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
            heart.style.animationDelay = (Math.random() * 5) + 's';
            rainContainer.appendChild(heart);
        }
		
		function showReaction(box, icon) {

    // Creează mai multe iconițe
    for (let i = 0; i < 7; i++) {

        const reaction = document.createElement('span');

        reaction.className = 'reaction-effect';
        reaction.textContent = icon;

        // Poziție aleatoare stânga/dreapta
        const moveX = (Math.random() - 0.5) * 100;

        // Rotație aleatoare
        const rotate = (Math.random() - 0.5) * 50;

        reaction.style.setProperty('--move-x', `${moveX}px`);
        reaction.style.setProperty('--rotate', `${rotate}deg`);

        // Mărime aleatoare
reaction.style.fontSize =
    `${12 + Math.random() * 8}px`;

        box.appendChild(reaction);

        // Șterge iconița după animație
        setTimeout(() => {
            reaction.remove();
        }, 1000);
    }
}

// =========================================
// GALERIE FOTO
// =========================================

const galleryImages = [
    "https://xatimg.com/image/uFncq7ySHSIy.png",
    "https://xatimg.com/image/fiH2GGeslh65.png",
    "https://xatimg.com/image/uFncq7ySHSIy.png",
    "https://xatimg.com/image/fiH2GGeslh65.png"
];

let galleryIndex = 0;

function changeGalleryImage(direction) {

    const image = document.getElementById('gallery-image');

    if (!image) return;

    galleryIndex += direction;

    if (galleryIndex >= galleryImages.length) {
        galleryIndex = 0;
    }

    if (galleryIndex < 0) {
        galleryIndex = galleryImages.length - 1;
    }

    image.style.opacity = '0';

    setTimeout(() => {
        image.src = galleryImages[galleryIndex];
        image.style.opacity = '1';
    }, 150);
}


// =========================================
// ROTIȚA MOUSE-ULUI
// =========================================

document.addEventListener('wheel', function(e) {

    const gallery = document.getElementById('sec-gallery');

    if (!gallery) return;

    // Funcționează doar când Galery este deschis
    if (!gallery.classList.contains('active-section')) {
        return;
    }

    if (e.deltaY > 0) {
        changeGalleryImage(1);
    } else {
        changeGalleryImage(-1);
    }

});


// =========================================
// MUSIC PLAYER
// =========================================

let musicPlaylist = [];
let currentSongIndex = 0;

const musicAudio = new Audio();

musicAudio.preload = "metadata";


// =========================================
// ÎNCARCĂ MELODIA
// =========================================

function loadSong(index) {

    if (!musicPlaylist.length) return;

    currentSongIndex = index;

    const song = musicPlaylist[currentSongIndex];

    musicAudio.src = song.url;

    document.getElementById("music-cover").src = song.cover;

    document.getElementById("music-artist").textContent =
        song.artist || "Unknown Artist";

    document.getElementById("music-title").textContent =
        song.title || "Unknown Title";

    document.getElementById("music-album").textContent =
        song.album || "";

    document.getElementById("music-genre").textContent =
        "🎵 " + (song.genero || "Music");

    document.getElementById("music-progress").value = 0;

    document.getElementById("music-current-time").textContent =
        "0:00";

    document.getElementById("music-duration").textContent =
        song.duracion || "0:00";

    musicAudio.load();
}


// =========================================
// PLAY / PAUSE
// =========================================

function toggleMusic() {

    if (!musicPlaylist.length) return;

    if (musicAudio.paused) {

        musicAudio.play()
            .then(() => {

                document.getElementById("music-play").textContent = "⏸";

                document
                    .querySelector(".music-cover-wrap")
                    .classList.add("playing");

            })
            .catch(error => {
                console.error("Play error:", error);
            });

    } else {

        musicAudio.pause();

        document.getElementById("music-play").textContent = "▶";

        document
            .querySelector(".music-cover-wrap")
            .classList.remove("playing");
    }
}


// =========================================
// MELODIA URMĂTOARE
// =========================================

function nextSong() {

    if (!musicPlaylist.length) return;

    currentSongIndex++;

    if (currentSongIndex >= musicPlaylist.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    musicAudio.play();

    document.getElementById("music-play").textContent = "⏸";

    document
        .querySelector(".music-cover-wrap")
        .classList.add("playing");
}


// =========================================
// MELODIA ANTERIOARĂ
// =========================================

function previousSong() {

    if (!musicPlaylist.length) return;

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = musicPlaylist.length - 1;
    }

    loadSong(currentSongIndex);

    musicAudio.play();

    document.getElementById("music-play").textContent = "⏸";

    document
        .querySelector(".music-cover-wrap")
        .classList.add("playing");
}


// =========================================
// ACTUALIZARE TIMP
// =========================================

musicAudio.addEventListener("timeupdate", function() {

    if (!musicAudio.duration) return;

    const percent =
        (musicAudio.currentTime / musicAudio.duration) * 100;

const progress = document.getElementById("music-progress");

progress.value = percent;

progress.style.background = `
    linear-gradient(
        90deg,
        #87ceeb 0%,
        #c8a2c8 ${percent}%,
        #ffb6c1 ${percent}%,
        #222 ${percent}%,
        #222 100%
    )
`;

    document.getElementById("music-current-time").textContent =
        formatMusicTime(musicAudio.currentTime);

    document.getElementById("music-duration").textContent =
        formatMusicTime(musicAudio.duration);

});


// =========================================
// CLICK PE BARA DE PROGRES
// =========================================

document.getElementById("music-progress")
    .addEventListener("input", function() {

        if (!musicAudio.duration) return;

        musicAudio.currentTime =
            (this.value / 100) * musicAudio.duration;

    });


// =========================================
// VOLUM
// =========================================

const musicVolume =
    document.getElementById("music-volume");

musicAudio.volume = musicVolume.value;

musicVolume.addEventListener("input", function() {

    musicAudio.volume = this.value;

    document.getElementById("music-volume-value").textContent =
        Math.round(this.value * 100) + "%";

});


// =========================================
// FORMAT TIMP
// =========================================

function formatMusicTime(seconds) {

    if (!isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}


// =========================================
// AUTO NEXT
// =========================================

musicAudio.addEventListener("ended", function() {

    nextSong();

});


// =========================================
// PLAYLIST
// =========================================

fetch("Model-26-playlist.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Playlist-ul nu poate fi încărcat.");
        }

        return response.json();

    })
    .then(data => {

        musicPlaylist = data;

        if (musicPlaylist.length > 0) {
            loadSong(0);
        }

    })
    .catch(error => {

        console.error("Eroare playlist:", error);

    });


// =========================================
// MELODIA ACTIVĂ
// =========================================

function updatePlaylistActive() {

    const items =
        document.querySelectorAll(".playlist-item");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === currentSongIndex
        );

    });

}