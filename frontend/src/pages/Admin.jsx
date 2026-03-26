import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { recipeService, categoryService } from '../services/api';
import { 
  Settings, 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  ChefHat, 
  Utensils, 
  Star,
  TrendingUp,
  Package,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Recipe Form State
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    description: '',
    instructions: '',
    youtubeUrl: '',
    categoryId: '',
    ingredients: [{ name: '', amount: '' }]
  });
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeService.getAllRecipes();
      setRecipes(response.data);
    } catch (error) {
      console.error('Tarifler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    }
  };

  // Parse ingredients from pasted text
  const parseIngredients = (text) => {
    if (!text.trim()) return [];
    return text
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const trimmed = line.trim();
        if (trimmed.includes('-')) {
          const [amount, name] = trimmed.split('-').map(s => s.trim());
          return {
            amount: amount || '',
            name: name || ''
          };
        }
        const parts = trimmed.split(/\s+/);
        if (parts.length > 1) {
          return {
            amount: parts[0],
            name: parts.slice(1).join(' ')
          };
        }
        return { amount: '', name: trimmed };
      })
      .filter(ing => ing.name.trim());
  };

  // Parse instructions and remove numbered prefixes
  const parseInstructions = (text) => {
    if (!text.trim()) return '';
    return text
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const trimmed = line.trim();
        return trimmed.replace(/^\d+\.\s*/, '');
      })
      .join('\n');
  };

  // Recipe handlers
  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    if (!recipeForm.title || !recipeForm.instructions || !recipeForm.youtubeUrl || !recipeForm.categoryId) {
      return;
    }

    try {
      const parsedIngredients = recipeForm.ingredients[0].name ? recipeForm.ingredients : [];
      const parsedInstructions = parseInstructions(recipeForm.instructions);
      
      const submitData = {
        ...recipeForm,
        instructions: parsedInstructions,
        ingredients: parsedIngredients.length > 0 ? parsedIngredients : []
      };

      if (editingRecipeId) {
        await recipeService.updateRecipe(editingRecipeId, submitData);
        setSuccessMessage('Tarif başarıyla güncellendi!');
      } else {
        await recipeService.createRecipe(submitData);
        setSuccessMessage('Tarif başarıyla oluşturuldu!');
      }
      
      resetRecipeForm();
      fetchRecipes();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('İşlem başarısız:', error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
      try {
        await recipeService.deleteRecipe(id);
        setSuccessMessage('Tarif silindi!');
        fetchRecipes();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Silme işlemi başarısız:', error);
      }
    }
  };

  const resetRecipeForm = () => {
    setRecipeForm({
      title: '',
      description: '',
      instructions: '',
      youtubeUrl: '',
      categoryId: '',
      ingredients: [{ name: '', amount: '' }]
    });
    setEditingRecipeId(null);
  };

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipeForm.ingredients];
    newIngredients[index][field] = value;
    setRecipeForm(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setRecipeForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '' }]
    }));
  };

  const removeIngredient = (index) => {
    setRecipeForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  // Category handlers
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryForm.name) {
      return;
    }

    try {
      if (editingCategoryId) {
        await categoryService.updateCategory(editingCategoryId, categoryForm);
        setSuccessMessage('Kategori güncellendi!');
      } else {
        await categoryService.createCategory(categoryForm);
        setSuccessMessage('Kategori oluşturuldu!');
      }
      
      resetCategoryForm();
      fetchCategories();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('İşlem başarısız:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        await categoryService.deleteCategory(id);
        setSuccessMessage('Kategori silindi!');
        fetchCategories();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Silme işlemi başarısız:', error);
      }
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategoryId(null);
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-50 via-white to-primary-50 pt-20">
      {/* Header */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-luxury-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
        <br />
        <br />
        <div className="relative container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Settings className="w-6 h-6" />
              <span className="font-accent font-semibold text-lg">Yönetim Paneli</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-display mb-6 leading-tight">
              Profesyonel
              <br />
              <span className="bg-gradient-to-r from-primary-200 to-luxury-200 bg-clip-text text-transparent">
                Mutfak Admin Paneli
              </span>
            </h1>

            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed font-body">
              Tariflerinizi ve kategorilerinizi kolayca yönetin, lezzetli içerikler oluşturun
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 text-primary-100">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-accent font-medium text-primary-200">Toplam Tarif</p>
                  <p className="font-bold text-2xl font-display">{recipes.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-primary-100">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-accent font-medium text-primary-200">Kategori</p>
                  <p className="font-bold text-2xl font-display">{categories.length}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50"
          >
            <Card className="bg-primary-50 border-primary-200 shadow-luxury">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <p className="font-accent font-medium text-primary-800">{successMessage}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom py-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <Button
            onClick={() => setActiveTab('recipes')}
            size="lg"
            className={`flex-1 justify-center bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-luxury`}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Tarifler ({recipes.length})
          </Button>
          <Button
            onClick={() => setActiveTab('categories')}
            size="lg"
            className={`flex-1 justify-center bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-luxury`}
          >
            <Package className="w-5 h-5 mr-2" />
            Kategoriler ({categories.length})
          </Button>
        </motion.div>

        {/* Recipes Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'recipes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-8"
            >
              {/* Recipe Form */}
              <div className="xl:col-span-1">
                <Card className="sticky top-24 shadow-luxury border-luxury-200 bg-gradient-to-br from-white to-luxury-50">
                  <CardHeader className="border-luxury-200">
                    <CardTitle className="flex items-center gap-3 font-display text-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-soft">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                      {editingRecipeId ? 'Tarifi Düzenle' : 'Yeni Tarif Ekle'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleRecipeSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          Tarif Adı *
                        </label>
                        <Input
                          type="text"
                          name="title"
                          value={recipeForm.title}
                          onChange={handleRecipeChange}
                          placeholder="Lezzetli tarifinizin adı..."
                          className="font-body"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          Açıklama
                        </label>
                        <Textarea
                          name="description"
                          value={recipeForm.description}
                          onChange={handleRecipeChange}
                          placeholder="Tarifiniz hakkında kısa bir açıklama..."
                          rows="3"
                          className="font-body resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          YouTube URL *
                        </label>
                        <Input
                          type="text"
                          name="youtubeUrl"
                          value={recipeForm.youtubeUrl}
                          onChange={handleRecipeChange}
                          placeholder="https://youtube.com/watch?v=..."
                          className="font-body"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          Kategori *
                        </label>
                        <select
                          name="categoryId"
                          value={recipeForm.categoryId}
                          onChange={handleRecipeChange}
                          className="w-full h-12 px-4 py-3 border-2 border-primary-200 rounded-xl bg-white text-secondary-900 font-medium focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-body"
                          required
                        >
                          <option value="">Kategori seçin</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          Malzemeler *
                        </label>
                        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar border border-luxury-200 rounded-xl p-4 bg-luxury-50">
                          {recipeForm.ingredients.map((ingredient, index) => (
                            <div key={index} className="grid grid-cols-1 gap-3 p-3 bg-white rounded-lg border border-luxury-100">
                              <Input
                                type="text"
                                value={ingredient.amount}
                                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                placeholder="Miktar (örn: 125 g)"
                                className="font-body text-sm"
                              />
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  value={ingredient.name}
                                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                  placeholder="Malzeme adı"
                                  className="flex-1 font-body text-sm"
                                />
                                {recipeForm.ingredients.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeIngredient(index)}
                                    className="px-3"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addIngredient}
                          className="w-full mt-3 border-luxury-300 text-luxury-700 hover:bg-luxury-100"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Malzeme Ekle
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          Yapılış Adımları *
                        </label>
                        <Textarea
                          name="instructions"
                          value={recipeForm.instructions}
                          onChange={handleRecipeChange}
                          placeholder={`1. İlk adım buraya&#10;2. İkinci adım buraya&#10;3. Üçüncü adım buraya`}
                          rows="6"
                          className="font-body resize-none"
                          required
                        />
                        <p className="text-xs text-secondary-500 mt-2 font-accent">
                          Not: Numaralar otomatik olarak düzenlenecektir
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          size="lg"
                          className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-luxury hover:shadow-luxury-strong"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {editingRecipeId ? 'Güncelle' : 'Oluştur'}
                        </Button>
                        {editingRecipeId && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={resetRecipeForm}
                            className="border-luxury-300 text-luxury-700 hover:bg-luxury-100"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Recipes List */}
              <div className="xl:col-span-2">
                <Card className="shadow-luxury border-luxury-200 bg-gradient-to-br from-white to-luxury-50">
                  <CardHeader className="border-luxury-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="flex items-center gap-3 font-display text-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-700 rounded-lg flex items-center justify-center shadow-soft">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        Tarifler
                      </CardTitle>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                        <Input
                          type="text"
                          placeholder="Tarif ara..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 font-body text-sm"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {loading ? (
                      <div className="flex justify-center py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-luxury"
                        >
                          <ChefHat className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    ) : filteredRecipes.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-luxury-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <BookOpen className="w-10 h-10 text-luxury-400" />
                        </div>
                        <h3 className="text-xl font-bold font-display text-luxury-800 mb-2">
                          {searchQuery ? 'Tarif Bulunamadı' : 'Henüz Tarif Yok'}
                        </h3>
                        <p className="text-luxury-600 mb-6 font-body">
                          {searchQuery ? 'Arama kriterlerinize uygun tarif bulunamadı.' : 'İlk tarifizi oluşturmak için yukarıdaki formu kullanın.'}
                        </p>
                        {searchQuery && (
                          <Button
                            variant="outline"
                            onClick={() => setSearchQuery('')}
                            className="border-luxury-300 text-luxury-700 hover:bg-luxury-100"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Aramayı Temizle
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-luxury-200">
                              <th className="text-left py-4 px-4 font-accent font-semibold text-luxury-700">Tarif</th>
                              <th className="text-left py-4 px-4 font-accent font-semibold text-luxury-700">Kategori</th>
                              <th className="text-right py-4 px-4 font-accent font-semibold text-luxury-700">İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredRecipes.map((recipe, index) => (
                              <motion.tr
                                key={recipe.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-b border-luxury-100 hover:bg-luxury-50 transition-colors"
                              >
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                                      <ChefHat className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                      <p className="font-semibold font-body text-secondary-800">{recipe.title}</p>
                                      {recipe.description && (
                                        <p className="text-sm text-secondary-600 font-accent line-clamp-1">
                                          {recipe.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <Badge variant="secondary" className="bg-luxury-100 text-luxury-800 border-luxury-300">
                                    {recipe.category?.name}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setRecipeForm({
                                          title: recipe.title,
                                          description: recipe.description,
                                          instructions: recipe.instructions,
                                          youtubeUrl: recipe.youtubeUrl,
                                          categoryId: recipe.categoryId,
                                          ingredients: recipe.ingredients
                                        });
                                        setEditingRecipeId(recipe.id);
                                      }}
                                      className="border-primary-300 text-primary-700 hover:bg-primary-50"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </Button>
                                    {/* silme simgesi beyaz olacak */}
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleDeleteRecipe(recipe.id)}
                                      className="border-primary-300 text-primary-700 hover:bg-primary-50"
                                    >
                                      <Trash2 className="w-4 h-4 text-white" />
                                    </Button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'categories' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-8"
            >
              {/* Category Form */}
              <div className="xl:col-span-1">
                <Card className="sticky top-24 shadow-luxury border-luxury-200 bg-gradient-to-br from-white to-luxury-50">
                  <CardHeader className="border-luxury-200">
                    <CardTitle className="flex items-center gap-3 font-display text-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-luxury-500 to-luxury-700 rounded-lg flex items-center justify-center shadow-soft">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                      {editingCategoryId ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleCategorySubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          Kategori Adı *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={categoryForm.name}
                          onChange={handleCategoryChange}
                          placeholder="Kategori adı"
                          className="font-body"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-accent font-semibold text-secondary-700 mb-2">
                          Açıklama
                        </label>
                        <Textarea
                          name="description"
                          value={categoryForm.description}
                          onChange={handleCategoryChange}
                          placeholder="Kategori açıklaması"
                          rows="3"
                          className="font-body resize-none"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          size="lg"
                          className="flex-1 bg-gradient-to-r from-luxury-600 to-luxury-700 text-white shadow-luxury hover:shadow-luxury-strong"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {editingCategoryId ? 'Güncelle' : 'Oluştur'}
                        </Button>
                        {editingCategoryId && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={resetCategoryForm}
                            className="border-luxury-300 text-luxury-700 hover:bg-luxury-100"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Categories List */}
              <div className="xl:col-span-2">
                <Card className="shadow-luxury border-luxury-200 bg-gradient-to-br from-white to-luxury-50">
                  <CardHeader className="border-luxury-200">
                    <CardTitle className="flex items-center gap-3 font-display text-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-luxury-500 to-luxury-700 rounded-lg flex items-center justify-center shadow-soft">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      Kategoriler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {categories.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-luxury-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Package className="w-10 h-10 text-luxury-400" />
                        </div>
                        <h3 className="text-xl font-bold font-display text-luxury-800 mb-2">
                          Henüz Kategori Yok
                        </h3>
                        <p className="text-luxury-600 mb-6 font-body">
                          İlk kategorinizi oluşturmak için yukarıdaki formu kullanın.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((category, index) => (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-4 bg-white rounded-xl border border-luxury-200 hover:border-luxury-300 hover:shadow-soft transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-bold font-display text-luxury-800 mb-2">
                                  {category.name}
                                </h4>
                                {category.description && (
                                  <p className="text-sm text-luxury-600 font-accent mb-3 line-clamp-2">
                                    {category.description}
                                  </p>
                                )}
                                <Badge variant="secondary" className="bg-luxury-100 text-luxury-800 border-luxury-300">
                                  {category.recipes?.length || 0} tarif
                                </Badge>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setCategoryForm({
                                      name: category.name,
                                      description: category.description
                                    });
                                    setEditingCategoryId(category.id);
                                  }}
                                  className="border-luxury-300 text-luxury-700 hover:bg-luxury-100"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteCategory(category.id)}
                                  className="bg-accent-100 text-accent-700 hover:bg-accent-200 border-accent-300"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
