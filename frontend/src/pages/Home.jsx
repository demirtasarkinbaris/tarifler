import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipes, useCategories } from '../hooks/useApi';
import RecipeCard from '../components/RecipeCard';
import { Search, ChefHat, Clock, Star, TrendingUp, Utensils } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Home() {
  const { recipes, loading, error } = useRecipes();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const categoryIcons = {
    'hamur-isi': '🥖',
    'tatli': '🧁',
    'pilav': '🍚',
    'corba': '🍲',
    'ana-yemek': '🍽️',
    'salata': '🥗',
    'kahvaltilk': '🍳',
    'icecek': '🥤',
    'et-yemekleri': '🥩',
    'sebze-yemekleri': '🥬',
    'balik': '🐟',
    'borek': '🥐',
    'kek': '🍰',
    'muffin': '🧁',
    'kurabiye': '🍪',
    'sufle': '🍮',
    'pasta': '🎂',
    'tavuk': '🍗',
    'kofte': '🍖',
    'dolma': '🫔',
    'mezeler': '🥙',
    'makarna': '🍝',
    'pizza': '🍕',
    'hamburger': '🍔',
    'sushi': '🍣',
    'taco': '🌮',
    'waffle': '🧇',
    'donut': '🍩',
    'ice-cream': '🍦',
    'smoothie': '🥤',
    'kahve': '☕',
    'cay': '🍵',
    'meyve': '🍎',
    'sebze': '🥕',
    'süt-ürünleri': '🥛',
    'fındık-fıstık': '🥜'
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return recipes;
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recipes, searchQuery]);

  const featuredRecipes = recipes.slice(0, 3);
  const latestRecipes = recipes.slice(0, 6);

  if (error) {
    return (
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-accent-200 bg-accent-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-accent-800 mb-2">
                Tarifler yüklenirken bir hata oluştu
              </h3>
              <p className="text-accent-600">{error}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/8 rounded-full blur-2xl"
            animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <br />
        <div className="container-custom py-20 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <ChefHat className="w-5 h-5" />
              <span className="text-sm font-semibold">Lezzetin Adresi</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Türk Mutfağının
              <br />
              <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                En Lezzetli Tarifleri
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Video tarifleriyle adım adım öğrenin, profesyonel lezzetleri kendi mutfağınızda yaratın
            </p>

            {/* Search Section */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                    <Input
                      type="text"
                      placeholder="Tarif ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearching(true)}
                      onBlur={() => setIsSearching(false)}
                      className="pl-12 bg-white/90 backdrop-blur-sm border-white/30 text-secondary-900 placeholder-secondary-500 h-12"
                    />
                  </div>
                  <Button 
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-primary-50 shadow-soft text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="w-5 h-5 mr-2 text-primary-600 text-white" />
                    Ara
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="container-custom py-12">
        {/* Categories Section */}
        {!searchQuery && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-4 py-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Utensils className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">Kategoriler</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
                Lezzet Kategorileri
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Her zevke uygun, geleneksel ve modern Türk yemekleri
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={`/category/${category.slug}`}
                    className="block group"
                  >
                    <Card className="text-center p-8 h-full transition-all duration-300 hover:shadow-strong border-primary-100 bg-gradient-to-br from-primary-50 to-white">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-soft group-hover:shadow-medium transition-shadow">
                        <span className="text-2xl">{categoryIcons[category.slug] || '🍽️'}</span>
                      </div>
                      <h3 className="font-bold text-secondary-900 text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-secondary-600">
                        {category.recipes?.length || 0} tarif
                      </p>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search Results or Featured Recipes */}
        <AnimatePresence mode="wait">
          {searchQuery ? (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
                  "{searchQuery}" için Arama Sonuçları
                </h2>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {filteredRecipes.length} tarif bulundu
                </Badge>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <ChefHat className="w-12 h-12 text-primary-400" />
                  </motion.div>
                </div>
              ) : filteredRecipes.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-800 mb-2">
                    Aradığınız tarifi bulamadık
                  </h3>
                  <p className="text-secondary-600 mb-6">
                    Lütfen başka bir kelime deneyin veya kategorilere göz atın
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                  >
                    Tüm Tarifleri Gör
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRecipes.map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
                </div>
              )}
            </motion.section>
          ) : (
            <>
              {/* Featured Recipes */}
              <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center mb-12">
                  <motion.div
                    className="inline-flex items-center gap-2 bg-accent-100 rounded-full px-4 py-2 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <TrendingUp className="w-4 h-4 text-accent-600" />
                    <span className="text-sm font-semibold text-accent-700">Öne Çıkanlar</span>
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-accent-600 to-accent-800 bg-clip-text text-transparent mb-4">
                    Öne Çıkan Tarifler
                  </h2>
                  <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                    En çok sevilen ve denenen lezzetler
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <ChefHat className="w-12 h-12 text-primary-400" />
                    </motion.div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRecipes.map((recipe, index) => (
                      <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                    ))}
                  </div>
                )}
              </motion.section>

              {/* Latest Recipes */}
              <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="text-center mb-12">
                  <motion.div
                    className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-4 py-2 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700">Son Eklenenler</span>
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
                    Son Eklenen Tarifler
                  </h2>
                  <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                    Yeni eklenen lezzetleri keşfedin
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <ChefHat className="w-12 h-12 text-primary-400" />
                    </motion.div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestRecipes.map((recipe, index) => (
                      <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                    ))}
                  </div>
                )}
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
