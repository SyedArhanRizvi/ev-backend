import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/auth", userAuthRoutes);
app.use("/api/charging-station", chargingStationRoutes);