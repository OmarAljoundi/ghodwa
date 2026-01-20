import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from './db.server';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  appName: 'ghodwa-dsahboard',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [],
});
