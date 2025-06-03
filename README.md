# ⚡ EV Charging Station Management App

A Full-Stack application to manage and visualize EV (Electric Vehicle) Charging Stations with **Authentication**, **Map Integration**, **Filters**, and **Deployment**.

This assignment was built using **Node.js, Express, MongoDB (Mongoose)** on the backend, and **React + Leaflet** on the frontend (Note: Originally Vue.js was mentioned, but React was chosen for flexibility and speed).


## 📁 Folder Structure

├── backend/ # Node.js + Express + MongoDB Backend
├── frontend/ # React + Leaflet Frontend
└── README.md # Project Documentation


## 🎯 Project Objective

Build a fully functional full-stack application with:

- ✅ Node.js & Express REST API
- ✅ JWT Authentication (Login / Signup)
- ✅ CRUD operations for charging stations
- ✅ MongoDB Database
- ✅ Protected Routes
- ✅ Frontend UI for interaction
- ✅ Map integration using Leaflet (OpenStreetMap)
- ✅ Deployed on cloud (Vercel & Render)

## 🚀 Tech Stack

| Part         | Tech Used                         |
|--------------|-----------------------------------|
| Backend      | Node.js, Express.js, MongoDB, JWT |
| Frontend     | React.js, React Leaflet           |
| Map API      | OpenStreetMap + Leaflet.js        |
| Deployment   | Render (Backend), Vercel (Frontend) |

## 🔐 Backend Features (`/backend`)

### 📦 APIs (Protected with JWT)

| Method | Endpoint                           | Description                      |
|--------|------------------------------------|----------------------------------|
| POST   | `/api/auth/register`               | Register a new user              |
| POST   | `/api/auth/login`                  | Login user, returns JWT token    |
| POST   | `/api/charging-station/create`     | Create a new charging station    |
| GET    | `/api/charging-station/get-all`    | List all stations                |
| PUT    | `/api/charging-station/update/:id` | Update a charging station        |
| DELETE | `/api/charging-station/delete/:id` | Delete a station                 |

### 🔒 Authentication (JWT)

- Protected routes using `verifyToken` middleware.
- Password hashing with `bcrypt`.
- Token stored on client-side (localStorage).

### ⚡ Charging Station Schema

{
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: String, // Active / Inactive
  powerOutput: String,
  connectorType: String
}
💻 Frontend Features (/frontend)
