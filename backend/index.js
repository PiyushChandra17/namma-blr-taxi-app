const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000

let taxiSocket = null
let passengerSocket = null

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("taxiRequest", taxiRoute => {
      passengerSocket = socket;
      console.log("Someone wants a taxi!");
      if (taxiSocket !== null) {
        taxiSocket.emit("taxiRequest", taxiRoute);
      }
    });
  
    socket.on("driverLocation", driverLocation => {
      console.log(driverLocation);
      passengerSocket.emit("driverLocation", driverLocation);
    });
  
    socket.on("passengerRequest", () => {
      console.log("Someone wants a passenger!");
      taxiSocket = socket;
    });
  });

server.listen(port, () => console.log("server running on port " + port))