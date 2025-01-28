const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidV4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.urlencoded({ extended: true }));
// EJS Ayarları
app.set("view engine", "ejs");
app.use(express.static("public")); // CSS ve JS dosyaları için public klasörü

// Ana Sayfa - Oda Oluşturma
app.get("/", (req, res) => {
    const newRoomId = uuidV4(); // Sunucu tarafında bir oda ID'si oluştur
    res.render("index", {  }); // EJS'ye oda ID'sini gönder
});

/*// Oda Sayfası
app.get("/:room", (req, res) => {
    res.render("room", { roomId: req.params.room }); // room.ejs dosyasını göster ve oda ID'sini ilet
});

// Socket.IO ile Bağlantı
io.on("connection", (socket) => {
    console.log("Yeni bir kullanıcı bağlandı.");

    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId); // Kullanıcıyı odaya kat
        console.log(`Kullanıcı ${userId} odaya katıldı: ${roomId}`);

        socket.to(roomId).emit("user-connected", userId); // Diğer kullanıcılara bildir

        // Kullanıcı ayrıldığında
        socket.on("disconnect", () => {
            socket.to(roomId).emit("user-disconnected", userId);
            console.log(`Kullanıcı ayrıldı: ${userId}`);
        });
    });
});*/

app.get("/create-server", (req, res) => {
    res.render("sunucucreate");
  });

  app.post("/create-server", (req, res) => {
    const serverName = req.body.serverName || "Yeni Sunucu";
    const serverId = uuidV4();
    res.redirect(`/server/${serverId}?name=${encodeURIComponent(serverName)}`);
  });
  
  // Sunucu detay sayfası
  app.get("/server/:id", (req, res) => {
    const serverName = req.query.name || "Varsayılan Sunucu"; // Varsayılan değer
    const serverId = req.params.id;
    res.render("serverDetails", { serverName, serverId });
  });
  

// Sunucuyu başlat
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
