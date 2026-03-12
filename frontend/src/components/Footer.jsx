import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white mt-20 border-t-4" style={{borderColor: '#16a34a', background: 'linear-gradient(135deg, #1b4f2f 0%, #166534 50%, #15803d 100%)'}}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🍳</span>
              <h3 className="text-3xl font-black text-white">
                Tarifler
              </h3>
            </div>
            <p className="text-green-100 leading-relaxed text-sm mb-6">
              En lezzetli Türk yemekleri tariflerini videoyla öğrenin ve evde mükemmel yemekler pişirin.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#" className="w-10 h-10 bg-green-700 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center text-lg">f</a>
              <a href="#" className="w-10 h-10 bg-green-700 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center text-lg">𝕏</a>
              <a href="#" className="w-10 h-10 bg-green-700 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center text-lg">📷</a>
              <a href="#" className="w-10 h-10 bg-green-700 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center text-lg">▶️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-green-600 pb-2">
              🔗 Hızlı Linkler
            </h4>
            <ul className="space-y-3 text-green-100 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors font-semibold flex items-center gap-2">
                  <span>→</span> Anasayfa
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white transition-colors font-semibold flex items-center gap-2">
                  <span>→</span> Admin Paneli
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors font-semibold flex items-center gap-2">
                  <span>→</span> Hakkımızda
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-green-600 pb-2">
              🍽️ Kategoriler
            </h4>
            <ul className="space-y-3 text-green-100 text-sm">
              <li><a href="/category/hamur-isi" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Hamur İşi</a></li>
              <li><a href="/category/tatli" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Tatlı</a></li>
              <li><a href="/category/ana-yemek" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Ana Yemek</a></li>
              <li><a href="/category/corba" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Çorba</a></li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white border-b-2 border-green-600 pb-2">
              📧 İletişim
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-green-100">
                <span className="text-white">📧</span>
                <div>
                  <p className="font-semibold text-white">E-posta</p>
                  <p>info@tarifler.com.tr</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-100">
                <span className="text-white">📱</span>
                <div>
                  <p className="font-semibold text-white">Telefon</p>
                  <p>+90 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-600 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-green-100 text-sm">
            <p>
              &copy; {currentYear} <span className="font-bold text-white">Tarifler</span> • Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-xs">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 hidden md:flex items-center justify-center animate-glow"
        style={{background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'}}
      >
        ↑
      </button>
    </footer>
  );
}
