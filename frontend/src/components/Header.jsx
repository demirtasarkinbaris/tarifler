import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategories } from '../hooks/useApi';
import { ChefHat, Search, Menu, X, Home, Settings, Utensils } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export default function Header() {
  const { categories } = useCategories();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-medium border-b border-primary-100' 
            : 'bg-white shadow-soft'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-custom py-4">
          {/* Main Navigation */}
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link to="/" className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-soft"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ChefHat className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    Tarifler
                  </h1>
                  <p className="text-xs text-secondary-600 font-medium">Lezzetin Adresi</p>
                </div>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    location.pathname === '/' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Anasayfa
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                >
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              </motion.div>
            </nav>

            <motion.button
              className="md:hidden p-2 rounded-xl hover:bg-primary-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-primary-600" />
              ) : (
                <Menu className="w-6 h-6 text-primary-600" />
              )}
            </motion.button>
          </div>

          {/* Categories Navigation */}
          <div className="hidden md:block border-t border-primary-100 pt-4 mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 border-2 ${
                      location.pathname.includes(category.slug)
                        ? 'bg-primary-600 text-white border-primary-600 shadow-medium'
                        : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-base">{categoryIcons[category.slug] || '🍽️'}</span>
                    {category.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-strong z-40 pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-6">
              <nav className="space-y-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    Anasayfa
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-secondary-700 hover:bg-primary-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    Admin Paneli
                  </Link>
                </motion.div>
              </nav>

              <div className="mt-6 pt-6 border-t border-primary-100">
                <h3 className="text-sm font-semibold text-secondary-600 mb-3">Kategoriler</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/category/${category.slug}`}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl text-secondary-700 hover:bg-primary-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-base">{categoryIcons[category.slug] || '🍽️'}</span>
                        <span className="font-medium">{category.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
