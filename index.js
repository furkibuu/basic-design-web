const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidV4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public")); 


app.get("/", (req, res) => {
    const newRoomId = uuidV4(); 
    res.render("index", {  }); 
});



app.get("/create-server", (req, res) => {
    res.render("sunucucreate");
  });

  app.post("/create-server", (req, res) => {
    const serverName = req.body.serverName || "Yeni Sunucu";
    const serverId = uuidV4();
    res.redirect(`/server/${serverId}?name=${encodeURIComponent(serverName)}`);
  });
  

  app.get("/server/:id", (req, res) => {
    const serverName = req.query.name || "Varsayılan Sunucu"; 
    const serverId = req.params.id;
    res.render("serverDetails", { serverName, serverId });
  });
  


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
