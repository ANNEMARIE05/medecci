"use client";

import Link from 'next/link';
import { Sparkles, Star, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-sienna via-primary to-cocoa py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Effet de fond décoratif */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gold-light rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-bronze rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Section Logo et Description */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="font-display font-black text-2xl text-white group-hover:text-gold-light transition-colors duration-300">
                MEDEC-CI
              </span>
            </Link>
            
            <p className="text-white/90 leading-relaxed text-lg max-w-md">
              Votre partenaire premium pour découvrir l'artisanat ivoirien d'exception. 
              Chaque création raconte une histoire unique de tradition, de savoir-faire et de passion.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-light fill-current" />
                  ))}
                </div>
                <span className="text-white font-semibold">4.9/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">1000+ clients</span>
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Navigation
            </h3>
            <nav className="space-y-3">
              <Link 
                href="/" 
                className="block text-white/80 hover:text-gold-light transition-colors duration-300 hover:translate-x-2 transform"
              >
                Accueil
              </Link>
              <Link 
                href="/a-propos" 
                className="block text-white/80 hover:text-gold-light transition-colors duration-300 hover:translate-x-2 transform"
              >
                À propos
              </Link>
              <Link 
                href="/produits" 
                className="block text-white/80 hover:text-gold-light transition-colors duration-300 hover:translate-x-2 transform"
              >
                Créations
              </Link>
              <Link 
                href="/contact" 
                className="block text-white/80 hover:text-gold-light transition-colors duration-300 hover:translate-x-2 transform"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Section Contact */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-light" />
                </div>
                <div>
                  <p className="text-white font-semibold">+225 01 23 45 67 89</p>
                  <p className="text-white/70 text-sm">Appelez-nous</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-light" />
                </div>
                <div>
                  <p className="text-white font-semibold">contact@medecci.ci</p>
                  <p className="text-white/70 text-sm">Écrivez-nous</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-light" />
                </div>
                <div>
                  <p className="text-white font-semibold">Abidjan, Côte d'Ivoire</p>
                  <p className="text-white/70 text-sm">Notre localisation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-white/20 my-12"></div>

        {/* Copyright */}
        <div className="text-center space-y-4">
          <p className="text-white/80 text-sm">
            © 2024 MEDEC-CI. Tous droits réservés. Artisanat Premium Ivoirien.
          </p>
          <p className="text-white/60 text-xs">
            Fait avec ❤️ en Côte d'Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
