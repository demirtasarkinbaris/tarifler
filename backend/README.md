# Tarifler Backend API

Express.js API server for the Tarifler recipe website, using Prisma ORM and PostgreSQL.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database URL

# Create database and run migrations
npm run prisma:migrate

# Seed with example data
npm run prisma:seed

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run prisma:migrate` - Create/update database schema
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:seed` - Seed database with example data

## API Endpoints

### Recipes
```
GET    /api/recipes              - List all recipes
GET    /api/recipes/:slug        - Get recipe by slug
POST   /api/recipes              - Create recipe
PUT    /api/recipes/:id          - Update recipe
DELETE /api/recipes/:id          - Delete recipe
```

### Categories
```
GET    /api/categories           - List all categories
GET    /api/categories/:slug     - Get category with recipes
POST   /api/categories           - Create category
PUT    /api/categories/:id       - Update category
DELETE /api/categories/:id       - Delete category
```

## Environment Variables

```
DATABASE_URL="postgresql://user:password@localhost:5432/tarifler_db"
CLIENT_URL="http://localhost:5173"
PORT=5000
```

## Database Schema

See `prisma/schema.prisma` for complete schema definition.

### Entities
- **Category** - Recipe categories (Hamur İşi, Tatlı, etc.)
- **Recipe** - Recipes with title, instructions, YouTube URL
- **Ingredient** - Recipe ingredients with amounts

## Key Features

- Automatic slug generation from titles/names
- YouTube URL to embedded player conversion
- RESTful API design
- CORS enabled for frontend integration
- Cascade delete on category/recipe deletion

## Middleware

- Express JSON parser
- URL encoded body parser
- CORS with configurable origin
