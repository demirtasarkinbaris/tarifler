# Setup Instructions

## Complete Setup Guide

This document provides detailed setup instructions for the Tarifler Recipe Website.

## Requirements

### System Requirements
- **OS**: Linux, macOS, or Windows
- **RAM**: 2GB minimum
- **Disk Space**: 500MB free

### Software Requirements
- **Node.js**: v16.0.0 or higher ([Download](https://nodejs.org))
- **PostgreSQL**: v12 or higher ([Download](https://www.postgresql.org/download))
- **npm**: v7 or higher (comes with Node.js)
- **Git** (optional, for version control)

## 1️⃣ Prerequisites Setup

### Install Node.js

**macOS (using Homebrew):**
```bash
brew install node
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install nodejs npm
```

**Windows:**
- Download installer from https://nodejs.org
- Run installer and follow prompts

**Verify installation:**
```bash
node --version    # Should be v16 or higher
npm --version     # Should be v7 or higher
```

### Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

**Windows:**
- Download installer from https://www.postgresql.org/download/windows/
- Run installer, remember the password you set
- PostgreSQL should start automatically

**Verify installation:**
```bash
psql --version    # Should show PostgreSQL version
```

## 2️⃣ Database Setup

### Create Database and User

Open PostgreSQL terminal:

**macOS/Linux:**
```bash
sudo -u postgres psql
```

**Windows (use pgAdmin or PostgreSQL command prompt):**
```bash
psql -U postgres
```

Once in the PostgreSQL shell:

```sql
CREATE DATABASE tarifler_db;
\q
```

Or for development with a custom user:

```sql
CREATE USER tarifler_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE tarifler_db OWNER tarifler_user;
\q
```

**Verify:**
```bash
psql -l | grep tarifler_db
```

## 3️⃣ Backend Setup

### Navigate and Install

```bash
cd backend
npm install
```

### Configure Environment

The `.env` file is already configured with default settings:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tarifler_db"
CLIENT_URL="http://localhost:5173"
PORT=5000
```

**If you created a custom user**, update DATABASE_URL:
```env
DATABASE_URL="postgresql://tarifler_user:your_password@localhost:5432/tarifler_db"
```

### Initialize Database

```bash
# Generate Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:migrate
```

When prompted:
```
? Enter a name for the new migration: init
```

### Seed with Example Data

```bash
npm run prisma:seed
```

This creates:
- 8 Turkish cuisine categories
- 3 example recipes with ingredients
- 15 sample ingredients

### Start Backend Server

```bash
npm run dev
```

You should see:
```
Server running on http://localhost:5000
```

✅ Backend is ready!

## 4️⃣ Frontend Setup (New Terminal)

### Navigate and Install

```bash
cd frontend
npm install
```

### Configure Environment

The `.env` file is already configured:

```env
VITE_API_URL=http://localhost:5000/api
```

No changes needed unless your backend runs on a different port.

### Start Frontend Server

```bash
npm run dev
```

You should see:
```
vite v5.0.8 build 1.2.3
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

✅ Frontend is ready!

## 5️⃣ Access the Application

### Homepage
Open browser and visit: **http://localhost:5173**

You should see:
- 🍳 Tarifler logo
- Search bar
- 8 category cards
- Featured recipes
- Latest recipes

### Browse Recipes
- Click any recipe card to view details
- Watch embedded YouTube videos
- See ingredients and instructions
- View category information

### Manage Content
Visit: **http://localhost:5173/admin**

Admin Panel Features:
- **Recipes Tab**: Create, edit, delete recipes
- **Categories Tab**: Manage categories
- Real-time database updates

## 📊 Verify Setup

Check that everything is working:

### Backend Health Check
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK"}
```

### API Endpoints
```bash
# Get all categories
curl http://localhost:5000/api/categories

# Get all recipes
curl http://localhost:5000/api/recipes
```

### Database Connection
From backend directory:
```bash
npm run prisma:migrate status
```

## 🐳 Docker Setup (Alternative)

For easier deployment without manual PostgreSQL setup:

### Using Docker Compose

1. Install Docker and Docker Compose
2. Create `docker-compose.yml` in root directory:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: tarifler_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/tarifler_db"
      CLIENT_URL: "http://localhost:5173"
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: "http://localhost:5000/api"
    depends_on:
      - backend

volumes:
  postgres_data:
```

3. Run:
```bash
docker-compose up
```

## 🚀 Production Setup

### Build Frontend
```bash
cd frontend
npm run build
```

Output in `frontend/dist/` ready for deployment.

### Deploy Backend
```bash
cd backend
npm run build
npm start
```

### Environment Variables for Production

**Backend (.env):**
```env
DATABASE_URL="postgresql://user:password@production-db:5432/tarifler_db"
CLIENT_URL="https://yourdomain.com"
PORT=5000
NODE_ENV=production
```

**Frontend (.env):**
```env
VITE_API_URL="https://api.yourdomain.com"
```

## ✅ Checklist

- [ ] Node.js installed (v16+)
- [ ] PostgreSQL installed and running
- [ ] Database `tarifler_db` created
- [ ] Backend dependencies installed
- [ ] Backend migrations ran
- [ ] Backend seeded with data
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 5173
- [ ] Browser shows homepage
- [ ] Can view a recipe
- [ ] Can access admin panel

## 🆘 Troubleshooting

### PostgreSQL Connection Error

**Error:** `could not connect to server`

**Solution:**
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start

# Or using Homebrew (macOS)
brew services start postgresql
```

### Port Already in Use

**Error:** `EADDRINUSE :::5000` or `:::5173`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Prisma Migration Error

**Error:** `Prisma schema not found`

**Solution:**
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate dev
```

### Cannot Find Module

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Ensure node_modules is installed
npm install

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

**Error:** `Access to XMLHttpRequest has been blocked`

**Solution:**
- Check `CLIENT_URL` in backend `.env` matches frontend URL
- Ensure CORS middleware is enabled in `backend/src/server.js`
- Frontend and backend must be on different ports for development

### API Returns 404

**Error:** `GET /api/recipes 404 Not Found`

**Solution:**
- Check backend is running on correct port
- Verify `VITE_API_URL` in frontend `.env`
- Ensure routes are properly defined in `backend/src/routes/`

## 📞 Support

For additional help:
1. Check main [README.md](./README.md)
2. Check [QUICKSTART.md](./QUICKSTART.md)
3. Review error messages carefully
4. Check browser console for frontend errors
5. Check terminal output for backend errors

## 🔄 Regular Development Commands

### Backend Development
```bash
cd backend
npm run dev                    # Start dev server with auto-reload
npm run prisma:migrate        # Create new migration
npm run prisma:seed           # Repopulate database
```

### Frontend Development
```bash
cd frontend
npm run dev                    # Start dev server with hot reload
npm run build                  # Build for production
npm run preview               # Preview production build
```

### Database Management
```bash
# Backup database
pg_dump tarifler_db > backup.sql

# Restore database
psql tarifler_db < backup.sql

# Connect to database directly
psql -d tarifler_db -U postgres
```

## 💻 IDE Setup (Optional)

### Recommended VSCode Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code Formatter
- TailwindCSS IntelliSense
- Prisma
- Thunder Client (for API testing)

### VSCode Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

**Setup complete! 🎉**

Now visit http://localhost:5173 and start using your recipe website!
