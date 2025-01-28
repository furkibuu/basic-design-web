const socket = io("/");
const videoGrid = document.getElementById("video-grid");

// WebRTC bağlantısı için
const myPeer = new Peer(undefined, {
    host: "/",
    port: "3001",
});

myPeer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
});

socket.on("user-connected", (userId) => {
    console.log("Yeni kullanıcı bağlandı: " + userId);
});

// Kullanıcı ekran paylaşımı
document.getElementById("share-screen").addEventListener("click", async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
    });
    console.log("Ekran paylaşımı başladı!");
});
