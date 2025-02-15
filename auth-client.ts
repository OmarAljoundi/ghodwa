import { passkeyClient } from "better-auth/plugins/passkey";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [passkeyClient()],
});

export const { signIn, signUp, useSession } = createAuthClient();
