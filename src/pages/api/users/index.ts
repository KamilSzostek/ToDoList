import { encrypt } from "@/helpers/dataEncryption";
import { connectDataBase } from "@/helpers/dbConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { login, password } = req.body;
    const client = await connectDataBase(res);
    try{
        await client
          ?.db()
          .collection("ToDoUsers")
          .insertOne({
            login: login,
            password: encrypt(password, process.env.CRYPTO_SECRET!),
          });
          res.status(200).json({
            message: 'User created',
            status: true
          })
    }
    catch(err){
        res.status(421).json({message: err || 'Unhadled operation'})
    }
  }
}
