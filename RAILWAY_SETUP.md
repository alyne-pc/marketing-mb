# Mission Brasil - Railway Deployment Guide

This application is now fully independent and ready for Railway deployment. All Manus dependencies have been removed.

## Environment Variables Required

Add these environment variables to your Railway project:

```
# Database
DATABASE_URL=mysql://user:password@host:port/database

# JWT Secret (generate a random string)
JWT_SECRET=your-random-secret-key-here

# Email Configuration (Gmail or your email service)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Application Settings
ADMIN_EMAIL=alyne.carvalho@missionbrasil.com.br
MARKETING_EMAIL=marketing@missionbrasil.com.br

# Optional: Application Info
VITE_APP_TITLE=Mission Brasil - Portal de Solicitação
```

## Setup Steps

1. **Create Railway Project**
   - Go to railway.app
   - Create a new project
   - Connect your GitHub repository

2. **Add Environment Variables**
   - Go to Settings → Variables
   - Add all the variables listed above
   - Make sure DATABASE_URL is correctly configured

3. **Deploy**
   - Railway will automatically build and deploy
   - Generate a public domain in Settings → Networking
   - Your app will be available at: `https://your-project.up.railway.app`

## Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Database Setup

The application uses MySQL/TiDB. Make sure your DATABASE_URL is set correctly.

Migration is handled automatically on first run.

## Authentication

The app now uses email/password authentication instead of Manus OAuth:

- **Register**: POST `/api/auth/register`
- **Login**: POST `/api/auth/login`
- **Logout**: POST `/api/auth/logout`

## Email Notifications

The app uses Nodemailer to send emails. Configure your email service:

- **Gmail**: Use App Passwords (not your regular password)
- **Other Services**: Update EMAIL_HOST and EMAIL_PORT accordingly

## Troubleshooting

If you see "Missing required environment variables":
1. Check that all variables are added in Railway Settings
2. Click "Redeploy" (not "Restart") to apply changes
3. Wait 2-3 minutes for the new deployment

If emails aren't sending:
1. Check EMAIL_USER and EMAIL_PASSWORD are correct
2. For Gmail, make sure you're using an App Password
3. Check the logs: `railway logs`

## Support

For issues, check the Railway logs or contact your administrator.
