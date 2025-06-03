import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import cookieParser from "cookie-parser";
import chargingStationRoutes from "./routes/chargingStationsRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Include credentials if using cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});



mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    server.listen(PORT, () => {
      console.log("D.B Connected Successfully and hosted on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Some errors in D.B Connection", err);
  });

app.use("/api/auth", userAuthRoutes);
app.use("/api/charging-station", chargingStationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
