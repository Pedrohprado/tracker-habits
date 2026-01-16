import { PrismaClient } from '@prisma/client/extension.js';
import { env } from '../env/index.js';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});

//this log confif set to see query logs in console, but this work just in dev mode
