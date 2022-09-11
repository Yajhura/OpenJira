import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { EntryModel } from "../../database/Models";

type Data = {
  messsage: string;
};

export default async function hadler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production")
    return res
      .status(404)
      .json({ messsage: "No tiene servicio a este endpoint" });

  await db.ConnectDb();

  await EntryModel.deleteMany({});
  await EntryModel.insertMany(seedData.entries)

  await db.DisconnectDb();

  res.status(200).json({ messsage: "Proceso realizado correctamente" });
}
