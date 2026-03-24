const audio = new Audio();
let isPlaying = false;
let currentIdx = 0;

// BASE DE DONNÉES DES SONS (À COMPLÉTER ICI)
const playlist = [
    { title: "En Haut", album: "History", file: "audio/enhaut.mp3", lyrics: [{t:0, m:"Didi B..."}, {t:5, m:"On est en haut!"}] },
    { title: "Tala", album: "Mojo Trone", file: "audio/tala.mp3", lyrics: [{t:2, m:"Tala tala..."}, {t:8, m:"Regarde le succès"}] },
    { title: "Azalakapinhou", album: "Ancien", file: "audio/ancien1.mp3", lyrics: [{t:1, m:"Le commencement"}] }
    // Ajoute tes 100+ morceaux ici sur le même format
];

function loadTrack(idx) {
    const track = playlist[idx];
    document.getElementById('title').innerText = track.title;
    document.getElementById('album').innerText = track.album;
    audio.src = track.file;
    audio.load();
}

function toggle() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playBtn').innerText = "▶";
    } else {
        audio.play();
        document.getElementById('playBtn').innerText = "⏸";
    }
    isPlaying = !isPlaying;
}

audio.ontimeupdate = () => {
    const prog = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').style.width = prog + "%";
    
    // Synchro paroles
    const track = playlist[currentIdx];
    const line = track.lyrics.find((l, i) => audio.currentTime >= l.t && (!track.lyrics[i+1] || audio.currentTime < track.lyrics[i+1].t));
    if (line) document.getElementById('lyricBox').innerText = line.m;
};

function next() {
    currentIdx = (currentIdx + 1) % playlist.length;
    loadTrack(currentIdx);
    if(isPlaying) audio.play();
}

function prev() {
    currentIdx = (currentIdx - 1 + playlist.length) % playlist.length;
    loadTrack(currentIdx);
    if(isPlaying) audio.play();
}

function seek(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    audio.currentTime = (x / rect.width) * audio.duration;
}

audio.onended = () => next();
window.onload = () => loadTrack(0);
