# 📁 Project Structure Overview

Complete file structure and description of the Tarifler Recipe Website project.

## Root Level Files

```
tarifler/
├── README.md              # Main project documentation
├── QUICKSTART.md          # Quick start guide (5 min setup)
├── SETUP.md              # Detailed setup instructions
├── STRUCTURE.md          # This file
├── backend/              # Express.js API server
└── frontend/             # React + Vite frontend app
```

## Backend Structure

```
backend/
├── node_modules/         # npm dependencies (created after npm install)
├── prisma/
│   ├── migrations/       # Database migration files (created by Prisma)
│   └── schema.prisma     # Database schema definition
├── src/
│   ├── routes/
│   │   ├── recipes.js        # Recipe API endpoints (CRUD)
│   │   └── categories.js     # Category API endpoints (CRUD)
│   ├── server.js         # Express app setup & main server file
│   └── seed.js           # Database seeding script
├── .env                  # Environment variables (local)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies & scripts
├── README.md             # Backend-specific documentation
└── package-lock.json     # Dependency lock file (created by npm)
```

### Key Backend Files

**src/server.js**
- Initializes Express app
- Sets up middleware (CORS, JSON parser)
- Defines routes
- Starts server on port 5000

**src/routes/recipes.js**
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:slug` - Get recipe by slug
- `POST /api/recipes` - Create recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- YouTube URL to embed conversion

**src/routes/categories.js**
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category with recipes
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

**prisma/schema.prisma**
- Database model definitions
- Table schemas (Category, Recipe, Ingredient)
- Relationships and constraints
- Indexes and unique constraints

**src/seed.js**
- Populates database with example data
- Creates 8 categories
- Creates 3 example recipes
- Creates sample ingredients

## Frontend Structure

```
frontend/
├── node_modules/         # npm dependencies (created after npm install)
├── public/               # Static assets
│   └── vite.svg          # Favicon
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Header.jsx        # Navigation header with categories
│   │   ├── Footer.jsx        # Footer component
│   │   ├── RecipeCard.jsx    # Recipe preview card
│   │   └── YouTubeEmbed.jsx  # YouTube video player
│   ├── pages/            # Page components (routes)
│   │   ├── Home.jsx           # Homepage
│   │   ├── RecipeDetail.jsx   # Recipe detail page
│   │   ├── Category.jsx       # Category page
│   │   └── Admin.jsx          # Admin panel
│   ├── hooks/            # Custom React hooks
│   │   └── useApi.js         # Hooks for API calls
│   ├── services/         # API service layer
│   │   └── api.js            # Axios instance & API methods
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles & Tailwind
├── index.html            # HTML entry point
├── .env                  # Environment variables (local)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies & scripts
├── vite.config.js        # Vite build configuration
├── tailwind.config.js    # TailwindCSS configuration
├── postcss.config.js     # PostCSS configuration
├── README.md             # Frontend-specific documentation
├── package-lock.json     # Dependency lock file (created by npm)
└── dist/                 # Production build output (created by npm run build)
```

### Key Frontend Files

**App.jsx**
- Main app component
- Defines routes using React Router
- Wraps app with Header, Footer, and main content
- Route definitions:
  - `/` - Home
  - `/recipe/:slug` - Recipe detail
  - `/category/:slug` - Category page
  - `/admin` - Admin panel

**pages/Home.jsx**
- Homepage component
- Shows categories grid
- Displays featured recipes
- Shows latest recipes
- Search functionality (placeholder)

**pages/RecipeDetail.jsx**
- Recipe page with:
  - Recipe title and description
  - Embedded YouTube video
  - Ingredients list
  - Step-by-step instructions
  - Category information

**pages/Category.jsx**
- Category page with:
  - Category name and description
  - All recipes in category
  - Recipe grid

**pages/Admin.jsx**
- Admin panel with tabs:
  - Recipes: Create, edit, delete recipes
  - Categories: Create, edit, delete categories
- Forms with validation
- Real-time UI updates

**components/Header.jsx**
- Navigation bar
- Logo/branding
- Quick links
- Category navigation bar (horizontal scroll on mobile)

**components/RecipeCard.jsx**
- Reusable recipe preview card
- Shows recipe image or placeholder
- Title and description preview
- Link to full recipe page

**components/YouTubeEmbed.jsx**
- Converts YouTube URLs to embedded player
- Handles multiple URL formats:
  - `https://youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
