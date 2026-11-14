    function fitToScreen() {
        const artboard = document.querySelector('.artboard');
        if (window.innerWidth <= 1050) { artboard.style.transform = `none`; return; }
        const winW = window.innerWidth; const winH = window.innerHeight;
        const scale = Math.min(winW / 1060, winH / 660); 
        if(scale < 1) { artboard.style.transform = `scale(${scale})`; } else { artboard.style.transform = `scale(1)`; }
    }
    window.addEventListener('resize', fitToScreen);
    fitToScreen(); 

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', function(e) {
        if(document.getElementById('admin-overlay-panel').style.display !== 'flex' && document.getElementById('login-overlay').style.display !== 'flex') {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'U')) { e.preventDefault(); }
        }
    });

    const customCursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', function(e) {
        if(document.getElementById('admin-overlay-panel').style.display !== 'flex' && document.getElementById('login-overlay').style.display !== 'flex') {
            customCursor.style.left = e.clientX + 'px'; customCursor.style.top = e.clientY + 'px';
            if (Math.random() < 0.25) { 
                const sparkle = document.createElement('div'); sparkle.className = 'sparkle';
                sparkle.style.left = (e.clientX - 7 + (Math.random() * 10 - 5)) + 'px';
                sparkle.style.top = (e.clientY - 7 + (Math.random() * 10 - 5)) + 'px';
                document.body.appendChild(sparkle); setTimeout(() => sparkle.remove(), 900);
            }
        }
    });

    const defaultData = {
        gallery: [
            "https://xatimg.com/image/uFncq7ySHSIy.png", "https://xatimg.com/image/fiH2GGeslh65.png",
            "https://xatimg.com/image/uFncq7ySHSIy.png", "https://xatimg.com/image/fiH2GGeslh65.png",
            "https://xatimg.com/image/uFncq7ySHSIy.png", "https://xatimg.com/image/fiH2GGeslh65.png",
            "https://xatimg.com/image/uFncq7ySHSIy.png", "https://xatimg.com/image/fiH2GGeslh65.png"
        ]
    };

    let currentData = JSON.parse(localStorage.getItem('loveProfileData_V35')) || defaultData;

    function renderUI() {
        let galleryHTML = ''; let dotsHTML = '';
        currentData.gallery.forEach((url, i) => {
            galleryHTML += `<div class="pill clickable" style="background-image: url('${url}');" onclick="openModal('${url}')"></div>`;
            if(i % 4 === 0) { dotsHTML += `<div class="g-dot clickable ${i===0?'active':''}" onclick="scrollToPage(${Math.floor(i/4)})"></div>`; }
        });
        document.getElementById('gallery-inner').innerHTML = galleryHTML;
        document.getElementById('gallery-dots').innerHTML = dotsHTML;
        scrollToPage(0); 
    }

    let currentGalPage = 0;
    window.scrollToPage = function(page) {
        currentGalPage = page;
        const inner = document.getElementById('gallery-inner');
        inner.style.transform = `translateX(-${page * 228}px)`; 
        const dots = document.querySelectorAll('.g-dot'); 
        dots.forEach(d => d.classList.remove('active')); 
        if(dots[page]) dots[page].classList.add('active'); 
    }

    const galViewport = document.getElementById('gallery-viewport');
    let isGalScrolling = false;
    galViewport.addEventListener('wheel', (e) => { 
        e.preventDefault(); 
        if(isGalScrolling) return;
        isGalScrolling = true; setTimeout(() => isGalScrolling = false, 400); 
        const totalPages = Math.ceil(currentData.gallery.length / 4);
        if(e.deltaY > 0 && currentGalPage < totalPages - 1) { scrollToPage(currentGalPage + 1); } 
        else if(e.deltaY < 0 && currentGalPage > 0) { scrollToPage(currentGalPage - 1); }
    });

    renderUI();

    let storedHash = localStorage.getItem('adminHash_V35');
    function openLoginPanel() {
        const loginOverlay = document.getElementById('login-overlay');
        loginOverlay.style.display = 'flex'; setTimeout(()=> loginOverlay.classList.add('show'), 10);
        document.body.style.cursor = 'auto'; document.getElementById('custom-cursor').style.display = 'none';
        document.getElementById('admin-pwd-input').value = '';
        const msg = document.getElementById('login-msg');
        if(!storedHash) { msg.innerText = "Create a new password (it will be encrypted)."; msg.style.color = "var(--pastel-pink)"; } 
        else { msg.innerText = "Enter your password to edit"; msg.style.color = "#888"; }
        document.getElementById('admin-pwd-input').focus();
    }
    function closeLoginPanel() {
        const loginOverlay = document.getElementById('login-overlay');
        loginOverlay.classList.remove('show'); setTimeout(()=> loginOverlay.style.display = 'none', 300);
        document.body.style.cursor = 'none'; document.getElementById('custom-cursor').style.display = 'block';
    }
    async function hashPassword(password) {
        const msgUint8 = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    async function checkPassword() {
        const pwd = document.getElementById('admin-pwd-input').value;
        if(pwd.trim() === "") { alert("The password cannot be empty."); return; }
        const inputHash = await hashPassword(pwd);
        if (!storedHash) {
            storedHash = inputHash; localStorage.setItem('adminHash_V35', storedHash);
            alert("¡Password successfully saved and encrypted (SHA-256)!");
            closeLoginPanel(); setTimeout(openAdminPanel, 300);
        } else if (inputHash === storedHash) { closeLoginPanel(); setTimeout(openAdminPanel, 300); } 
        else { alert("Incorrect password."); }
    }
    document.getElementById('admin-pwd-input').addEventListener('keypress', function (e) { if (e.key === 'Enter') checkPassword(); });

    const adminOverlay = document.getElementById('admin-overlay-panel');
    function openAdminPanel() {
        document.getElementById('edit-gallery').value = currentData.gallery.join('\n');
        adminOverlay.style.display = 'flex'; setTimeout(()=> adminOverlay.classList.add('show'), 10);
        document.body.style.cursor = 'auto'; document.getElementById('custom-cursor').style.display = 'none';
    }
    function closeAdminPanel() {
        adminOverlay.classList.remove('show'); setTimeout(()=> adminOverlay.style.display = 'none', 300);
        document.body.style.cursor = 'none'; document.getElementById('custom-cursor').style.display = 'block';
    }
    function saveAdminData() {
        const gLines = document.getElementById('edit-gallery').value.split('\n');
        currentData.gallery = gLines.filter(l => l.trim()!=='').map(l => l.trim());
        localStorage.setItem('loveProfileData_V35', JSON.stringify(currentData));
        renderUI(); closeAdminPanel();
    }

    function openModal(imgUrl) { 
        const modal = document.getElementById('photo-modal'); document.getElementById('modal-img').src = imgUrl; 
        modal.style.display = 'flex'; setTimeout(() => modal.classList.add('show'), 10); 
    }
    function closeModal() { 
        const modal = document.getElementById('photo-modal'); 
        modal.classList.remove('show'); setTimeout(() => modal.style.display = 'none', 300); 
    }

    /* EFECTO 3D */
    const cardContainer = document.getElementById('card-container');
    const floatWrap = document.getElementById('float-wrap');
    const card = document.getElementById('js-tilt-card');
    const cardGlare = document.getElementById('card-glare');
    const rightPanel = document.getElementById('right-panel-area');
    const rightBg = document.getElementById('right-bg');

    rightPanel.addEventListener('mouseenter', () => { 
        if(window.innerWidth > 1050) { cardContainer.style.transform = 'translateX(-90px)'; rightBg.style.transform = 'translateX(-40px)'; rightPanel.style.transform = 'translateX(-40px)'; }
    });
    rightPanel.addEventListener('mouseleave', () => { 
        if(window.innerWidth > 1050) { cardContainer.style.transform = 'translateX(0)'; rightBg.style.transform = 'translateX(0)'; rightPanel.style.transform = 'translateX(0)'; }
    });
    cardContainer.addEventListener('mouseenter', () => {
        if(window.innerWidth > 1050) { floatWrap.style.animationPlayState = 'paused'; card.style.transition = `transform 0.1s ease-out`; }
    });
    cardContainer.addEventListener('mousemove', (e) => {
        if(window.innerWidth > 1050) {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const centerX = rect.width / 2; const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -20; const rotateY = ((x - centerX) / centerX) * 20;  
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
            const glareX = (x / rect.width) * 100; const glareY = (y / rect.height) * 100;
            cardGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
        }
    });
    cardContainer.addEventListener('mouseleave', () => {
        if(window.innerWidth > 1050) {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = `transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)`;
            cardGlare.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`;
            setTimeout(() => floatWrap.style.animationPlayState = 'running', 500); 
        }
    });

    const quoteText = document.querySelector('.bottom-quote');
    if(quoteText) {
        quoteText.addEventListener('mousemove', function(e) {
            if (Math.random() < 0.6) { 
                const sparkle = document.createElement('div'); sparkle.className = 'sparkle';
                sparkle.style.left = (e.clientX - 10 + (Math.random() * 30 - 15)) + 'px';
                sparkle.style.top = (e.clientY - 10 + (Math.random() * 30 - 15)) + 'px';
                const randomScale = Math.random() * 0.5 + 0.8; sparkle.style.transform = `scale(${randomScale})`;
                document.body.appendChild(sparkle); setTimeout(() => sparkle.remove(), 900);
            }
        });
    }

    /* ================= PLAYER MODERNO DESDE JSON ================= */
    (function initMusicPlayer() {
        const audio = document.getElementById('player-audio');
        const playButton = document.getElementById('player-play');
        const prevButton = document.getElementById('player-prev');
        const nextButton = document.getElementById('player-next');
        const shuffleButton = document.getElementById('player-shuffle');
        const titleElement = document.getElementById('player-title');
        const artistElement = document.getElementById('player-artist');
        const coverElement = document.getElementById('player-cover');
        const progress = document.getElementById('player-progress');
        const currentTimeElement = document.getElementById('player-current-time');
        const durationElement = document.getElementById('player-duration');
        const volume = document.getElementById('player-volume');

        if (!audio || !playButton) return;

        let tracks = [];
        let currentTrackIndex = 0;
        let shuffleEnabled = false;

        function getNextTrackIndex() {
            if (!shuffleEnabled || tracks.length < 2) return currentTrackIndex + 1;
            let randomIndex;
            do { randomIndex = Math.floor(Math.random() * tracks.length); }
            while (randomIndex === currentTrackIndex);
            return randomIndex;
        }

        function formatTime(seconds) {
            if (!Number.isFinite(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
        }

        function setPlayingState(isPlaying) {
            playButton.classList.toggle('is-playing', isPlaying);
            playButton.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
        }

        function loadTrack(index, autoplay = false) {
            if (!tracks.length) return;
            currentTrackIndex = (index + tracks.length) % tracks.length;
            const track = tracks[currentTrackIndex];
            audio.src = track.url;
            titleElement.textContent = (track.title || 'Unknown title').trim();
            artistElement.textContent = track.artist || 'Unknown artist';
            coverElement.src = track.cover || 'https://i.postimg.cc/P525y46g/REPR.png';
            coverElement.alt = `${track.artist || 'Artist'} - ${track.title || 'Track'}`;
            currentTimeElement.textContent = '0:00';
            durationElement.textContent = track.duracion || '0:00';
            progress.value = 0;
            if (autoplay) audio.play().then(() => setPlayingState(true)).catch(() => setPlayingState(false));
            else setPlayingState(false);
        }

        fetch('Model-27-playlist.json')
            .then(response => {
                if (!response.ok) throw new Error(`Playlist HTTP ${response.status}`);
                return response.json();
            })
            .then(data => {
                tracks = Array.isArray(data) ? data.filter(track => track && track.url) : [];
                if (!tracks.length) throw new Error('No hay canciones válidas en el JSON.');
                loadTrack(0);
            })
            .catch(error => {
                titleElement.textContent = 'No se pudo cargar la música';
                artistElement.textContent = 'Comprueba Model-27-playlist.json';
                console.error('Error cargando playlist:', error);
            });

        playButton.addEventListener('click', () => {
            if (!tracks.length) return;
            if (audio.paused) {
                if (!audio.src) loadTrack(currentTrackIndex);
                audio.play().then(() => setPlayingState(true)).catch(error => console.error('Error al reproducir:', error));
            } else {
                audio.pause();
            }
        });

        prevButton.addEventListener('click', () => loadTrack(currentTrackIndex - 1, true));
        nextButton.addEventListener('click', () => loadTrack(getNextTrackIndex(), true));
        shuffleButton.addEventListener('click', () => {
            shuffleEnabled = !shuffleEnabled;
            shuffleButton.classList.toggle('is-active', shuffleEnabled);
            shuffleButton.setAttribute('aria-pressed', String(shuffleEnabled));
            shuffleButton.setAttribute('aria-label', shuffleEnabled ? 'Dezactivează amestecarea' : 'Activează amestecarea');
        });

        audio.addEventListener('play', () => setPlayingState(true));
        audio.addEventListener('pause', () => setPlayingState(false));
        audio.addEventListener('ended', () => loadTrack(getNextTrackIndex(), true));
        audio.addEventListener('loadedmetadata', () => {
            durationElement.textContent = formatTime(audio.duration);
        });
        audio.addEventListener('timeupdate', () => {
            if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
            progress.value = (audio.currentTime / audio.duration) * 100;
            currentTimeElement.textContent = formatTime(audio.currentTime);
        });
        progress.addEventListener('input', () => {
            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                audio.currentTime = (Number(progress.value) / 100) * audio.duration;
            }
        });
        volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
        audio.volume = Number(volume.value);
    })();


