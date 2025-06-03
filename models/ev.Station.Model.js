import { model, Schema } from "mongoose";

const EVStationSchema = new Schema(
  {
    name: {
        type:String,
        required:true
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: {
        type:String,
        default:"Inactive",
        required:true
    },
    powerOutput: {
        type:String,
        required:true
    },
    connectorType: {
        type:String,
        required:true
    },
  },
  { timestamps: true }
);

const EVStationModel = model("EVStationModel", EVStationSchema);
export default EVStationModel;