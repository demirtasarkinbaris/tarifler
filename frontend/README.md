# Tarifler Frontend

React + Vite + TailwindCSS frontend for the Tarifler recipe website.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

### Pages
- `Home` - Homepage with categories, featured, and latest recipes
- `RecipeDetail` - Full recipe page with video and instructions
- `Category` - Category page showing all recipes in category
- `Admin` - Admin panel for managing recipes and categories

### Components
- `Header` - Navigation with category links
- `Footer` - Footer with links and info
- `RecipeCard` - Recipe preview card
- `YouTubeEmbed` - YouTube video player component

### Hooks
- `useRecipes` - Fetch all recipes
- `useCategories` - Fetch all categories

### Services
- `api.js` - Axios instance and API service methods

## Features

- ✅ Recipe browsing by category
- ✅ Embedded YouTube video player
- ✅ Ingredient list display
- ✅ Step-by-step instructions
- ✅ Admin panel for CRUD operations
- ✅ Fully responsive design
- ✅ Modern TailwindCSS styling

## Routing

```
/                    - Homepage
/recipe/:slug        - Recipe detail page
/category/:slug      - Category page
/admin               - Admin panel
```

## Build Config

### Vite Config
- Port: 5173
- Proxy: /api requests to http://localhost:5000
- React Fast Refresh for hot reload

### TailwindCSS Config
- Custom colors (primary: #DC2626, secondary: #F97316)
- Extends default theme
- Content scanning for src files

## API Integration

API calls are made through Axios with a base URL from environment variables:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});
```

## Styling

Uses TailwindCSS utility classes with custom CSS classes defined in `index.css`:
- `.recipe-card` - Recipe card styling
- `.btn-primary`, `.btn-secondary`, `.btn-danger` - Button styles
- `.container-custom` - Content container
- `.section-title` - Section title styling

## Development Tips

1. Hot reload works automatically with Vite
2. Tailwind classes are processed in real-time
3. Use React DevTools browser extension for debugging
4. Check Network tab for API calls
