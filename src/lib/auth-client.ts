import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,

  plugins: [
   
    inferAdditionalFields({
      user: {
        phone: { type: "string", required: false },
        birthDate: { type: "string", required: false },
        address: { type: "string", required: false },
        bio: { type: "string", required: false },
      },
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;