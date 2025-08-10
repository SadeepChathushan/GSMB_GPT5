import { Server } from "socket.io";
let _io;
export function initIO(httpServer) {
  _io = new Server(httpServer, { cors: { origin: process.env.ORIGIN || "http://localhost:5173" } });
  _io.on("connection", (socket) => { socket.on("join", (room) => socket.join(room)); });
  console.log("Socket.IO initialized");
}
export function io() { if (!_io) throw new Error("Socket.IO not initialized"); return _io; }