- Responsive video player

**services/api.js**
- Axios instance setup
- API method wrappers:
  - `recipeService.getAllRecipes()`
  - `recipeService.getRecipeBySlug(slug)`
  - `recipeService.createRecipe(data)`
  - `recipeService.updateRecipe(id, data)`
  - `recipeService.deleteRecipe(id)`
  - `categoryService.*` - Similar methods for categories

**hooks/useApi.js**
- `useRecipes()` - Fetch and cache all recipes
- `useCategories()` - Fetch and cache all categories
- Handle loading and error states

## Database Schema

### Categories Table
```
id           INT PRIMARY KEY
name         VARCHAR UNIQUE
slug         VARCHAR UNIQUE
description  TEXT
createdAt    TIMESTAMP
updatedAt    TIMESTAMP
```

### Recipes Table
```
id          INT PRIMARY KEY
title       VARCHAR
slug        VARCHAR UNIQUE
description TEXT
instructions TEXT
youtubeUrl  VARCHAR
imageUrl    VARCHAR (optional)
categoryId  INT FOREIGN KEY
createdAt   TIMESTAMP
updatedAt   TIMESTAMP
```

### Ingredients Table
```
id        INT PRIMARY KEY
recipeId  INT FOREIGN KEY
name      VARCHAR
amount    VARCHAR
createdAt TIMESTAMP
```

## Configuration Files

### Backend Configs

**package.json**
```json
{
  "name": "tarifler-backend",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js",
    "prisma:migrate": "prisma migrate dev",
    "prisma:generate": "prisma generate",
    "prisma:seed": "node src/seed.js"
  },
  "dependencies": {
    "@prisma/client": "^5.8.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "body-parser": "^1.20.2"
  }
}
```

**.env**
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tarifler_db"
CLIENT_URL="http://localhost:5173"
PORT=5000
```

### Frontend Configs

**package.json**
```json
{
  "name": "tarifler-frontend",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

**vite.config.js**
```javascript
- Port: 5173
- React plugin enabled
- API proxy to localhost:5000
```

**tailwind.config.js**
```javascript
- Content scanning for jsx files
- Extended colors (primary: red, secondary: orange)
- TailwindCSS utilities enabled
```

## Development Workflow

1. **Start PostgreSQL** - Ensure database is running
2. **Start Backend** - `npm run dev` from backend/ → Port 5000
3. **Start Frontend** - `npm run dev` from frontend/ → Port 5173
4. **Open Browser** - Visit http://localhost:5173
5. **Edit Code** - Changes auto-reload (Vite hot reload)
6. **API Changes** - Backend auto-restarts with --watch flag

## Build Output

### Frontend Build
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js       # Bundled & minified JS
│   └── index-xxxxx.css      # Compiled CSS
└── vite.svg
```

### Backend
No build step needed. Runs directly with Node.js.

## Environment & Deployment

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Database: localhost:5432

### Production
- Frontend: hosted on CDN/static server
- Backend: deployed to Linux server/cloud
- Database: cloud database (AWS RDS, etc.)

## Dependencies Overview

### Backend Dependencies
- **express** - Web framework
- **@prisma/client** - ORM client
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **body-parser** - Request body parsing

### Frontend Dependencies
- **react** - UI library
- **react-dom** - React DOM renderer
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **vite** - Build tool

## File Sizes

- Backend: ~50KB (without node_modules)
- Frontend: ~100KB (without node_modules)
- node_modules: ~1.5GB (after npm install for both)

## Git Ignore

Both projects ignore:
- `node_modules/` - Dependencies
- `.env` - Local environment variables
- `dist/` / `build/` - Build outputs
- `.log` - Log files
- `.DS_Store` - macOS files

## Naming Conventions

### Files
- Components: `PascalCase.jsx`
- Utilities: `camelCase.js`
- CSS: Global in `index.css`, scoped in components

### Database
- Tables: `PascalCase` (User, Recipe, Category)
- Columns: `camelCase` (userId, categoryId)
- Relations: defined in schema.prisma

### API Routes
- All lowercase: `/api/recipes`, `/api/categories`
- ID-based: `/api/recipes/:id`
- Slug-based: `/api/recipes/:slug`

---

This structure follows React and Node.js best practices, making it scalable and maintainable!
