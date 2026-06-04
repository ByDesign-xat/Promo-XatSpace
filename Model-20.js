    // --- Controle do Cursor Customizado ---
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const star = document.getElementById('cursorStar');

    document.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
    });

    document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
    document.addEventListener('mouseup', () => document.body.classList.remove('clicking'));

    // --- Sistema de Abas Principais ---
    function showTab(tabName, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(`tab-${tabName}`).classList.add('active');
    }

    // --- Sistema de Abas Internas da Galeria de Gifs ---
    function showGallerySection(sectionId, btn) {
        document.querySelectorAll('.inner-nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.gallery-showcase-section').forEach(s => s.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    }

    // --- Função para o Zoom das Fotos ---
    function zoomImage(element) {
        const lb = document.getElementById('lightbox');
        const img = document.getElementById('lightboxImg');
        const imgSrc = element.querySelector('img').src;
        img.src = imgSrc;
        lb.classList.add('active');
    }

    // --- Reprodutor de Música ---
    const playlist = [
        { title: "Shake It To The Max", artist: "MOLIY & Silent Addy", cover: "https://files.catbox.moe/2mk9wh.jpg", url: "https://files.catbox.moe/rshch0.mp3" },
        { title: "Solo tuu", artist: "Costi & Adrian Saguna & Benzol", cover: "https://files.catbox.moe/3vpoa3.jpg", url: "https://files.catbox.moe/xglh29.mp3" },
        { title: "You Don't Know", artist: "Eminem ft. 50 Cent", cover: "https://files.catbox.moe/1lw1mq.jpg", url: "https://files.catbox.moe/5ml64x.mp3" },
		{ title: "The Real Slim Shady", artist: "Eminem", cover: "https://files.catbox.moe/vkapch.jpg", url: "https://files.catbox.moe/7ktpby.mp3" },
        { title: "Jamaican", artist: "HUGEL & SOLTO", cover: "https://files.catbox.moe/50zeh3.jpg", url: "https://files.catbox.moe/3ceaw0.mp3" },
        { title: "Mala", artist: "MANDA", cover: "https://files.catbox.moe/7h17j2.jpg", url: "https://files.catbox.moe/zdn6ft.mp3" },
        { title: "Heart attack", artist: "Noizy & Loredana", cover: "https://files.catbox.moe/i352r6.jpg", url: "https://files.catbox.moe/pb536t.mp3" },
        { title: "Un Grrr", artist: "Fantomel & Kate Linn", cover: "https://files.catbox.moe/fda537.jpg", url: "https://files.catbox.moe/bs1muu.mp3" },
        { title: "CHANEL", artist: "Tyla", cover: "https://files.catbox.moe/jexp91.jpg", url: "https://files.catbox.moe/th5928.mp3" },
		{ title: "Without Me", artist: "Eminem", cover: "https://files.catbox.moe/2v9ls1.jpg", url: "https://files.catbox.moe/1pxsih.mp3" },
		{ title: "Still", artist: "Dr. Dre ft. D.R.E. ft. Snoop Dogg", cover: "https://files.catbox.moe/zppkej.jpg", url: "https://files.catbox.moe/54v621.mp3" },
        { title: "APT.", artist: "ROSA & Bruno Mars", cover: "https://files.catbox.moe/bs4acb.jpg", url: "https://files.catbox.moe/brrha5.mp3" }
    ];

    let currentTrack = 0;
    const audio = new Audio();
    audio.volume = 1;

    const tracklistContainer = document.getElementById('tracklistContainer');
    const historyContainer = document.getElementById('historyContainer');
    const historyCount = document.getElementById('historyCount');
    let playedHistory = [];

    function initPlaylist() {
        tracklistContainer.innerHTML = '';
        playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `track-item ${index === currentTrack ? 'active' : ''}`;
            item.innerHTML = `
                <div class="track-meta">
                    <img class="track-thumb" src="${track.cover}">
                    <span class="track-number">${(index+1).toString().padStart(2,'0')}</span>
                    <span class="track-name">${track.title} <span class="track-artist">- ${track.artist}</span></span>
                </div>
                <span class="track-duration">..:..</span>
            `;
            item.onclick = () => { currentTrack = index; playCurrentTrack(); };
            tracklistContainer.appendChild(item);
        });
    }

    function addTrackToHistory(track) {
        if(playedHistory.includes(track.title)) return;
        playedHistory.push(track.title);
        historyCount.innerText = `(${playedHistory.length})`;
        
        const hItem = document.createElement('div');
        hItem.className = "track-item played";
        hItem.innerHTML = `
            <div class="track-meta">
                <img class="track-thumb" src="${track.cover}" style="filter:grayscale(1)">
                <span class="track-name" style="color:#697da7">${track.title}</span>
            </div>
        `;
        historyContainer.prepend(hItem);
    }

    function playCurrentTrack() {
        const track = playlist[currentTrack];
        audio.src = track.url;
        document.getElementById('songTitle').innerText = track.title;
        document.getElementById('songArtist').innerText = track.artist;
        document.getElementById('albumArt').src = track.cover;
        document.getElementById('statusPill').innerText = "Playing track";
        
        document.querySelectorAll('.track-item').forEach((item, idx) => {
            item.classList.toggle('active', idx === currentTrack);
        });

        addTrackToHistory(track);
        
        audio.play().then(() => {
            document.getElementById('btnPlay').innerHTML = "&#9208;";
        }).catch(() => {
            document.getElementById('btnPlay').innerHTML = "&#9654;";
        });
    }

    function togglePlay() {
        if(audio.paused) {
            if(!audio.src) { playCurrentTrack(); return; }
            audio.play();
            document.getElementById('btnPlay').innerHTML = "&#9208;";
        } else {
            audio.pause();
            document.getElementById('btnPlay').innerHTML = "&#9654;";
        }
    }

    function changeTrack(direction) {
        currentTrack = (currentTrack + direction + playlist.length) % playlist.length;
        playCurrentTrack();
    }

    function changeVolume(val) {

    audio.volume = val / 100;

    document.getElementById('volumeValue').innerText =
        `${val}%`;

}

    function toggleLike() {
        const btn = document.getElementById('btnLike');
        if(btn.innerText === "♡") { btn.innerText = "❤️"; btn.style.textShadow = "0 0 8px red"; }
        else { btn.innerText = "♡"; btn.style.textShadow = "none"; }
    }

    audio.addEventListener('timeupdate', () => {
        if(audio.duration) {
            const pct = (audio.currentTime / audio.duration) * 100;
            document.getElementById('progressFill').style.width = `${pct}%`;
            let mins = Math.floor(audio.currentTime / 60);
            let secs = Math.floor(audio.currentTime % 60);
            document.getElementById('currentTime').innerText = `${mins}:${secs.toString().padStart(2,'0')}`;
            let dmins = Math.floor(audio.duration / 60);
            let dsecs = Math.floor(audio.duration % 60);
            document.getElementById('totalTime').innerText = `${dmins}:${dsecs.toString().padStart(2,'0')}`;
            document.getElementById('totalTime').classList.remove('color-verde-neon');
        } else {
            document.getElementById('progressFill').style.width = `100%`;
            document.getElementById('currentTime').innerText = "Load...";
            document.getElementById('totalTime').innerText = "Load...";
            document.getElementById('totalTime').classList.add('color-verde-neon');
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        initPlaylist();
        const track = playlist[currentTrack];
        document.getElementById('songTitle').innerText = track.title;
        document.getElementById('songArtist').innerText = track.artist;
        document.getElementById('albumArt').src = track.cover;
    });

