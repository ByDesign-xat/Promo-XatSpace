        document.addEventListener("DOMContentLoaded", function() {
            
// --- MUSIC PLAYER ---

let playlist = [];
let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById('musica-fondo');
const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const tituloCancion = document.getElementById('titulo-cancion');
const portadaAlbum = document.getElementById('portada-album');
const tarjetaReproductor = document.getElementById('tarjeta-reproductor');
const timpCurent = document.getElementById('timp-curent');
const timpTotal = document.getElementById('timp-total');
const baraMelodie = document.getElementById('bara-melodie');


// =========================================
// INCARCA PLAYLISTUL JSON
// =========================================

async function loadPlaylist() {

    try {

        const response = await fetch("Model-25-playlist.json");

        if (!response.ok) {
            throw new Error(
                "Nu pot încărca Model-25-playlist.json"
            );
        }

        playlist = await response.json();

        console.log("Playlist încărcat:", playlist);

        if (playlist.length > 0) {

            cargarCancion(currentSongIndex);

        } else {

            console.error("Playlistul este gol.");

        }

    } catch (err) {

        console.error("Playlist error:", err);

    }
}


// =========================================
// INCARCA MELODIA
// =========================================

function cargarCancion(indice) {

    if (!playlist.length) {
        return;
    }

    const song = playlist[indice];

    console.log("Melodia:", song.artist, "-", song.title);

    tituloCancion.innerText =
        `${song.artist} - ${song.title}`;

    portadaAlbum.src = song.cover;

    audio.src = song.url;

    tarjetaReproductor.style.setProperty(
        '--bg-album',
        `url('${song.cover}')`
    );

    audio.load();
}


// =========================================
// PLAY
// =========================================

function reproducirMusica() {

    if (!playlist.length) {
        console.error("Playlistul nu este încărcat.");
        return;
    }

    audio.play()
        .then(() => {

            isPlaying = true;

            btnPlay.innerText = '⏸';

            tarjetaReproductor.classList.add('sonando');

        })
        .catch(err => {

            console.error("Eroare la redare:", err);

        });
}


// =========================================
// PAUSE
// =========================================

function pausaMusica() {

    audio.pause();

    isPlaying = false;

    btnPlay.innerText = '▶';

    tarjetaReproductor.classList.remove('sonando');
}


// =========================================
// NEXT
// =========================================

btnNext.addEventListener('click', function() {

    if (!playlist.length) {
        return;
    }

    currentSongIndex++;

    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }

    cargarCancion(currentSongIndex);

    reproducirMusica();

});


// =========================================
// PREVIOUS
// =========================================

btnPrev.addEventListener('click', function() {

    if (!playlist.length) {
        return;
    }

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }

    cargarCancion(currentSongIndex);

    reproducirMusica();

});


// =========================================
// PLAY / PAUSE
// =========================================

btnPlay.addEventListener('click', function() {

    if (!playlist.length) {
        return;
    }

    if (audio.paused) {

        reproducirMusica();

    } else {

        pausaMusica();

    }

});


// =========================================
// CÂND SE TERMINĂ MELODIA
// =========================================

audio.addEventListener('ended', function() {

    if (!playlist.length) {
        return;
    }

    currentSongIndex++;

    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }

    cargarCancion(currentSongIndex);

    reproducirMusica();

});


// =========================================
// PORNEȘTE PLAYLISTUL
// =========================================

loadPlaylist();



// =========================================
// FORMAT TIMP
// =========================================

function formatTime(seconds) {

    if (isNaN(seconds) || !isFinite(seconds)) {
        return "0:00";
    }

    const minute = Math.floor(seconds / 60);
    const secunde = Math.floor(seconds % 60);

    return `${minute}:${secunde.toString().padStart(2, '0')}`;
}


// =========================================
// DURATA MELODIEI
// =========================================

