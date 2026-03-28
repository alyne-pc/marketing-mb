function validateEnv() {
  const required = [
    'JWT_SECRET',
    'DATABASE_URL',
    'EMAIL_USER',
    'EMAIL_PASSWORD',
  ];

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error('[ENV] Missing required environment variables:', missing);
    console.error('[ENV] Available env vars:', Object.keys(process.env).filter(k => k.startsWith('JWT_') || k.startsWith('DATABASE_') || k.startsWith('EMAIL_') || k.startsWith('ADMIN_') || k.startsWith('MARKETING_')));
  }
}

validateEnv();

export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@example.com",
  marketingEmail: process.env.MARKETING_EMAIL ?? "marketing@example.com",
  emailHost: process.env.EMAIL_HOST ?? "smtp.gmail.com",
  emailPort: parseInt(process.env.EMAIL_PORT ?? "587"),
  emailSecure: process.env.EMAIL_SECURE === "true",
  emailUser: process.env.EMAIL_USER ?? "",
  emailPassword: process.env.EMAIL_PASSWORD ?? "",
};
