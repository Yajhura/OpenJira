import mongoose, { Model } from "mongoose";
import { Entry } from "../../src/interface";


export interface IEntry extends Entry {}

const EntrySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Pendiente", "En Progreso", "Completado"],
        message:
          "El estado debe ser Pendiente, En Progreso o Completado, no {VALUE}",
      },
      default: "Pendiente",
    },

    createdAt: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model("Entry", EntrySchema);


export default EntryModel;