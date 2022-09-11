import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string | string[];
};

export default function handlerError(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { message = "Algo salio mal" } = req.query;

  res.status(200).json({
    message,
  });
}