audio.addEventListener('loadedmetadata', function() {

    timpTotal.textContent = formatTime(audio.duration);

    baraMelodie.max = audio.duration;
    baraMelodie.value = 0;

    timpCurent.textContent = "0:00";

});


// =========================================
// ACTUALIZARE TIMP
// =========================================

audio.addEventListener('timeupdate', function() {

    const current = audio.currentTime;
    const duration = audio.duration;

    timpCurent.textContent = formatTime(current);

    baraMelodie.value = current;

    if (duration && isFinite(duration)) {

        const percent = (current / duration) * 100;

        baraMelodie.style.setProperty(
            '--progress',
            percent + '%'
        );
    }
});


// =========================================
// MUTARE ÎN MELODIE
// =========================================

baraMelodie.addEventListener('input', function() {

    audio.currentTime = this.value;

});
            /* ====================================================
               RATÓN, NIEVE Y ESTRELLAS
               ==================================================== */
            const caracteresRastro = ['✦', '★', '✧', '✨', '🌸', '💕'];
            document.addEventListener('mousemove', function(e) {
                let rastro = document.createElement('span');
                rastro.className = 'rastro-cursor';
                rastro.innerText = caracteresRastro[Math.floor(Math.random() * caracteresRastro.length)];
                let tamano = Math.random() * 12 + 8;
                rastro.style.fontSize = `${tamano}px`;
                rastro.style.left = `${e.pageX}px`;
                rastro.style.top = `${e.pageY}px`;
                let direccionX = (Math.random() - 0.5) * 60 + 'px'; 
                let direccionY = (Math.random() - 0.5) * 60 + 20 + 'px'; 
                rastro.style.setProperty('--dir-x', direccionX);
                rastro.style.setProperty('--dir-y', direccionY);
                document.body.appendChild(rastro);
                setTimeout(() => { rastro.remove(); }, 1000);
            });

            const contenedorNieve = document.getElementById('nieve-interna');
            for(let i = 0; i < 40; i++) {
                let copo = document.createElement('div');
                copo.className = 'copo-nieve';
                let tamano = Math.random() * 3 + 1; 
                copo.style.width = `${tamano}px`;
                copo.style.height = `${tamano}px`;
                copo.style.left = `${Math.random() * 100}%`;
                copo.style.animationDuration = `${Math.random() * 3 + 2}s`; 
                copo.style.animationDelay = `-${Math.random() * 5}s`;
                contenedorNieve.appendChild(copo);
            }

            const contenedorFoto = document.getElementById('contenedor-foto');
            const formasEstrellas = ['✦', '★', '✧', '✨'];
            for(let i = 0; i < 15; i++) { 
                let estrella = document.createElement('span');
                estrella.className = 'estrella-rosa';
                estrella.innerText = formasEstrellas[Math.floor(Math.random() * formasEstrellas.length)];
                let angulo = Math.random() * Math.PI * 2;
                let radio = 98 + Math.random() * 15; 
                let xPx = Math.cos(angulo) * radio;
                let yPx = Math.sin(angulo) * radio;
                estrella.style.left = `calc(50% + ${xPx}px)`;
                estrella.style.top = `calc(50% + ${yPx}px)`;
                estrella.style.fontSize = `${Math.random() * 14 + 10}px`; 
                estrella.style.animationDuration = `${Math.random() * 2 + 1}s`;
                estrella.style.animationDelay = `-${Math.random() * 2}s`;
                contenedorFoto.appendChild(estrella);
            }

            /* ====================================================
               MÁQUINA DE ESCRIBIR
               ==================================================== */
            const textoPoeticoEl = document.getElementById('texto-poetico');

