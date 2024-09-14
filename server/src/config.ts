import { config as dotEnvConfig } from 'dotenv';

const pathToEnv = __dirname + '/../.env';

dotEnvConfig({ path: pathToEnv });

const config = {
  NODE_ENV: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME || 'auth-server',
    version: process.env.APP_VERSION || '1.1.0',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    baseURL: process.env.APP_BASE_URL || '/api',
  },
  sentry: {
    dsn: '',
    environment: '',
  },
  database: {
    client: process.env.DB_CLIENT,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8',
    timezone: 'UTC',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRESIN || '50m',
    },
    refreshTokenSignOptions: {
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN || '7d',
      algorithm: 'HS256',
    },
  },
  cookie: {
    options: {
      domain: process.env.COOKIE_DOMAIN,
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + parseInt(process.env.COOKIE_DURATION)),
    },
  },
} as const;

export default config;
