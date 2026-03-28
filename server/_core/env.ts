function validateEnv() {
  const required = [
    'VITE_APP_ID',
    'JWT_SECRET',
    'DATABASE_URL',
    'OAUTH_SERVER_URL',
    'OWNER_OPEN_ID',
    'BUILT_IN_FORGE_API_URL',
    'BUILT_IN_FORGE_API_KEY',
  ];

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error('[ENV] Missing required environment variables:', missing);
    console.error('[ENV] Available env vars:', Object.keys(process.env).filter(k => k.startsWith('VITE_') || k.startsWith('OAUTH_') || k.startsWith('JWT_') || k.startsWith('DATABASE_') || k.startsWith('OWNER_') || k.startsWith('BUILT_IN_')));
  }
}

validateEnv();

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  marketingEmail: process.env.MARKETING_EMAIL ?? "",
  emailHost: process.env.EMAIL_HOST ?? "smtp.gmail.com",
  emailPort: parseInt(process.env.EMAIL_PORT ?? "587"),
  emailSecure: process.env.EMAIL_SECURE === "true",
  emailUser: process.env.EMAIL_USER ?? "",
  emailPassword: process.env.EMAIL_PASSWORD ?? "",
};
