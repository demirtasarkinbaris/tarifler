import React, { useState, useEffect } from 'react';
import { recipeService, categoryService } from '../services/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
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
      alert('Tarifler yüklenirken hata: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      alert('Kategoriler yüklenirken hata: ' + error.message);
    }
  };

  // Parse ingredients from pasted text (format: "amount - name")
  const parseIngredients = (text) => {
    if (!text.trim()) return [];
    return text
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const trimmed = line.trim();
        // Format: "125 g - margarin veya tereyağı"
        if (trimmed.includes('-')) {
          const [amount, name] = trimmed.split('-').map(s => s.trim());
          return {
            amount: amount || '',
            name: name || ''
          };
        }
        // Fallback: try to split by space for old format
        const parts = trimmed.split(/\s+/);
        if (parts.length > 1) {
          return {
            amount: parts[0],
            name: parts.slice(1).join(' ')
          };
        }
        return { amount: '', name: trimmed };
      })
      .filter(ing => ing.name.trim()); // Filter out empty entries
  };

  // Parse instructions and remove numbered prefixes
  const parseInstructions = (text) => {
    if (!text.trim()) return '';
    return text
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const trimmed = line.trim();
        // Remove "1. ", "2. " etc prefix
        return trimmed.replace(/^\d+\.\s*/, '');
      })
      .join('\n');
  };

  // Recipe handlers
  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    if (!recipeForm.title || !recipeForm.instructions || !recipeForm.youtubeUrl || !recipeForm.categoryId) {
      alert('Lütfen tüm gerekli alanları doldurun');
      return;
    }

    try {
      // Parse ingredients and instructions before sending
      const parsedIngredients = recipeForm.ingredients[0].name ? recipeForm.ingredients : [];
      const parsedInstructions = parseInstructions(recipeForm.instructions);
      
      const submitData = {
        ...recipeForm,
        instructions: parsedInstructions,
        ingredients: parsedIngredients.length > 0 ? parsedIngredients : []
      };

      if (editingRecipeId) {
        await recipeService.updateRecipe(editingRecipeId, submitData);
        alert('Tarif güncellendi');
      } else {
        await recipeService.createRecipe(submitData);
        alert('Tarif oluşturuldu');
      }
      resetRecipeForm();
      fetchRecipes();
    } catch (error) {
      alert('İşlem başarısız: ' + error.message);
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
      try {
        await recipeService.deleteRecipe(id);
        alert('Tarif silindi');
        fetchRecipes();
      } catch (error) {
        alert('Silme işlemi başarısız: ' + error.message);
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
      alert('Kategori adı gereklidir');
      return;
    }

    try {
      if (editingCategoryId) {
        await categoryService.updateCategory(editingCategoryId, categoryForm);
        alert('Kategori güncellendi');
      } else {
        await categoryService.createCategory(categoryForm);
        alert('Kategori oluşturuldu');
      }
      resetCategoryForm();
      fetchCategories();
    } catch (error) {
      alert('İşlem başarısız: ' + error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        await categoryService.deleteCategory(id);
        alert('Kategori silindi');
        fetchCategories();
      } catch (error) {
        alert('Silme işlemi başarısız: ' + error.message);
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Admin Header */}
      <div className="text-white py-8 shadow-xl" style={{background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)'}}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            ⚙️ Admin Paneli
          </h1>
          <p className="text-green-100 text-lg">
            Tarifler ve kategorileri yönetin
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="container-custom mt-4">
          <div className="alert alert-success">
            ✓ {successMessage}
          </div>
        </div>
      )}

      <div className="container-custom py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl shadow-lg p-1">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex-1 px-6 py-4 font-bold rounded-lg transition-all duration-300 ${
              activeTab === 'recipes'
                ? 'text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              background: activeTab === 'recipes' ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' : 'transparent'
            }}
          >
            📖 Tarifler
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 px-6 py-4 font-bold rounded-lg transition-all duration-300 ${
              activeTab === 'categories'
                ? 'text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              background: activeTab === 'categories' ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' : 'transparent'
            }}
          >
            🏷️ Kategoriler
          </button>
        </div>

      {/* Recipes Tab */}
      {activeTab === 'recipes' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Recipe Form */}
          <div className="lg:col-span-2">
            <div className="card sticky top-24">
              <div className="card-header">
                <h2 className="card-title">
                  {editingRecipeId ? '✏️ Tarifi Düzenle' : '➕ Yeni Tarif'}
                </h2>
              </div>
              <form onSubmit={handleRecipeSubmit} className="space-y-5">
                <div>
                  <label className="form-label">
                    Tarif Adı *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={recipeForm.title}
                    onChange={handleRecipeChange}
                    className="form-input"
                    placeholder="Tarif adını girin"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={recipeForm.description}
                    onChange={handleRecipeChange}
                    className="form-textarea"
                    placeholder="Tarif açıklaması"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="form-label">
                    YouTube URL *
                  </label>
                  <input
                    type="text"
                    name="youtubeUrl"
                    value={recipeForm.youtubeUrl}
                    onChange={handleRecipeChange}
                    className="form-input"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div>
                  <label className="form-label">
                    Kategori *
                  </label>
                  <select
                    name="categoryId"
                    value={recipeForm.categoryId}
                    onChange={handleRecipeChange}
                    className="form-select"
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
                  <label className="form-label">
                    Malzemeleri (Ayrı Ayrı Girin) *
                  </label>
                  <div className="space-y-3 max-h-64 overflow-y-auto border border-green-200 rounded-lg p-4 bg-green-50">
                    {recipeForm.ingredients.map((ingredient, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3 items-center bg-white p-3 rounded-lg border border-green-100">
                        <div className="col-span-1">
                          <input
                            type="text"
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 bg-white"
                            placeholder="Miktar (örn: 125 g)"
                          />
                        </div>
                        <div className="col-span-1 flex gap-2">
                          <input
                            type="text"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            className="flex-1 px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 bg-white"
                            placeholder="Malzeme (örn: margarin)"
                          />
                          {recipeForm.ingredients.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newIngredients = recipeForm.ingredients.filter((_, i) => i !== index);
                                setRecipeForm(prev => ({
                                  ...prev,
                                  ingredients: newIngredients.length > 0 ? newIngredients : [{ name: '', amount: '' }]
                                }));
                              }}
                              className="px-3 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-bold text-base"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRecipeForm(prev => ({
                        ...prev,
                        ingredients: [...prev.ingredients, { name: '', amount: '' }]
                      }));
                    }}
                    className="mt-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold text-base w-full"
                  >
                    + Malzeme Ekle
                  </button>
                </div>

                <div>
                  <label className="form-label">
                    Yapılış Adımları (Satır satır) *
                  </label>
                  <textarea
                    name="instructions"
                    value={recipeForm.instructions}
                    onChange={handleRecipeChange}
                    className="form-textarea"
                    placeholder={`1. İlk adım buraya
2. İkinci adım buraya
3. Üçüncü adım buraya`}
                    rows="6"
                  />
                  <p className="text-xs text-gray-600 mt-2">Not: Numaralar otomatik olarak kaldırılır</p>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-lg"
                >
                  {editingRecipeId ? '💾 Güncelle' : '✨ Oluştur'}
                </button>

                {editingRecipeId && (
                  <button
                    type="button"
                    onClick={resetRecipeForm}
                    className="btn-secondary w-full text-lg"
                  >
                    ✕ İptal Et
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Recipes List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">📋 Tarifler ({recipes.length})</h2>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <span className="animate-spin text-5xl">🍳</span>
                </div>
              ) : recipes.length === 0 ? (
                <div className="alert alert-info">
                  Henüz tarif eklenmemiştir. Yukarıdaki form ile yeni tarif ekleyebilirsiniz.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-professional">
                    <thead>
                      <tr>
                        <th>📖 Adı</th>
                        <th>🏷️ Kategori</th>
                        <th>⚙️ İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipes.map(recipe => (
                        <tr key={recipe.id}>
                          <td className="font-semibold">{recipe.title}</td>
                          <td>
                            <span className="badge badge-primary">{recipe.category?.name}</span>
                          </td>
                          <td>
                            <button
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
                              className="text-primary hover:text-secondary font-bold mr-4"
                            >
                              ✏️ Düzenle
                            </button>
                            <button
                              onClick={() => handleDeleteRecipe(recipe.id)}
                              className="text-red-600 hover:text-red-800 font-bold"
                            >
                              🗑️ Sil
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Form */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="card-header">
                <h2 className="card-title">
                  {editingCategoryId ? '✏️ Kategoriyi Düzenle' : '➕ Yeni Kategori'}
                </h2>
              </div>
              <form onSubmit={handleCategorySubmit} className="space-y-5">
                <div>
                  <label className="form-label">
                    Kategori Adı *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={categoryForm.name}
                    onChange={handleCategoryChange}
                    className="form-input"
                    placeholder="Kategori adı"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={categoryForm.description}
                    onChange={handleCategoryChange}
                    className="form-textarea"
                    placeholder="Kategori açıklaması"
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-lg"
                >
                  {editingCategoryId ? '💾 Güncelle' : '✨ Oluştur'}
                </button>

                {editingCategoryId && (
                  <button
                    type="button"
                    onClick={resetCategoryForm}
                    className="btn-secondary w-full text-lg"
                  >
                    ✕ İptal Et
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">🏷️ Kategoriler ({categories.length})</h2>
              </div>
              {categories.length === 0 ? (
                <div className="alert alert-info">
                  Henüz kategori eklenmemiştir. Yukarıdaki form ile yeni kategori ekleyebilirsiniz.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-professional">
                    <thead>
                      <tr>
                        <th>🏷️ Adı</th>
                        <th>📖 Tarif Sayısı</th>
                        <th>⚙️ İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id}>
                          <td className="font-semibold">{category.name}</td>
                          <td>
                            <span className="badge badge-secondary">
                              {category.recipes?.length || 0} tarif
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setCategoryForm({
                                  name: category.name,
                                  description: category.description
                                });
                                setEditingCategoryId(category.id);
                              }}
                              className="text-primary hover:text-secondary font-bold mr-4"
                            >
                              ✏️ Düzenle
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600 hover:text-red-800 font-bold"
                            >
                              🗑️ Sil
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
