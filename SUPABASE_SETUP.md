# Supabase Setup Guide

## Prerequisites
1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Configuration Steps

1. **Get your Supabase credentials:**
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy your Project URL and anon/public key

2. **Create environment file:**
   - Create a `.env` file in the root of the project (same level as `package.json`)
   - Add the following variables:
   ```
   REACT_APP_SUPABASE_URL=your_project_url_here
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Example `.env` file:**
   ```
   REACT_APP_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Restart the development server:**
   - Stop the current server (Ctrl+C)
   - Run `npm start` again to load the new environment variables

## Authentication Features

The login system includes:
- Email/Password authentication
- User registration with email verification
- Session management
- Automatic redirect to user dashboard after login
- Logout functionality

## Notes
- Make sure `.env` is in your `.gitignore` file (it should be by default in React apps)
- Never commit your `.env` file to version control
- The anon key is safe to use in client-side code, but keep your service role key secret

