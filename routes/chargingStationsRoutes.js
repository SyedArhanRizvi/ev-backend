import { Router } from "express";
import { addNewChargingStationHandler, deleteChargingStationHandler, getAllChargingStationHandler, getSingleChargingStationLocationHandler, updatePrevChargingStationHandler } from "../controllers/charging.Station.Controller.js";

const chargingStationRoutes = Router();

chargingStationRoutes.post("/add-new-charging-station", addNewChargingStationHandler);
chargingStationRoutes.get("/get-all-charging-station", getAllChargingStationHandler);
chargingStationRoutes.delete("/delete-one-charging-station/:id", deleteChargingStationHandler);
chargingStationRoutes.put("/update-prev-charging-station/:id", updatePrevChargingStationHandler);
chargingStationRoutes.get("/get-single-charging-station-location/:id", getSingleChargingStationLocationHandler);

export default chargingStationRoutes;