        // --- LOGICA ESTRELLAS ---
        function createStars() {
            const container = document.getElementById('stars-container');
            const starCount = 80;

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const size = Math.random() * 2 + 1;
                const duration = Math.random() * 3 + 2;
                const delay = Math.random() * 5;
                const maxOpacity = Math.random() * 0.7 + 0.3;

                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.setProperty('--duration', `${duration}s`);
                star.style.setProperty('--delay', `${delay}s`);
                star.style.setProperty('--max-opacity', maxOpacity);

                if (Math.random() > 0.8) {
                    star.style.backgroundColor = 'var(--gold-shine)';
                    star.style.boxShadow = '0 0 6px var(--gold-shine)';
                }
                container.appendChild(star);
            }
        }
        createStars();

        // --- LOGICA PARTÍCULAS DORADAS ---
        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.classList.add('cursor-particle');
            document.body.appendChild(particle);

            const size = Math.random() * 3 + 2; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const colors = ['var(--gold-brown)', 'var(--gold-shine)', 'var(--magenta-main)'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const destinationX = (Math.random() - 0.5) * 50;
            const destinationY = (Math.random() - 0.5) * 50;

            particle.style.setProperty('--tx', `${destinationX}px`);
            particle.style.setProperty('--ty', `${destinationY}px`);

            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }

        // --- FUNCION TRIGGER LIKE (MANITAS ARRIBA) ---
        function triggerLike(event, btn) {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top;

            for(let i=0; i<3; i++) {
                const el = document.createElement('div');
                el.classList.add('like-float');
                el.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
                
                const randomX = (Math.random() - 0.5) * 40;
                
                el.style.left = `${centerX + randomX}px`;
                el.style.top = `${centerY}px`;
                el.style.animationDelay = `${i * 0.1}s`; 
                
                document.body.appendChild(el);
                
                el.addEventListener('animationend', () => el.remove());
            }

            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span class="text-[var(--gold-shine)]">Liked!</span>';
            setTimeout(() => {
                btn.innerHTML = originalContent;
            }, 1000);
        }

        // --- MOUSE TRACKING ---
        const cursor = document.getElementById('cursor-glow');
        let mouseX = window.innerWidth / 2; 
        let mouseY = window.innerHeight / 2;
        let cursorX = window.innerWidth / 2; 
        let cursorY = window.innerHeight / 2;
        let lastParticleTime = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const now = Date.now();
            if (now - lastParticleTime > 30) {
                createParticle(mouseX, mouseY);
                lastParticleTime = now;
            }
        });

