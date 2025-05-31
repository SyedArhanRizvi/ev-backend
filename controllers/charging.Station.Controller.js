import EVStationModel from "../models/ev.Station.Model.js";
import UserModel from "../models/user.Model.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const getAllChargingStationHandler = async () => {
  try {
    const allEVStations = await EVStationModel.find({});
    if (!allEVStations) {
      return res
        .status(200)
        .json({ message: "Oops No EV Stations Registered !!" });
    }
    return res.status(200).json({ allEVStations });
  } catch (error) {
    console.log(
      "There are some err in getAllChargingStationHandler plz fix the bug first ",
      error
    );
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export const addNewChargingStationHandler = async (req, res) => {
  const token = req.cookies?.token;
  const { name, lat, lng, status, powerOutput, connectorType } = req.body;
  if (!name || !lat || !lng || !status || !powerOutput || !connectorType) {
    console.log(name, lat, lng, status, powerOutput, connectorType);
    return res.status(404).json({ message: "All fields are required." });
  }
  if (!token) {
    return res.status(401).json({ message: "Please login or create account." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const location = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    const newEVStation = await EVStationModel.create({
      name,
      location,
      status,
      powerOutput,
      connectorType,
    });
    return res
      .status(201)
      .json({ message: "New ev station added successfully!!", newEVStation });
  } catch (error) {
    console.log(
      "There are some err in addNewChargingStationHandler plz fix the bug first ",
      error
    );
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export const deleteChargingStationHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log(id);
    return res.status(404).json({ message: "EV Station Key is required." });
  }
  try {
    await EVStationModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "EV Station deleted successfully." });
  } catch (error) {
    console.log(
      "There are some err in deleteChargingStationHandler plz fix the bug first ",
      error
    );
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export const updatePrevChargingStationHandler = async () => {
  const { id } = req.params;
  const token = req.cookies?.token;
  const { name, lat, lng, status, powerOutput, connectorType } = req.body;
  if (!name || !lat || !lng || !status || !powerOutput || !connectorType || !id) {
    console.log(name, lat, lng, status, powerOutput, connectorType, id);
    return res.status(404).json({ message: "All fields are required." });
  }
  if (!token) {
    return res.status(401).json({ message: "Please login or create account." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const location = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    const updatedStation = await EVStationModel.findByIdAndUpdate(id, {
      name,
      location,
      status,
      powerOutput,
      connectorType,
    });
    return res
      .status(201)
      .json({ message: "New ev station added successfully!!", updatedStation });
  } catch (error) {
    console.log(
      "There are some err in updatePrevChargingStationHandler plz fix the bug first ",
      error
    );
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export const getSingleChargingStationLocationHandler = async () => {
  try {
  } catch (error) {}
};
