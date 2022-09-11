import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db, EntryModel, IEntry } from "../../../database";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handlre(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: `El id ${id} no es valido` });

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no soportado" + req.method });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.ConnectDb();

  const entry = await EntryModel.findById(id);
  if (!entry) return res.status(400).json({ message: "Entry no encontrada" });

  const { description = entry.description, status = entry.status } = req.body;

  try {
    const entryNew = await EntryModel.findByIdAndUpdate(
      id,
      { description, status },
      {
        new: true,
        runValidators: true,
      }
    );

    await db.DisconnectDb();

    return res.status(200).json(entryNew!);
  } catch (error: any) {
    await db.DisconnectDb();
    console.log(error);
    return res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.ConnectDb();
  try {
    const entry = await EntryModel.findById(id);
    await db.DisconnectDb();
    console.log(entry);

    if (!entry)
      return res
        .status(400)
        .json({ message: `El entry con id ${id} no se ha encontrado` });

    return res.status(200).json(entry!);
  } catch (error: any) {
    await db.DisconnectDb();
    console.log(error);
    return res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.ConnectDb();
    const entry = await EntryModel.findByIdAndDelete(id);
    await db.DisconnectDb();
    console.log(entry);

    if (!entry)
      return res
        .status(400)
        .json({ message: `El entry con id ${id} no se ha encontrado` });

    return res.status(200).json({ message: `Ha sido  eliminado el entry` });
  } catch (error: any) {
    await db.DisconnectDb();
    console.log(error);
    return res.status(400).json({ message: error.errors.status.message });
  }
};