document.addEventListener("mousemove", (e) => {
    if (window.matchMedia("(hover: hover)").matches) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

    const now = Date.now();
    if (now - lastParticleTime > 30) {
        createParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

        // --- MODAL DE AMIGOS ---
        function openFriendsModal() {
            const modal = document.getElementById('friends-modal');
            const card = modal.querySelector('.glass-card');
            modal.classList.remove('opacity-0', 'invisible');
            card.classList.remove('scale-95');
            card.classList.add('scale-100');
        }

        function closeFriendsModal() {
            const modal = document.getElementById('friends-modal');
            const card = modal.querySelector('.glass-card');
            modal.classList.add('opacity-0', 'invisible');
            card.classList.remove('scale-100');
            card.classList.add('scale-95');
        }

        // --- MUSIC PLAYER ---
let playlist = [];
let currentSongIndex = 0;
let isPlaying = false;

async function loadPlaylist() {
    try {
        const response = await fetch("Model-24-playlist.json");
        playlist = await response.json();

        if (playlist.length > 0) {
            loadSong(playlist[currentSongIndex]);
        }

    } catch (err) {
        console.error("Playlist error:", err);
    }
}

loadPlaylist();
        
        const audio = document.getElementById('audio-player');
        const playIcon = document.getElementById('play-icon');
        const albumArt = document.getElementById('album-art');
        const visualizer = document.getElementById('visualizer');
        const progressBar = document.getElementById('progress-bar');
        const progressContainer = document.getElementById('progress-container');
        const volumeSlider = document.getElementById('volume-slider');
		audio.volume = 1;

volumeSlider.value = 1;

volumeSlider.oninput = function () {
    audio.volume = Number(this.value);
};
        const mainContent = document.getElementById('main-content');
        const startScreen = document.getElementById('start-screen');

        function enterSite() {
            startScreen.style.opacity = '0';
            startScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                startScreen.style.display = 'none';
                mainContent.classList.remove('opacity-0', 'scale-95', 'filter', 'blur-sm');
            }, 600);
            playSong();
        }

        function loadSong(song) {
            document.getElementById('song-title').innerText = song.title;
            document.getElementById('artist-name').innerText = song.artist;
            albumArt.src = song.cover;
            audio.src = song.url;
            albumArt.onerror = function() {
                this.src = 'https://placehold.co/300x300/222/FFF?text=Music'; 
            };
        }

        loadSong(playlist[currentSongIndex]);

        function togglePlay() {
            if (isPlaying) { pauseSong(); } else { playSong(); }
        }

function playSong() {

    if (!playlist.length) return;

    if (audio.src !== playlist[currentSongIndex].url) {
        loadSong(playlist[currentSongIndex]);
    }

    isPlaying = true;

    audio.play().then(() => {

        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");

        albumArt.style.animationPlayState = "running";
        visualizer.classList.remove("paused");

    }).catch(console.error);

}

        function pauseSong() {
            isPlaying = false;
            audio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            albumArt.style.animationPlayState = 'paused';
            visualizer.classList.add('paused');
        }

        function nextSong() {
            currentSongIndex++;
            if (currentSongIndex > playlist.length - 1) currentSongIndex = 0;
            playSong();
        }

        function prevSong() {
            currentSongIndex--;
            if (currentSongIndex < 0) currentSongIndex = playlist.length - 1;
            loadSong(playlist[currentSongIndex]);
            if(isPlaying) playSong();
        }

        function updateProgress() {
            const { duration, currentTime } = audio;
            if(isNaN(duration)) return;
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            document.getElementById('current-time').innerText = formatTime(currentTime);
            document.getElementById('duration').innerText = formatTime(duration);
        }

        function formatTime(seconds) {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec < 10 ? '0' + sec : sec}`;
        }

        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const duration = audio.duration;
            audio.currentTime = (clickX / width) * duration;
        });

// =========================
// VOLUME CONTROL
// =========================

// Volumul inițial (0 - 1)
audio.volume = Number(volumeSlider.value);

// Actualizare în timp real
function updateVolume() {
    audio.volume = Number(volumeSlider.value);
}

// Funcționează în toate browserele
volumeSlider.addEventListener("input", updateVolume);
volumeSlider.addEventListener("change", updateVolume);

        // --- GALERIA CARROUSEL SCROLL CON MOUSE ---
        const gallerySlider = document.getElementById('gallery-slider');
        if (gallerySlider) {
            gallerySlider.addEventListener('wheel', (evt) => {
                evt.preventDefault();
                gallerySlider.scrollBy({
                    left: evt.deltaY > 0 ? gallerySlider.offsetWidth : -gallerySlider.offsetWidth,
                    behavior: 'smooth'
                });
            }, { passive: false });
        }

        // --- FETCH ONLINE STATUS ---
        async function fetchOnlineStatus() {
            try {
                const response = await fetch('https://illuxat.com/api/online/xDesignx');
                const text = await response.text();
                const statusText = document.getElementById('status-text');
                const statusIndicator = document.getElementById('status-indicator');
                
                let isOnline = false;
                
                try {
                    const data = JSON.parse(text);
                    // Validamos la estructura exacta que arroja la API: { data: { status: "Online" } }
                    if (data && data.data && data.data.status === "Online") {
                        isOnline = true;
                    } else if (data && data.status === "Online") { // Respaldo por si cambia la estructura
                        isOnline = true;
                    } else if (data === "Online") {
                        isOnline = true;
                    }
                } catch (e) {
                    // Si no es JSON, probamos texto plano
                    const cleanText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                    if (cleanText === "online" || cleanText === "1" || cleanText === "true") {
                        isOnline = true;
                    }
                }
                
                if (isOnline) {
                    statusText.innerText = "EN LÍNEA";
                    statusIndicator.className = "w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse";
                } else {
                    statusText.innerText = "AUSENTE";
                    statusIndicator.className = "w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse";
                }
            } catch (error) {
                console.error("Error fetching online status:", error);
            }
        }
        
        // Ejecutar inmediatamente al cargar la página
        fetchOnlineStatus();

        // --- PROTECCIÓN DE CÓDIGO (Anti-F12, Clic Derecho, Atajos) ---
        document.addEventListener('contextmenu', event => event.preventDefault());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
                e.preventDefault();
                return false;
            }
        });
