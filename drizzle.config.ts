import type { Config } from 'drizzle-kit';

if (!process.env.POSTGRES_URL) {
  throw new Error('Missing POSTGRES_URL');
}

const nonPoolingUrl = process.env.POSTGRES_URL.replace(':6543', ':5432');

export default {
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: { url: nonPoolingUrl },
  casing: 'snake_case',
} satisfies Config;