const textoInspirador = `" 𝖂𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 𝖒𝖞 𝖃𝖆𝖙𝕾𝖕𝖆𝖈𝖊"

🅰🅱🅾🆄🆃 🅼🅴

Hi! I'm "You Name"

I am from United Kingdom — London

And I am from the sign Leo

I like Music, Traveling, Video Games.

" 𝕯𝖗𝖊𝖆𝖒 𝖆𝖘 𝖎𝖋 𝐲𝖔𝖚'𝖑𝖑 𝖑𝖎𝖛𝖊 𝖋𝖔𝖗𝖊𝖛𝖊𝖗✨"....`
;




            let charIndex = 0;
            let escribiendo = false;

            function maquinaDeEscribir() {
                if (charIndex < textoInspirador.length) {
                    textoPoeticoEl.textContent += textoInspirador.charAt(charIndex);
                    charIndex++;
                    setTimeout(maquinaDeEscribir, 45);
                } else {
                    setTimeout(() => {
                        textoPoeticoEl.style.transition = 'opacity 2s ease';
                        textoPoeticoEl.style.opacity = '0';
                        setTimeout(() => {
                            textoPoeticoEl.textContent = '';
                            textoPoeticoEl.style.opacity = '1';
                            charIndex = 0;
                            maquinaDeEscribir(); 
                        }, 2000); 
                    }, 5000); 
                }
            }

            /* ====================================================
               ENTRADA, VOLUMEN Y LLUVIA DEL FONDO
               ==================================================== */
            const overlayEntrada = document.getElementById('overlay-entrada');
            const botonEntrar = document.getElementById('boton-entrar');
            const controlVolumen = document.getElementById('control-volumen');

            botonEntrar.addEventListener('click', function() {
                overlayEntrada.classList.add('oculto');
                
                reproducirMusica();
                
                if (!escribiendo) {
                    escribiendo = true;
                    setTimeout(maquinaDeEscribir, 1000); 
                }
            });

            controlVolumen.addEventListener('input', function() { audio.volume = this.value; });

            const escenario = document.getElementById('escenario');
            const cantidadEscarcha = 150; 
            for (let i = 0; i < cantidadEscarcha; i++) {
                let particula = document.createElement('div');
                particula.className = 'escarcha';
                particula.style.width = particula.style.height = `${Math.random() * 1.5 + 1}px`;
                particula.style.left = `${Math.random() * 100}vw`;
                particula.style.animationDuration = `${Math.random() * 12 + 8}s, 2s`; 
                particula.style.animationDelay = `-${Math.random() * 20}s, -${Math.random() * 2}s`;
                escenario.appendChild(particula);
            }

            const cantidadEstrellas = 40;
            const direcciones = ['deriva-izq', 'deriva-der', 'deriva-fuerte-izq', 'deriva-fuerte-der'];
            for (let i = 0; i < cantidadEstrellas; i++) {
                let estrella = document.createElement('div');
                estrella.className = `estrella-cayendo ${direcciones[Math.floor(Math.random() * direcciones.length)]}`;
                estrella.style.width = estrella.style.height = `${Math.random() * 10 + 8}px`;
                estrella.style.left = `${Math.random() * 100}vw`;
                estrella.style.animationDuration = `${Math.random() * 10 + 15}s`;
                estrella.style.animationDelay = `-${Math.random() * 25}s`;
                escenario.appendChild(estrella);
            }

            const cantidadPalabras = 15;
            const estilosTexto = ['texto-tenue', 'texto-tenue', 'texto-claro'];
            for (let i = 0; i < cantidadPalabras; i++) {
                let palabra = document.createElement('div');
                palabra.innerText = "Name";
                palabra.className = `palabra-cayendo ${direcciones[Math.floor(Math.random() * direcciones.length)]} ${estilosTexto[Math.floor(Math.random() * estilosTexto.length)]}`;
                palabra.style.fontSize = `${Math.random() * 10 + 12}px`;
                palabra.style.left = `${Math.random() * 100}vw`;
                palabra.style.animationDuration = `${Math.random() * 10 + 15}s`;
                palabra.style.animationDelay = `-${Math.random() * 25}s`;
                escenario.appendChild(palabra);
            }
			
// ANUL CURENT
document.getElementById("year").textContent =
    new Date().getFullYear();

        });
