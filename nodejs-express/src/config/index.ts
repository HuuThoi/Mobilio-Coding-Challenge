import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production' ? '.env.pro' : '.env.dev';
dotenv.config({ path: envFile });

// Mapper for environment variables
const {
  PORT,
  NODE_ENV,
  CORS_URL,
  LOG_DIR,
  CONTENT_CACHE_DURATION_MILLIS,
} = process.env;

export const port = PORT || 8080;
export const environment = NODE_ENV;

export const corsUrl = CORS_URL;

export const logDirectory = LOG_DIR;

export const caching = {
  contentCacheDuration: parseInt(
    CONTENT_CACHE_DURATION_MILLIS || '600000',
  ),
};
