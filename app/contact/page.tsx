"use client";

import React, { useState } from 'react';
import { MessageCircle, Phone, Menu, X, User, UserPlus, Sparkles, MapPin, Clock, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PageContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top functionality
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30">
      {/* Navbar */}
      <Navbar currentPage="contact" />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('https://images.pexels.com/photos/5691640/pexels-photo-5691640.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-sienna/90 via-primary/80 to-cocoa/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <MessageCircle className="w-5 h-5 text-gold-light" />
              <span className="text-sm font-medium text-gold-light tracking-wide">CONTACTEZ-NOUS</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight text-gradient-animated">
              Nous sommes là pour vous
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Notre équipe d'experts est à votre écoute pour toute question ou demande d'information. 
              N'hésitez pas à nous joindre directement !
            </p>
          </div>
        </div>
      </section>

      {/* Section contact principale */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Formulaire de contact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-premium p-8 sm:p-10 border border-gray-100/50">
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold text-sienna mb-4">Envoyez-nous un message</h2>
                <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-sienna mb-3">Prénom *</label>
                    <input
                      type="text"
                      className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-sienna mb-3">Nom *</label>
                    <input
                      type="text"
                      className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-sienna mb-3">Email *</label>
                  <input
                    type="email"
                    className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-sienna mb-3">Téléphone</label>
                  <input
                    type="tel"
                    className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="+225 01 23 45 67 89"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-sienna mb-3">Sujet *</label>
                  <select className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm">
                    <option>Sélectionnez un sujet</option>
                    <option>Question sur un produit</option>
                    <option>Commande personnalisée</option>
                    <option>Partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-sienna mb-3">Message *</label>
                  <textarea
                    rows={4}
                    className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Décrivez votre demande..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group relative w-full bg-gradient-gold hover:opacity-90 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-premium hover:shadow-gold flex items-center justify-center space-x-3 overflow-hidden"
                >
                  <span>Envoyer le message</span>
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
            
            {/* Informations de contact */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-gray-100/50">
                <h3 className="font-display text-2xl font-bold text-sienna mb-6">Informations de contact</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sienna mb-1">Téléphone</h4>
                      <p className="text-gray-600">+225 01 23 45 67 89</p>
                      <p className="text-sm text-gray-500">Lun-Ven: 8h-18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sienna mb-1">Email</h4>
                      <p className="text-gray-600">contact@medecci.ci</p>
                      <p className="text-sm text-gray-500">Réponse sous 24h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sienna mb-1">Adresse</h4>
                      <p className="text-gray-600">Abidjan, Côte d'Ivoire</p>
                      <p className="text-sm text-gray-500">Centre-ville</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sienna mb-1">Horaires</h4>
                      <p className="text-gray-600">Lundi - Vendredi: 8h00 - 18h00</p>
                      <p className="text-gray-600">Samedi: 9h00 - 16h00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact rapide */}
              <div className="bg-gradient-to-br from-sienna/5 to-cocoa/5 rounded-2xl p-8 border border-sienna/10">
                <h3 className="font-display text-xl font-bold text-sienna mb-6">Contact rapide</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={() => window.open('https://wa.me/33123456789', '_blank')}
                    className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>WhatsApp</span>
                  </Button>
                  <Button
                    onClick={() => window.location.href = 'tel:+33123456789'}
                    className="group bg-gradient-gold hover:opacity-90 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-gold"
                  >
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Appeler</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bouton scroll to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-gold text-white rounded-full shadow-lg hover:shadow-gold transition-all duration-300 transform hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <ArrowUp className="w-6 h-6 mx-auto" />
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
} 