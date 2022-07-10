import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectSocket from "./socket/connection";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectSocket(io);

server.listen(4000, () => console.log("Server running..."));
