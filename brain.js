const player = new Audio();
let currentIdx = 0;
let isPlaying = false;
let filteredSongs = [];

// --- TA VRAIE DISCOGRAPHIE ICI ---
// Ajoute CHAQUE son que tu as dans ton dossier "musique"
const discography = [
    { titre: "En Haut", album: "History", img: "pochettes/history.jpg", file: "musique/enhaut.mp3" },
    { titre: "Tala", album: "Mojo Trone", img: "pochettes/tala.mp3", file: "musique/tala.mp3" },
    { titre: "Azalakapinhou", album: "Classic", img: "pochettes/classic.jpg", file: "musique/classic.mp3" },
    { titre: "Prouver", album: "History", img: "pochettes/history.jpg", file: "musique/prouver.mp3" },
    { titre: "Shama", album: "Mojo Trone", img: "pochettes/shama.jpg", file: "musique/shama.mp3" },
    // CONTINUE LA LISTE ICI POUR TES 300 SONS...
];

filteredSongs = [...discography];
const container = document.getElementById('container');

function genererListe(songs) {
    container.innerHTML = "";
    if (songs.length === 0) {
        container.innerHTML = "<p style='text-align:center;color:#444;'>Aucun son trouvé</p>";
        return;
    }
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

function filtrer() {
    const val = document.getElementById('search').value.toLowerCase();
    filteredSongs = discography.filter(s => 
        s.titre.toLowerCase().includes(val) || s.album.toLowerCase().includes(val)
    );
    genererListe(filteredSongs);
}

function lancerSon(i, list) {
    currentIdx = i;
    const s = list[i];
    
    // Mise à jour visuelle
    document.getElementById('now-playing').innerText = `LECTURE : ${s.titre.toUpperCase()}`;
    
    // Chargement du fichier
    player.src = s.file;
    player.play().then(() => {
        isPlaying = true;
        document.getElementById('pBtn').innerText = "⏸";
    }).catch(err => {
        alert("Erreur : Le fichier " + s.file + " est introuvable dans ton dossier musique/");
    });
}

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

player.ontimeupdate = () => {
    if (player.duration) {
        const p = (player.currentTime / player.duration) * 100;
        document.getElementById('progress').style.width = p + "%";
    }
};

document.getElementById('p-cont').onclick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    player.currentTime = (x / rect.width) * player.duration;
};

player.onended = () => next();
window.onload = () => genererListe(discography);
