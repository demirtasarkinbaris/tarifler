import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipeService } from '../services/api';
import { getYoutubeThumbnail } from '../utils/youtube';
import YouTubeEmbed from '../components/YouTubeEmbed';

export default function RecipeDetail() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeService.getRecipeBySlug(slug);
        setRecipe(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin">
            <span className="text-6xl">🍳</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container-custom py-12">
        <div className="alert alert-error">
          Tarif yüklenirken bir hata oluştu: {error}
        </div>
      </div>
    );
  }

  const thumbnailUrl = getYoutubeThumbnail(recipe.youtubeUrl) || recipe.imageUrl;

  return (
    <div>
      {/* Hero Cover Section */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-green-900">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900 via-transparent to-transparent opacity-75"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom w-full pb-8">
            <span className="badge badge-primary mb-4 text-base">
              {recipe.category?.name}
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl mb-3">
              {recipe.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        {recipe.description && (
          <div className="mb-12 p-6 rounded-xl animate-slide-in" style={{animationDuration: '0.8s', background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)', borderLeft: '4px solid rgba(34, 197, 94, 0.5)'}}>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              {recipe.description}
            </p>
          </div>
        )}

        {/* Video Section */}
        <div className="mb-16">
          <h2 className="section-title mb-8">📹 Video Tarifi</h2>
          <YouTubeEmbed youtubeUrl={recipe.youtubeUrl} />
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 animate-slide-left" style={{animationDuration: '0.8s'}}>
              <div className="card-header">
                <h2 className="card-title flex items-center gap-2">
                  🥘 Malzemeler
                </h2>
              </div>
              <div className="space-y-2">
                {recipe.ingredients?.map((ingredient) => (
                  <div key={ingredient.id} className="ingredient-item">
                    <div className="ingredient-check">✓</div>
                    <div>
                      <p className="font-semibold text-gray-900">{ingredient.name}</p>
                      <p className="text-sm text-gray-600">{ingredient.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <div className="card animate-fade-in" style={{animationDuration: '1s'}}>
              <div className="card-header">
                <h2 className="card-title flex items-center gap-2">
                  👨‍🍳 Yapılış Adımları
                </h2>
              </div>
              <div>
                {recipe.instructions?.split('\n').map((instruction, index) => (
                  instruction.trim() && (
                    <div key={index} className="instruction-step">
                      <div className="step-number">
                        {index + 1}
                      </div>
                      <p className="step-content text-base font-medium leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <a 
            href="/" 
            className="btn-primary inline-flex items-center gap-2"
          >
            ← Diğer Tarifleri Gör
          </a>
        </div>
      </div>
    </div>
  );
}
