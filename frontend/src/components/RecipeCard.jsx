import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getYoutubeThumbnail } from '../utils/youtube';
import { Clock, Users, Star, Play, ChefHat } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';

export default function RecipeCard({ recipe, index }) {
  const thumbnailUrl = getYoutubeThumbnail(recipe.youtubeUrl) || recipe.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/recipe/${recipe.slug}`} className="block group">
        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-strong border-primary-100">
          {/* Recipe Image */}
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
            {thumbnailUrl ? (
              <>
                <img
                  src={thumbnailUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">
                  <motion.div
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-5 h-5 text-primary-600" fill="currentColor" />
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <ChefHat className="w-16 h-16 text-primary-300" />
                </motion.div>
              </div>
            )}
            
            {/* Category Badge */}
            {recipe.category && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="default" className="bg-white/90 backdrop-blur-sm text-primary-700 border-white/50">
                  {recipe.category.name}
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-5">
            {/* Recipe Title */}
            <h3 className="text-xl font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
              {recipe.title}
            </h3>

            {/* Recipe Description */}
            <p className="text-sm text-secondary-600 mb-4 line-clamp-2 leading-relaxed">
              {recipe.description}
            </p>

            {/* Recipe Meta */}
            <div className="flex items-center justify-between pt-3 border-t border-primary-100">
              <div className="flex items-center gap-3 text-xs text-secondary-500">
                <div className="flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  <span>Video</span>
                </div>
                {recipe.ingredients && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{recipe.ingredients.length} malzeme</span>
                  </div>
                )}
              </div>
              <motion.div
                className="text-primary-600 font-semibold text-sm flex items-center gap-1"
                whileHover={{ x: 3 }}
              >
                <span>Görüntüle</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  →
                </motion.div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
