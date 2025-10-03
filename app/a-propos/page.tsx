"use client";

import React, { useState } from 'react';
import { MessageCircle, Phone, Menu, X, User, UserPlus, Sparkles, Users, Award, Heart, Globe, Shield, Zap, CheckCircle, TrendingUp, Clock, MapPin, ArrowUp, Star, Target, Lightbulb, Handshake } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
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
      <Navbar currentPage="a-propos" />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('https://images.pexels.com/photos/5691640/pexels-photo-5691640.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-sienna/90 via-primary/80 to-cocoa/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-gold-light" />
              <span className="text-sm font-medium text-gold-light tracking-wide">NOTRE HISTOIRE</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight text-gradient-animated">
              À propos de MEDEC-CI
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Découvrez l'histoire passionnante de notre aventure, notre mission et nos valeurs qui nous guident 
              dans la valorisation de l'artisanat ivoirien.
            </p>
          </div>
        </div>
      </section>

      {/* Section Notre Mission */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-6 shadow-lg">
                <Target className="w-5 h-5" />
                <span className="font-semibold text-sm tracking-wide">NOTRE MISSION</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sienna mb-6">
                Valoriser l'artisanat ivoirien
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Chez MEDEC-CI, nous croyons fermement que l'artisanat ivoirien mérite d'être reconnu et valorisé 
                à sa juste valeur. Notre mission est de créer un pont entre les artisans talentueux et les amateurs 
                d'art authentique, tout en préservant les traditions ancestrales.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sienna mb-2">Préservation des traditions</h3>
                    <p className="text-gray-600">Nous nous engageons à préserver et transmettre les savoir-faire ancestraux.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sienna mb-2">Développement local</h3>
                    <p className="text-gray-600">Nous soutenons les communautés artisanales pour un développement durable.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sienna mb-2">Qualité exceptionnelle</h3>
                    <p className="text-gray-600">Chaque création est soigneusement sélectionnée pour sa qualité et son authenticité.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-gold rounded-3xl transform rotate-3"></div>
                <Image
                  src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Artisans ivoiriens"
                  width={600}
                  height={400}
                  className="relative rounded-3xl shadow-premium"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Notre Histoire */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Lightbulb className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">NOTRE HISTOIRE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sienna mb-6">
              Une aventure qui a commencé par une passion
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment MEDEC-CI est née d'une passion commune pour l'artisanat ivoirien
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2019</span>
              </div>
              <h3 className="font-display text-xl font-bold text-sienna mb-4">Les débuts</h3>
              <p className="text-gray-600 leading-relaxed">
                Fondation de MEDEC-CI avec une vision simple : mettre en valeur l'artisanat ivoirien 
                et créer des opportunités pour les artisans locaux.
              </p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2021</span>
              </div>
              <h3 className="font-display text-xl font-bold text-sienna mb-4">L'expansion</h3>
              <p className="text-gray-600 leading-relaxed">
                Développement de notre réseau d'artisans partenaires et lancement de notre plateforme 
                en ligne pour démocratiser l'accès aux créations artisanales.
              </p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2024</span>
              </div>
              <h3 className="font-display text-xl font-bold text-sienna mb-4">L'avenir</h3>
              <p className="text-gray-600 leading-relaxed">
                Aujourd'hui, nous continuons à innover et à grandir, toujours guidés par notre mission 
                de valorisation de l'artisanat ivoirien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Valeurs */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sienna/5 to-cocoa/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Heart className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">NOS VALEURS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sienna mb-6">
              Ce qui nous guide au quotidien
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nos valeurs sont le socle de notre engagement et guident chacune de nos actions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Authenticité",
                description: "Chaque création respecte les traditions ancestrales et reflète la véritable culture ivoirienne.",
                color: "text-blue-500"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Nous nous engageons pour une qualité irréprochable dans chaque détail de nos créations.",
                color: "text-gold"
              },
              {
                icon: Users,
                title: "Solidarité",
                description: "Nous soutenons les communautés artisanales et favorisons le développement local.",
                color: "text-green-500"
              },
              {
                icon: Handshake,
                title: "Confiance",
                description: "Nous construisons des relations durables basées sur la transparence et la confiance mutuelle.",
                color: "text-purple-500"
              }
            ].map((valeur, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-elegant flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <valeur.icon className={`w-10 h-10 ${valeur.color}`} />
                </div>
                <h3 className="font-display text-xl font-bold text-sienna mb-4">{valeur.title}</h3>
                <p className="text-gray-600 leading-relaxed">{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Users className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">NOTRE ÉQUIPE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sienna mb-6">
              Rencontrez notre équipe passionnée
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des professionnels dévoués qui partagent la même passion pour l'artisanat ivoirien
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aminata Koné",
                role: "Fondatrice & Directrice",
                description: "Passionnée d'artisanat depuis l'enfance, Aminata a créé MEDEC-CI pour valoriser le savoir-faire ivoirien.",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              },
              {
                name: "Jean-Baptiste Kouadio",
                role: "Directeur Technique",
                description: "Expert en e-commerce et développement, Jean-Baptiste supervise la plateforme et l'innovation technologique.",
                image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              },
              {
                name: "Fatou Diabaté",
                role: "Responsable Relations Artisans",
                description: "Fatou développe et entretient les relations avec nos artisans partenaires à travers tout le pays.",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              }
            ].map((membre, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-elegant group-hover:shadow-premium transition-all duration-300">
                    <Image
                      src={membre.image}
                      alt={membre.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                </div>
                <h3 className="font-display text-xl font-bold text-sienna mb-2">{membre.name}</h3>
                <p className="text-gold font-semibold mb-4">{membre.role}</p>
                <p className="text-gray-600 leading-relaxed">{membre.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sienna via-primary to-cocoa">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Nos réalisations en chiffres
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Des résultats qui témoignent de notre engagement et de notre impact
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "500+", label: "Artisans partenaires" },
              { icon: Globe, number: "25+", label: "Pays desservis" },
              { icon: Star, number: "10K+", label: "Créations vendues" },
              { icon: Heart, number: "98%", label: "Satisfaction client" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-gold-light" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-8 shadow-lg">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">REJOIGNEZ-NOUS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-sienna leading-tight">
              Prêt à découvrir l'artisanat d'exception ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explorez notre collection unique et découvrez des créations qui racontent l'histoire de la Côte d'Ivoire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/produits" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-gold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-premium hover:shadow-gold overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Découvrir nos créations
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/contact" 
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-sienna border-2 border-sienna/30 rounded-xl transition-all duration-300 hover:bg-sienna/5 hover:border-sienna/50"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Nous contacter
                </span>
              </Link>
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
