import { connectDataBase } from "@/helpers/dbConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { login } = req.query;
  if (req.method === "GET") {
    const client = await connectDataBase(res);
    try {
      const user = await client?.db().collection("ToDoUsers").findOne({
        login: login,
      });
      client?.close();
      user
        ? res.status(200).json({
            _id: user._id,
            login: user?.login,
          })
        : res.status(400).json({ message: "User not found", status: true });
    } catch (err) {
      res.status(421).json({ message: err || "Unhadled operation" });
    }
  }
  if (req.method === "PUT") {
    const { tasks } = req.body;
    const client = await connectDataBase(res);
    try {
      const user = await client
        ?.db()
        .collection("ToDoUsers")
        .findOneAndUpdate(
          {
            login: login,
          },
          { $set: { tasks: tasks } }
        );
      user
        ? res.status(201).json({ message: "Tasks updated" })
        : res.status(404).json({ message: "User not found", status: true });
    } catch (err) {
      res.status(421).json({ message: err || "Unhadled operation" });
    }
  }
}
