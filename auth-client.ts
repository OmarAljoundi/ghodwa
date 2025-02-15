import { passkeyClient } from "better-auth/plugins/passkey";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [passkeyClient()],
});

export const { signIn, signUp, useSession } = createAuthClient();
