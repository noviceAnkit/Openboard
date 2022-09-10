const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("listening to port" + port);
});

let io = socket(server);

io.on("connection", (socket) => {
    console.log("connection established");
    //received data
    socket.on("beginPath", (data) => {
        //transfer to all connections
        io.sockets.emit("beginPath", data);
    });
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    });
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    });
});
