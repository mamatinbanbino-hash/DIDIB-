const player = new Audio();
let currentIdx = 0;
let isPlaying = false;
let filteredSongs = [];

// --- BASE DE DONNÉES : AJOUTE TOUS TES SONS ICI ---
const discography = [
    { titre: "En Haut", album: "History", img: "pochettes/history.jpg", file: "musique/enhaut.mp3" },
    { titre: "Tala", album: "Mojo Trone", img: "pochettes/mojotron.jpg", file: "musique/tala.mp3" },
    { titre: "Azalakapinhou", album: "Classique", img: "pochettes/classic.jpg", file: "musique/classic.mp3" },
    { titre: "Prouver", album: "History", img: "pochettes/history.jpg", file: "musique/prouver.mp3" }
    // Ajoute les autres sons ici...
];

filteredSongs = [...discography];
const container = document.getElementById('container');

// Génère la liste visuelle
function genererListe(songs) {
    container.innerHTML = "";
    songs.forEach((son, i) => {
        const div = document.createElement('div');
        div.className = "song-card";
        div.onclick = () => lancerSon(i, songs);
        div.innerHTML = `
            <img src="${son.img}" onerror="this.src='pochettes/default.jpg'">
            <div class="song-info">
                <b>${son.titre}</b>
                <span>${son.album}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

// Fonction de recherche
function filtrer() {
    const val = document.getElementById('search').value.toLowerCase();
    filteredSongs = discography.filter(s => 
        s.titre.toLowerCase().includes(val) || s.album.toLowerCase().includes(val)
    );
    genererListe(filteredSongs);
}

// Lancement d'un morceau
function lancerSon(i, list) {
    currentIdx = i;
    const s = list[i];
    document.getElementById('now-playing').innerText = `LECTURE : ${s.titre.toUpperCase()}`;
    player.src = s.file;
    player.play();
    isPlaying = true;
    document.getElementById('pBtn').innerText = "⏸";
}

// Play / Pause
function playPause() {
    if (!player.src) return;
    if (isPlaying) {
        player.pause();
        document.getElementById('pBtn').innerText = "▶";
    } else {
        player.play();
        document.getElementById('pBtn').innerText = "⏸";
    }
    isPlaying = !isPlaying;
}

function next() {
    currentIdx = (currentIdx + 1) % filteredSongs.length;
    lancerSon(currentIdx, filteredSongs);
}

function prev() {
    currentIdx = (currentIdx - 1 + filteredSongs.length) % filteredSongs.length;
    lancerSon(currentIdx, filteredSongs);
}

// Barre de progression
player.ontimeupdate = () => {
    if (player.duration) {
        const p = (player.currentTime / player.duration) * 100;
        document.getElementById('progress').style.width = p + "%";
    }
};

// Clic sur la barre pour avancer/reculer
document.getElementById('p-cont').onclick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    player.currentTime = (x / rect.width) * player.duration;
};

// Lecture automatique du suivant
player.onended = () => next();

// Au chargement
window.onload = () => genererListe(discography);
