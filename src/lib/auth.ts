import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from environment variables");
}

const client = new MongoClient(mongoUri);
const db = client.db("News-Orbit");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // নতুন: user-এর অতিরিক্ত ব্যক্তিগত তথ্য
  user: {
    additionalFields: {
      phone: { type: "string", required: false },
      birthDate: { type: "string", required: false },
      address: { type: "string", required: false },
      bio: { type: "string", required: false },
    },
  },

  trustedOrigins: [
    "http://localhost:3000",
    "https://newsorbit-nu.vercel.app",
  ],
});