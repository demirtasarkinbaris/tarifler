# Tarifler - Turkish Recipe Website

A professional full-stack recipe website built with React, Express.js, and PostgreSQL. Browse Turkish recipes, watch video tutorials, and manage recipes through an admin panel.

## 🚀 Features

- **Recipe Browser**: Browse recipes by categories with modern UI
- **Video Recipes**: Embedded YouTube video tutorials for each recipe
- **Ingredients List**: Detailed ingredient lists with amounts
- **Step-by-Step Instructions**: Clear, numbered cooking instructions
- **Categories**: Organize recipes into 8 Turkish cuisine categories
- **Admin Panel**: Create, edit, and delete recipes and categories
- **Responsive Design**: Mobile-friendly interface
- **SEO Optimized**: Slug-based URLs for better SEO

## 📋 Technology Stack

### Frontend
- React 18.2
- Vite (build tool)
- React Router (routing)
- TailwindCSS (styling)
- Axios (HTTP client)

### Backend
- Node.js + Express.js
- Prisma ORM
- PostgreSQL
- CORS enabled

## 📁 Project Structure

```
tarifler/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── routes/            # API routes
│   │   │   ├── recipes.js      # Recipe endpoints
│   │   │   └── categories.js   # Category endpoints
│   │   ├── server.js          # Express app setup
│   │   └── seed.js            # Database seed data
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # React + Vite app
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── RecipeCard.jsx
    │   │   └── YouTubeEmbed.jsx
    │   ├── pages/             # Page components
    │   │   ├── Home.jsx
    │   │   ├── RecipeDetail.jsx
    │   │   ├── Category.jsx
    │   │   └── Admin.jsx
    │   ├── hooks/             # Custom hooks
    │   ├── services/          # API services
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🗄️ Database Schema

### Categories
- `id`: Integer (primary key)
- `name`: String (unique)
- `slug`: String (unique)
- `description`: String (optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Recipes
- `id`: Integer (primary key)
- `title`: String
- `slug`: String (unique)
- `description`: String
- `instructions`: String
- `youtubeUrl`: String
- `imageUrl`: String (optional)
- `categoryId`: Integer (foreign key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Ingredients
- `id`: Integer (primary key)
- `recipeId`: Integer (foreign key)
- `name`: String
- `amount`: String
- `createdAt`: DateTime

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/tarifler_db"
   CLIENT_URL="http://localhost:5173"
   PORT=5000
   ```

4. **Create PostgreSQL database:**
   ```bash
   createdb tarifler_db
   ```

5. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

6. **Seed the database with example data:**
   ```bash
   npm run prisma:seed
   ```

7. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   The default configuration should work:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

## 📖 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:slug` - Get recipe by slug
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category with recipes
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 🎨 Features Overview

### Homepage
- Search functionality
- Category grid display
- Featured recipes showcase
- Latest recipes grid

### Recipe Detail Page
- Embedded YouTube video player (auto-converts YouTube URLs)
- Recipe title and description
- Ingredients list with amounts
- Step-by-step cooking instructions
- Category information

### Category Page
- All recipes in selected category
- Category description
- Recipe cards grid

### Admin Panel
- **Recipes Tab**: Create, edit, delete recipes
- **Categories Tab**: Manage recipe categories
- Form validation
- Real-time updates

## 📋 Example Recipe Data

The database is seeded with:
- **3 Categories**: Hamur İşi, Tatlı, Pilav
- **3 Example Recipes**: Evde Ekmek, Baklava, Pilav

### Example Recipe: Evde Ekmek (Homemade Bread)
**Ingredients:**
- 2 tablespoons dry yeast
- 1 tablespoon powdered sugar
- 350 ml warm water
- 4 cups flour
- 2 teaspoons salt

## 🤝 Usage Examples

### Creating a Recipe via Admin Panel

1. Go to `http://localhost:5173/admin`
2. Go to "Tarifler" tab
3. Fill in recipe details:
   - Title
   - Description
   - Instructions (step by step)
   - YouTube video link
   - Category
   - Ingredients
4. Click "Oluştur" to create

### YouTube Video Integration

The system automatically converts YouTube URLs:
- Input: `https://youtube.com/watch?v=VIDEO_ID`
- Auto-converts to embedded player: `https://www.youtube.com/embed/VIDEO_ID`

## 🎯 Responsive Design

- **Mobile**: Single column layout, optimized touch interactions
- **Tablet**: 2-column layout
- **Desktop**: 3-column layout with sticky sidebar (admin panel)

## 🔍 SEO Features

- Slug-based URLs for recipes and categories
- Meta tags support (ready for implementation)
- Clean URL structure
- Category and recipe pages are SEO-friendly

## 🚢 Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

## 📝 License

MIT

## 🆘 Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify DATABASE_URL in .env
- Ensure database exists: `psql -l | grep tarifler_db`

### Port Already in Use
- Backend (5000): `lsof -i :5000` then `kill -9 <PID>`
- Frontend (5173): `lsof -i :5173` then `kill -9 <PID>`

### CORS Issues
- Ensure CLIENT_URL in backend .env matches frontend URL
- Check if requests are being proxied correctly in vite.config.js

## 🔄 Development Workflow

1. Start PostgreSQL
2. Start backend: `npm run dev` (from backend/)
3. Start frontend: `npm run dev` (from frontend/)
4. Open browser at `http://localhost:5173`
5. Admin panel at `http://localhost:5173/admin`

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
