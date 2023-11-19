import { connectDataBase } from "@/helpers/dbConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { login } = req.query;
    const client = await connectDataBase(res);
    try {
      const user = await client?.db().collection("ToDoUsers").findOne({
        login: login,
      });
      user ? res.status(200).json({
        login: user?.login 
      })
      : res.status(400).json({message: 'User not found', status: true});
    } catch (err) {
      res.status(421).json({ message: err || "Unhadled operation" });
    }
  }
}
