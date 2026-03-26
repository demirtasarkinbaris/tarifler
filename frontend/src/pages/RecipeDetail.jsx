import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { recipeService } from '../services/api';
import { getYoutubeThumbnail } from '../utils/youtube';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Play, 
  CheckCircle2, 
  ArrowLeft,
  Timer,
  Utensils,
  Star,
  BookOpen,
  Award
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function RecipeDetail() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [currentStep, setCurrentStep] = useState(0);

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

  const toggleIngredient = (ingredientId) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredientId)) {
      newChecked.delete(ingredientId);
    } else {
      newChecked.add(ingredientId);
    }
    setCheckedIngredients(newChecked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-50 to-primary-50 pt-20">
        <div className="container-custom py-12">
          <div className="flex justify-center items-center h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-luxury"
            >
              <ChefHat className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-50 to-primary-50 pt-20">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-accent-200 bg-accent-50 shadow-luxury">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-accent-800 mb-4">
                  Tarif yüklenirken bir hata oluştu
                </h3>
                <p className="text-accent-600 mb-6">{error}</p>
                <Link to="/">
                  <Button variant="outline" className="border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white">
                    Ana Sayfaya Dön
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const thumbnailUrl = getYoutubeThumbnail(recipe.youtubeUrl) || recipe.imageUrl;
  const instructions = recipe.instructions?.split('\n').filter(i => i.trim()) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-50 via-white to-primary-50 pt-20">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-luxury-900/90" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>

        <br />
        <br />

        <div className="relative container-custom py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-6">
                {recipe.category?.name}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-black font-display text-white mb-6 leading-tight">
                {recipe.title}
              </h1>

              <p className="text-xl text-white/90 mb-8 font-body leading-relaxed">
                {recipe.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-luxury-strong">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-100 flex items-center justify-center">
                    <ChefHat className="w-24 h-24 text-primary-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 right-6">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-luxury">
                    <Play className="w-8 h-8 text-primary-600" fill="currentColor" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24 shadow-luxury border-luxury-200 bg-gradient-to-br from-luxury-50 to-white">
              <CardHeader className="border-luxury-200">
                <CardTitle className="flex items-center gap-3 font-display text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-soft">
                    <Utensils className="w-5 h-5 text-white" />
                  </div>
                  Malzemeler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <motion.div
                      key={ingredient.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className={`group cursor-pointer transition-all duration-300 ${
                        checkedIngredients.has(ingredient.id) 
                          ? 'opacity-60' 
                          : 'hover:translate-x-2'
                      }`}
                      onClick={() => toggleIngredient(ingredient.id)}
                    >
                      <div className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                        checkedIngredients.has(ingredient.id)
                          ? 'bg-primary-50 border-primary-300'
                          : 'bg-white border-luxury-200 hover:border-primary-300 hover:shadow-soft'
                      }`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1 ${
                          checkedIngredients.has(ingredient.id)
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-luxury-300'
                        }`}>
                          {checkedIngredients.has(ingredient.id) && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold font-body leading-tight ${
                            checkedIngredients.has(ingredient.id)
                              ? 'text-primary-700 line-through'
                              : 'text-secondary-800'
                          }`}>
                            {ingredient.name}
                          </p>
                          <p className="text-sm text-secondary-600 mt-1 font-accent">
                            {ingredient.amount}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-luxury-100 rounded-xl border border-luxury-300">
                  <div className="flex items-center gap-3 text-luxury-800">
                    <Award className="w-5 h-5" />
                    <p className="text-sm font-accent font-medium">
                      {checkedIngredients.size} / {recipe.ingredients?.length || 0} malzeme hazır
                    </p>
                  </div>
                  <div className="mt-3 bg-luxury-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-700"
                      initial={{ width: 0 }}
                      animate={{ width: `${(checkedIngredients.size / (recipe.ingredients?.length || 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-luxury border-luxury-200 bg-gradient-to-br from-white to-luxury-50">
              <CardHeader className="border-luxury-200">
                <CardTitle className="flex items-center gap-3 font-display text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl flex items-center justify-center shadow-soft">
                    <ChefHat className="w-5 h-5 text-white" />
                  </div>
                  Yapılış Adımları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                      className="group"
                    >
                      <div
                        className={`flex gap-6 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                          currentStep === index
                            ? 'bg-gradient-to-r from-primary-50 to-accent-50 border-primary-400 shadow-luxury'
                            : 'bg-white border-luxury-200 hover:border-primary-300 hover:shadow-soft'
                        }`}
                        onClick={() => setCurrentStep(index)}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold font-display flex-shrink-0 transition-all duration-300 ${
                          currentStep === index
                            ? 'bg-gradient-to-br from-primary-500 to-primary-700 shadow-luxury scale-110'
                            : 'bg-gradient-to-br from-luxury-400 to-luxury-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className={`text-lg leading-relaxed font-body ${
                            currentStep === index
                              ? 'text-primary-800 font-semibold'
                              : 'text-secondary-700'
                          }`}>
                            {instruction}
                          </p>
                        </div>
                        {currentStep === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            <Timer className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <Link to="/">
                    <Button size="lg" className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-luxury hover:shadow-luxury-strong">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Diğer Tarifleri Gör
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <Card className="shadow-luxury border-luxury-200 bg-gradient-to-br from-white to-luxury-50">
            <CardHeader className="border-luxury-200">
              <CardTitle className="flex items-center gap-3 font-display text-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-soft">
                  <Play className="w-5 h-5 text-white" />
                </div>
                Video Tarifi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <YouTubeEmbed youtubeUrl={recipe.youtubeUrl} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
