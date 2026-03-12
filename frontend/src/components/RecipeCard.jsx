import React from 'react';
import { Link } from 'react-router-dom';
import { getYoutubeThumbnail } from '../utils/youtube';

export default function RecipeCard({ recipe }) {
  const thumbnailUrl = getYoutubeThumbnail(recipe.youtubeUrl) || recipe.imageUrl;

  return (
    <Link to={`/recipe/${recipe.slug}`} className="recipe-card">
      <div className="recipe-card-image relative overflow-hidden bg-gradient-to-br from-primary to-secondary">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={recipe.title}
            className="recipe-card-image w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="recipe-card-image w-full h-full flex items-center justify-center text-white text-5xl"
          style={{ display: thumbnailUrl ? 'none' : 'flex' }}
        >
          🍽️
        </div>
      </div>
      <div className="recipe-card-body">
        {recipe.category && (
          <span className="recipe-card-category badge-primary">
            {recipe.category.name}
          </span>
        )}
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-description">
          {recipe.description && recipe.description.substring(0, 80) + '...'}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">🎥 Video tarifi</span>
          <span className="text-primary font-bold text-sm">→</span>
        </div>
      </div>
    </Link>
  );
}
