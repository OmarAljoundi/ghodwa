import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client/client';

const adapter = new PrismaPg(
  {
    connectionString: process.env.DATABASE_URL,
  },
  { schema: 'ghodwa' },
);
const db = new PrismaClient({ adapter });

export { db };
