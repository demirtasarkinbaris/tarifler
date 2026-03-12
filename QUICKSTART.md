# 🚀 Quick Start Guide - Tarifler Recipe Website

Follow these steps to get the application running in 10 minutes!

## Prerequisites

Before starting, make sure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download)
- **npm** (comes with Node.js)

## Step 1: Create Database

Open PostgreSQL and create a new database:

```bash
createdb tarifler_db
```

Or using pgAdmin GUI:
1. Right-click on "Databases"
2. Click "Create" → "Database"
3. Name it `tarifler_db`
4. Click Save

## Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# You should see files: .env with database configuration

# Run database migrations (creates tables)
npm run prisma:migrate

# Seed database with example recipes
npm run prisma:seed

# Start the backend server
npm run dev
```

✅ Backend is running at `http://localhost:5000`

You should see: `Server running on http://localhost:5000`

## Step 3: Setup Frontend (in a new terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend is running at `http://localhost:5173`

You should see: `Port 5173 is in use, trying 5174`

## Step 4: Open in Browser

Visit: **http://localhost:5173**

You should see:
- 🍳 Tarifler homepage
- Category buttons (Hamur İşi, Tatlı, etc.)
- Featured recipes
- Recent recipes

## 🎯 Testing Features

### View a Recipe
1. Click on any recipe card
2. Watch the embedded YouTube video
3. See ingredients and instructions

### Browse by Category
1. Click a category in the top navigation
2. See all recipes in that category

### Admin Panel
1. Go to `http://localhost:5173/admin`
2. Login to manage recipes and categories
3. Create a new recipe
4. Add ingredients
5. Paste a YouTube URL

### Create a New Recipe

In Admin Panel:
1. Fill in recipe title: "Köfte Tarifi" (Meatballs)
2. Add description: "Lezzetli Türk köftesi"
3. Paste YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
4. Select category: "Ana Yemek"
5. Add ingredients:
   - 500g ground meat
   - 1 onion
   - 2 slices bread
6. Add instructions (step by step)
7. Click "Oluştur"

## ✅ Checklist

- [ ] PostgreSQL is running
- [ ] Database `tarifler_db` is created
- [ ] Backend is running on http://localhost:5000
- [ ] Frontend is running on http://localhost:5173
- [ ] Homepage loads with categories
- [ ] Can view a recipe with video
- [ ] Admin panel is accessible

## 🆘 Common Issues

### "Database connection refused"
```bash
# Check if PostgreSQL is running
# Mac: brew services list
# Linux: sudo service postgresql status
# Windows: Services → PostgreSQL → Start
```

### "npm: command not found"
- Install Node.js from https://nodejs.org

### "Port 5000/5173 already in use"
```bash
# Kill process using port (Linux/Mac)
lsof -i :5000
kill -9 <PID>
```

### "Prisma error after creating database"
```bash
# From backend directory
npm run prisma:migrate
npm run prisma:seed
```

## 📚 Next Steps

1. **Customize Data**: Edit `backend/src/seed.js` to add your own recipes
2. **Styling**: Edit `frontend/tailwind.config.js` to customize colors
3. **Add Images**: Upload recipe images and set `imageUrl` in recipes
4. **Deploy**: Follow deployment guide in main README.md

## 🎨 Example Categories

Pre-loaded with Turkish cuisine categories:
- Hamur İşi (Pastries & Bread)
- Tatlı (Desserts)
- Pilav (Rice Dishes)
- Çorba (Soups)
- Ana Yemek (Main Courses)
- Salata (Salads)
- Kahvaltılık (Breakfast)
- İçecek (Beverages)

## 🎥 YouTube Integration

Any YouTube URL is automatically converted to embedded player:
- Input: `https://youtube.com/watch?v=VIDEO_ID`
- Output: Embedded player on recipe page

Copy YouTube URLs from the address bar and paste directly!

## 💡 Pro Tips

1. **Add multiple recipes at once** in Admin Panel
2. **Use full step descriptions** for better instructions
3. **Add all ingredients** even if they seem obvious
4. **Test with different YouTube videos** to ensure player works
5. **Use descriptive category names** for better organization

## 📖 Full Documentation

For more details, see:
- [Main README.md](./README.md) - Complete guide
- [Backend README.md](./backend/README.md) - API documentation
- [Frontend README.md](./frontend/README.md) - Frontend details

---

**Enjoy your Tarifler recipe website! 🍳**

Have questions? Check the troubleshooting section in main README.md
