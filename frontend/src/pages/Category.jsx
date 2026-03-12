import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService } from '../services/api';
import RecipeCard from '../components/RecipeCard';

export default function Category() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryService.getCategoryBySlug(slug);
        setCategory(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center h-96 items-center">
          <span className="animate-spin text-6xl">🍳</span>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container-custom py-12">
        <div className="alert alert-error">
          Kategori yüklenirken bir hata oluştu: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Category Header */}
      <div className="hero-section container-custom mb-12 rounded-3xl animate-slide-in" style={{animationDuration: '0.8s'}}>
        <div className="hero-content">
          <h1 className="text-hero mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-subtitle">
              {category.description}
            </p>
          )}
          <div className="mt-4 inline-block badge badge-primary text-base font-semibold">
            📚 {category.recipes?.length || 0} Tarif
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="container-custom">
        {category.recipes?.length === 0 ? (
          <div className="alert alert-warning text-center py-12">
            <p className="text-xl">Bu kategoride henüz tarif bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{animationDuration: '1s'}}>
            {category.recipes?.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center py-8">
          <a href="/" className="btn-primary inline-flex items-center gap-2">
            ← Anasayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
