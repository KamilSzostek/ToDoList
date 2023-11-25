import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { decrypt } from "@/helpers/dataEncryption";

export const authOptions = {
  session: {
    maxAge: 14 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const client = await MongoClient.connect(`${process.env.MONGODB_CONNECTION_STRING}`
          );
          const users = client?.db().collection("ToDoUsers");
          const result = await users.findOne({
            login: credentials.login,
          });
          if (!result) {
            client.close();
            throw new Error("User didn't found with that login");
          }
          if (
            decrypt(result.password, `${process.env.CRYPTO_SECRET}`) !==  credentials.password
          ) {
            client.close();
            throw new Error("Password doesn't match.");
          }
          client.close();
          return {
            id: result._id.toString(),
            email: "",
            name: result.login,
            image: "",
          };
        } else return {login: '', id: ''};
      },
    }),
  ],
};

export default NextAuth(authOptions);
