import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db.server";
import { passkey } from "better-auth/plugins/passkey"

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    appName:"ghodwa-dsahboard",
    emailAndPassword:{
        
        enabled:true,
        autoSignIn:true,

    },
    plugins:[passkey({rpID:"localhost",rpName:"ghodwa dashboard",origin:"http://localhost:3000"})]

});