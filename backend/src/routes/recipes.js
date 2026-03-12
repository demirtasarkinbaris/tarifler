import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Helper function to convert title to slug
const titleToSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Convert YouTube URL to embedded format
const getEmbedUrl = (youtubeUrl) => {
  if (!youtubeUrl) return null;
  
  let videoId = '';
  
  if (youtubeUrl.includes('youtube.com/watch')) {
    const url = new URL(youtubeUrl);
    videoId = url.searchParams.get('v');
  } else if (youtubeUrl.includes('youtu.be/')) {
    videoId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        category: true,
        ingredients: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const recipesWithEmbedUrl = recipes.map(recipe => ({
      ...recipe,
      embedUrl: getEmbedUrl(recipe.youtubeUrl)
    }));

    res.json(recipesWithEmbedUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recipe by slug
router.get('/:slug', async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        ingredients: true
      }
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({
      ...recipe,
      embedUrl: getEmbedUrl(recipe.youtubeUrl)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create recipe
router.post('/', async (req, res) => {
  try {
    const { title, description, instructions, youtubeUrl, imageUrl, categoryId, ingredients } = req.body;
    
    if (!title || !instructions || !youtubeUrl || !categoryId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const slug = titleToSlug(title);

    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug,
        description,
        instructions,
        youtubeUrl,
        imageUrl,
        categoryId: parseInt(categoryId),
        ingredients: {
          create: ingredients?.map(ing => ({
            name: ing.name,
            amount: ing.amount
          })) || []
        }
      },
      include: {
        category: true,
        ingredients: true
      }
    });

    res.status(201).json({
      ...recipe,
      embedUrl: getEmbedUrl(recipe.youtubeUrl)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update recipe
router.put('/:id', async (req, res) => {
  try {
    const { title, description, instructions, youtubeUrl, imageUrl, categoryId, ingredients } = req.body;
    const recipeId = parseInt(req.params.id);

    // Delete existing ingredients
    await prisma.ingredient.deleteMany({
      where: { recipeId }
    });

    const recipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title,
        slug: title ? titleToSlug(title) : undefined,
        description,
        instructions,
        youtubeUrl,
        imageUrl,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        ingredients: {
          create: ingredients?.map(ing => ({
            name: ing.name,
            amount: ing.amount
          })) || []
        }
      },
      include: {
        category: true,
        ingredients: true
      }
    });

    res.json({
      ...recipe,
      embedUrl: getEmbedUrl(recipe.youtubeUrl)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete recipe
router.delete('/:id', async (req, res) => {
  try {
    await prisma.recipe.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
