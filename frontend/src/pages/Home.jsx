import React, { useState, useMemo } from 'react';
import { useRecipes, useCategories } from '../hooks/useApi';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const { recipes, loading, error } = useRecipes();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrelenmiş tarifler
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return recipes;
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recipes, searchQuery]);

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="alert alert-error">
          Tarifler yüklenirken bir hata oluştu: {error}
        </div>
      </div>
    );
  }

  const featuredRecipes = recipes.slice(0, 3);
  const latestRecipes = recipes.slice(0, 6);

  return (
    <div>
      {/* Decorative Food Elements - Left Side */}
      <div className="fixed top-40 left-10 text-7xl opacity-7 pointer-events-none z-0" style={{animation: 'float 8s ease-in-out infinite'}}>🍗</div>
      <div className="fixed top-1/2 left-20 text-7xl opacity-6 pointer-events-none z-0" style={{animation: 'float 7s ease-in-out infinite'}}>🥗</div>
      <div className="fixed bottom-20 left-5 text-7xl opacity-7 pointer-events-none z-0" style={{animation: 'float 9s ease-in-out infinite'}}>🌱</div>
      
      {/* Decorative Food Elements - Right Side */}
      <div className="fixed bottom-20 right-5 text-7xl opacity-7 pointer-events-none z-0" style={{animation: 'float 6.5s ease-in-out infinite reverse'}}>🌿</div>
      <div className="fixed top-40 right-20 text-7xl opacity-8 pointer-events-none z-0" style={{animation: 'float 8.5s ease-in-out infinite'}}>🥒</div>
      <div className="fixed top-1/2 right-10 text-8xl opacity-6 pointer-events-none z-0" style={{animation: 'float 7.5s ease-in-out infinite reverse'}}>🍳</div>

      {/* Hero Section */}
      <div className="hero-section container-custom mb-16 rounded-3xl mt-8 animate-slide-in" style={{animationDuration: '0.8s'}}>
        <div className="hero-content">
          <h1 className="text-hero mb-4 text-center">
            🍳 Tarifler
          </h1>
          <p className="text-subtitle mb-8 text-center">
            En lezzetli Türk yemekleri tariflerini videoyla öğrenin
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="text"
              placeholder="Tarif ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && setSearchQuery(e.target.value)}
              className="px-6 py-4 rounded-xl text-gray-900 flex-1 max-w-md focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg font-semibold transition-all duration-300"
            />
            <button 
              onClick={() => {}}
              className="btn-secondary text-lg py-4 px-8"
            >
              🔍 Ara
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Categories Section */}
        {!searchQuery && (
          <section className="mb-16 animate-fade-in" style={{animationDuration: '1s'}}>
            <div className="section-title-container">
              <h2 className="section-title text-center md:text-left">Kategoriler</h2>
            </div>
            <div className="category-grid">
              {categories.map((category) => {
                const categoryIcons = {
                  'hamur-isi': '🥐',
                  'tatli': '🍰',
                  'pilav': '🍚',
                  'corba': '🍲',
                  'ana-yemek': '🍖',
                  'salata': '🥗',
                  'kahvaltilk': '🍞',
                  'icecek': '☕'
                };
                return (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="category-card"
                  >
                    <div className="category-icon">{categoryIcons[category.slug] || '🍽️'}</div>
                    <h3 className="category-name">{category.name}</h3>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Search Results or Featured Recipes */}
        {searchQuery ? (
          <section className="mb-16 relative z-10 animate-fade-in" style={{animationDuration: '0.5s'}}>
            <div className="section-title-container">
              <h2 className="section-title text-center md:text-left">
                "{searchQuery}" için Arama Sonuçları ({filteredRecipes.length})
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-12">
                <span className="animate-spin text-6xl">🍳</span>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-600 mb-4">😢 Aradığınız tarifi bulamadık</p>
                <p className="text-gray-500">Lütfen başka bir kelime deneyin</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Featured Recipes */}
            <section className="mb-16 relative z-10 animate-slide-left" style={{animationDuration: '1s'}}>
              <div className="section-title-container">
                <h2 className="section-title text-center md:text-left">Öne Çıkan Tarifler</h2>
              </div>
              {loading ? (
                <div className="flex justify-center py-12">
                  <span className="animate-spin text-6xl">🍳</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.slice(0, 3).map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </section>

            {/* Latest Recipes */}
            <section className="mb-16 relative z-10 animate-fade-in" style={{animationDuration: '1.2s'}}>
              <div className="section-title-container">
                <h2 className="section-title text-center md:text-left">Son Eklenen Tarifler</h2>
              </div>
              {loading ? (
                <div className="flex justify-center py-12">
                  <span className="animate-spin text-6xl">🍳</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.slice(0, 6).map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
