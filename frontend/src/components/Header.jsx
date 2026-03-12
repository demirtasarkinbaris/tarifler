import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useApi';

export default function Header() {
  const { categories } = useCategories();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" style={{borderBottom: '3px solid #16a34a'}}>
      <div className="container-custom py-3">
        {/* Main Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-2xl">🍳</span>
            <span className="text-lg font-black" style={{background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Tarifler
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-semibold text-sm transition-colors">
              Anasayfa
            </Link>
            <Link 
              to="/admin" 
              className="btn-primary text-xs py-2 px-3"
            >
              Admin
            </Link>
          </nav>
          <button 
            className="md:hidden text-xl"
            style={{color: '#16a34a'}}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Categories Navigation */}
        <div className="border-t-2 border-gray-100 py-3 mt-2 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="px-3 py-1.5 rounded-full font-semibold transition-all duration-300 text-xs hover:shadow-lg"
                style={{
                  background: '#f0fdf4',
                  color: '#166534',
                  border: '1.5px solid rgba(34, 197, 94, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                  e.target.style.color = 'white';
                  e.target.style.borderColor = '#16a34a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f0fdf4';
                  e.target.style.color = '#166534';
                  e.target.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                }}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4">
          <Link 
            to="/" 
            className="block py-2 font-semibold"
            style={{color: '#16a34a', hover: {color: '#15803d'}}}
            onClick={() => setMobileMenuOpen(false)}
          >
            Anasayfa
          </Link>
          <Link 
            to="/admin" 
            className="block py-2 text-gray-700 hover:text-primary font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin Paneli
          </Link>
        </div>
      )}
    </header>
  );
}
