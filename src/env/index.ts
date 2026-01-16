import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  HOST: z.string().default('0.0.0.0'),
  PORT: z.string().default('3030'),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const err = z.treeifyError(_env.error).properties;
  console.error('Invalid environment variables!', err);
  throw new Error('Invalid enviroment variables!');
}

export const env = _env.data;
