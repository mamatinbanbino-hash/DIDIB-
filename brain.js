const audio = new Audio();
let isPlaying = false;
let currentIdx = 0;

// BASE DE DONNÉES DISCOGRAPHIE (Mets tes liens d'images et de sons ici)
const discography = [
    { title: "En Haut", album: "History", file: "audio/enhaut.mp3", img: "img/history.jpg" },
    { title: "Tala", album: "Mojo Trone", file: "audio/tala.mp3", img: "img/mojotron.jpg" },
    { title: "Azalakapinhou", album: "Classic", file: "audio/ancien.mp3", img: "img/classic.jpg" }
    // Ajoute TOUS tes sons sur ce modèle
];

const listContainer = document.getElementById('list');

// Génération automatique de la liste visuelle
function buildList() {
    discography.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'track-item';
        item.onclick = () => playTrack(index);
        item.innerHTML = `
            <img src="${track.img}" class="track-img">
            <div class="track-details">
                <h4>${track.title}</h4>
                <p>${track.album}</p>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function playTrack(idx) {
    currentIdx = idx;
    const track = discography[idx];
    document.getElementById('current-title').innerText = track.title;
    document.getElementById('current-art').src = track.img;
    audio.src = track.file;
    audio.play();
    isPlaying = true;
    document.getElementById('playBtn').innerText = "⏸";
}

function toggle() {
    if (isPlaying) { audio.pause(); document.getElementById('playBtn').innerText = "▶"; }
    else { audio.play(); document.getElementById('playBtn').innerText = "⏸"; }
    isPlaying = !isPlaying;
}

function next() {
    currentIdx = (currentIdx + 1) % discography.length;
    playTrack(currentIdx);
}

function prev() {
    currentIdx = (currentIdx - 1 + discography.length) % discography.length;
    playTrack(currentIdx);
}

audio.ontimeupdate = () => {
    const prog = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').style.width = prog + "%";
};

audio.onended = () => next();

window.onload = buildList;
