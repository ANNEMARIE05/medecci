"use client";

import { useState } from 'react';
import { MessageCircle, Phone, Menu, X, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PageContact() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const basculerMenu = () => setMenuOuvert(!menuOuvert);
  const fermerMenu = () => setMenuOuvert(false);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm sm:text-lg">MEDEC-CI</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-blue-900">MEDEC-CI</h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-none hidden sm:block">MEDEC-CI</p>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link href="/" className="text-black hover:text-orange-600 font-semibold transition-colors text-sm xl:text-base">Accueil</Link>
              <Link href="/produits" className="text-black hover:text-orange-600 font-semibold transition-colors text-sm xl:text-base">Produits</Link>
              <a href="/contact" className="text-orange-600 font-bold text-sm xl:text-base">Contact</a>
              <div className="flex items-center space-x-3">
                <Link href="/login" className="flex items-center space-x-2 text-black hover:text-orange-600 font-semibold transition-colors text-sm xl:text-base">
                  <User className="w-4 h-4" />
                  <span>Se connecter</span>
                </Link>
                <Link href="/register" className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm xl:text-base">
                  <UserPlus className="w-4 h-4" />
                  <span>S'inscrire</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={basculerMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-100 transition-colors"
              >
                {menuOuvert ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${menuOuvert ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t border-gray-200`}>
          <div className="px-4 py-4 space-y-4">
            <Link 
              href="/" 
              onClick={fermerMenu}
              className="block text-black hover:text-orange-600 font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Accueil
            </Link>
            <Link 
              href="/produits" 
              onClick={fermerMenu}
              className="block text-black hover:text-orange-600 font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Produits
            </Link>
            <a 
              href="/contact" 
              onClick={fermerMenu}
              className="block text-orange-600 font-bold py-2 text-sm sm:text-base"
            >
              Contact
            </a>
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link href="/login" onClick={fermerMenu} className="flex items-center space-x-2 w-full text-black hover:text-orange-600 font-semibold transition-colors py-2 text-sm sm:text-base">
                <User className="w-4 h-4" />
                <span>Se connecter</span>
              </Link>
              <Link href="/register" onClick={fermerMenu} className="flex items-center space-x-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base">
                <UserPlus className="w-4 h-4" />
                <span>S'inscrire</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-blue-900 mb-4">Contactez-nous</h1>
          <p className="text-gray-700 text-base sm:text-lg mb-8">Notre équipe est à votre écoute pour toute question ou demande d'information. N'hésitez pas à nous joindre directement !</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('https://wa.me/33123456789', '_blank')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </Button>
            <Button
              onClick={() => window.location.href = 'tel:+33123456789'}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 text-sm"
            >
              <Phone className="w-5 h-5" />
              <span>Appeler</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-lg sm:text-xl">MEDEC-CI</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">MEDEC-CI</h3>
                  <p className="text-sm sm:text-base text-gray-400">MEDEC-CI</p>
                </div>
              </Link>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md">
                Votre partenaire de confiance pour tous vos équipements professionnels. 
                Qualité, innovation et service client au cœur de notre engagement.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Navigation</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Accueil</Link></li>
                <li><Link href="/produits" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Produits</Link></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm sm:text-base">+33 1 23 45 67 89</li>
                <li className="text-gray-400 text-sm sm:text-base">contact@mdt-pro.fr</li>
                <li className="text-gray-400 text-sm sm:text-base">Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              © 2024 MEDEC-CI - MEDEC-CI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 