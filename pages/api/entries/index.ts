import type { NextApiRequest, NextApiResponse } from "next";
import { db, EntryModel, IEntry } from "../../../database";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function TraerEntries(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no soportado" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.ConnectDb();

  const entries = await EntryModel.find({}).sort({ createdAt: "asc" });

  await db.DisconnectDb();

  return res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "", status } = req.body;

  const newEntry = new EntryModel({
    description: description,
    createdAt: Date.now(),
  });

  try {
    await db.ConnectDb();
    await newEntry.save();
    await db.DisconnectDb();

    return res.status(200).json(newEntry);
  } catch (error) {
    await db.DisconnectDb();
    console.log(error);
    return res.status(400).json({ message: "Error al agregar entry" });
  }
};
