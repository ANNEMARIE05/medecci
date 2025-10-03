"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, UserPlus, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage?: 'accueil' | 'a-propos' | 'creations' | 'contact' | 'login' | 'register';
}

export default function Navbar({ currentPage = 'accueil' }: NavbarProps) {
  const [menuOuvert, setMenuOuvert] = useState(false);

  const basculerMenu = () => {
    setMenuOuvert(!menuOuvert);
  };

  const fermerMenu = () => {
    setMenuOuvert(false);
  };

  const getLinkClasses = (page: string) => {
    const baseClasses = "relative font-semibold transition-colors duration-300 group";
    const isActive = currentPage === page;
    
    if (isActive) {
      return `${baseClasses} text-gold`;
    }
    return `${baseClasses} text-sienna hover:text-gold`;
  };

  const getMobileLinkClasses = (page: string) => {
    const isActive = currentPage === page;
    const baseClasses = "block font-semibold transition-colors py-2 text-sm sm:text-base";
    
    if (isActive) {
      return `${baseClasses} text-gold font-bold`;
    }
    return `${baseClasses} text-sienna hover:text-gold`;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-elegant sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-black text-xl sm:text-2xl text-sienna group-hover:text-gold transition-colors duration-300">
              MEDEC-CI
            </span>
          </Link>
          
          {/* Menu desktop - Centré */}
          <div className="hidden lg:flex items-center justify-center space-x-8 xl:space-x-10">
            <Link href="/" className={getLinkClasses('accueil')}>
              Accueil
              {currentPage === 'accueil' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-100 transition-transform duration-300"></span>
              )}
              {currentPage !== 'accueil' && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>
            <Link href="/a-propos" className={getLinkClasses('a-propos')}>
              À propos
              {currentPage === 'a-propos' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-100 transition-transform duration-300"></span>
              )}
              {currentPage !== 'a-propos' && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>
            <Link href="/produits" className={getLinkClasses('creations')}>
              Créations
              {currentPage === 'creations' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-100 transition-transform duration-300"></span>
              )}
              {currentPage !== 'creations' && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>
            <Link href="/contact" className={getLinkClasses('contact')}>
              Contact
              {currentPage === 'contact' && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-100 transition-transform duration-300"></span>
              )}
              {currentPage !== 'contact' && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>
          </div>
          
          {/* Boutons connexion/inscription */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/login" className="flex items-center space-x-2 text-sienna hover:text-gold font-semibold transition-colors duration-300 group">
              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Se connecter</span>
            </Link>
            <Link href="/register" className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-gold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-premium hover:shadow-gold overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                S'inscrire
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={basculerMenu}
              className="p-3 rounded-xl text-sienna hover:text-gold hover:bg-gray-50 transition-all duration-300"
            >
              {menuOuvert ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        menuOuvert ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-200`}>
        <div className="px-4 py-4 space-y-4">
          <Link 
            href="/" 
            onClick={fermerMenu}
            className={getMobileLinkClasses('accueil')}
          >
            Accueil
          </Link>
          <Link 
            href="/a-propos" 
            onClick={fermerMenu}
            className={getMobileLinkClasses('a-propos')}
          >
            À propos
          </Link>
          <Link 
            href="/produits" 
            onClick={fermerMenu}
            className={getMobileLinkClasses('creations')}
          >
            Créations
          </Link>
          <Link 
            href="/contact" 
            onClick={fermerMenu}
            className={getMobileLinkClasses('contact')}
          >
            Contact
          </Link>
          {/* Boutons connexion/inscription dans le menu mobile */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Link 
              href="/login"
              onClick={fermerMenu}
              className="flex items-center space-x-2 w-full text-sienna hover:text-gold font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              <User className="w-4 h-4" />
              <span>Se connecter</span>
            </Link>
            <Link 
              href="/register"
              onClick={fermerMenu}
              className="flex items-center space-x-2 w-full bg-gradient-gold text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
            >
              <UserPlus className="w-4 h-4" />
              <span>S'inscrire</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
