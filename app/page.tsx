"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ShoppingBag, MessageCircle, Phone, Menu, X, User, UserPlus, ChevronRight, Star, Award, Heart, Sparkles, ArrowUp, Users, Globe, Shield, Zap, CheckCircle, TrendingUp, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Définir HeroSlider ici :
const donneesHero = [
  {
    id: 1,
    titre: "L'artisanat ivoirien à l'honneur",
    sousTitre: "Découvrez les talents locaux",
    description: "Des créations uniques, faites main, par des artisans passionnés de Côte d'Ivoire.",
    imageUrl: "https://images.pexels.com/photos/5691640/pexels-photo-5691640.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
  },
  {
    id: 2,
    titre: "Des produits authentiques",
    sousTitre: "Qualité, tradition et innovation",
    description: "Textiles, sculptures, cosmétiques naturels, épices... tout le savoir-faire local sur une seule plateforme.",
    imageUrl: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
  },
  {
    id: 3,
    titre: "Soutenez les artisans",
    sousTitre: "Achetez local, changez des vies",
    description: "Chaque achat contribue à la valorisation et au développement des communautés artisanales.",
    imageUrl: "https://images.pexels.com/photos/5691641/pexels-photo-5691641.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
  }
];

function HeroSlider() {
  const [indexActuel, setIndexActuel] = useState(0);

  const slideSuivant = () => setIndexActuel((prev) => (prev + 1) % donneesHero.length);
  const slidePrecedent = () => setIndexActuel((prev) => (prev - 1 + donneesHero.length) % donneesHero.length);

  // Auto-slide
  useEffect(() => {
    const intervalle = setInterval(slideSuivant, 6000);
    return () => clearInterval(intervalle);
  }, []);

  return (
    <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
      {donneesHero.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === indexActuel ? 'translate-x-0 opacity-100' : index < indexActuel ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sienna/90 via-primary/80 to-cocoa/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
              <div className="max-w-5xl mx-auto text-white animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
                  <Sparkles className="w-4 h-4 text-gold-light" />
                  <span className="text-sm sm:text-base font-medium text-gold-light tracking-wide">
                    {slide.sousTitre}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-tight text-gradient-animated">
                  {slide.titre}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed text-white/90 font-light">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  <Link 
                    href="/produits" 
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-gold rounded-lg transition-all duration-300 hover:scale-105 shadow-premium hover:shadow-gold overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Découvrir nos créations
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Nous contacter
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={slidePrecedent}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-110 z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={slideSuivant}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-110 z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {donneesHero.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndexActuel(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
              index === indexActuel 
                ? 'bg-gold-light scale-125 border-gold-light shadow-lg' 
                : 'bg-white/30 border-white/50 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const produits = [
  {
    id: 1,
    nom: "Pagnes Traditionnels",
    description: "Tissus colorés et motifs traditionnels africains pour vêtements et décoration",
    prix: "12.500",
    imageUrl: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Textiles"
  },
  {
    id: 2,
    nom: "Fruits Frais Locaux",
    description: "Sélection de fruits frais de saison : mangues, bananes, oranges et ananas",
    prix: "3.200",
    imageUrl: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Alimentation"
  },
  {
    id: 3,
    nom: "Poteries Artisanales",
    description: "Vases, pots et ustensiles en terre cuite fabriqués à la main par nos artisans",
    prix: "8.900",
    imageUrl: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Artisanat"
  },
  {
    id: 4,
    nom: "Bijoux Traditionnels",
    description: "Colliers, bracelets et parures en perles et métaux précieux",
    prix: "15.750",
    imageUrl: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Bijouterie"
  },
  {
    id: 5,
    nom: "Épices et Condiments",
    description: "Mélanges d'épices traditionnelles et condiments locaux pour cuisine",
    prix: "2.800",
    imageUrl: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Alimentation"
  },
  {
    id: 6,
    nom: "Sculptures sur Bois",
    description: "Masques, statuettes et objets décoratifs sculptés dans le bois local",
    prix: "25.400",
    imageUrl: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Artisanat"
  },
  {
    id: 7,
    nom: "Huiles Essentielles",
    description: "Huiles naturelles extraites de plantes locales pour soins et bien-être",
    prix: "6.500",
    imageUrl: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Bien-être"
  },
  {
    id: 8,
    nom: "Tissus Wax",
    description: "Tissus imprimés aux couleurs vives et motifs africains authentiques",
    prix: "18.900",
    imageUrl: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Textiles"
  },
  {
    id: 9,
    nom: "Produits de Beauté",
    description: "Savons, crèmes et produits de soin naturels fabriqués localement",
    prix: "4.200",
    imageUrl: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Bien-être"
  }
];

const categories = ["Tous", "Textiles", "Alimentation", "Artisanat", "Bijouterie", "Bien-être"];

const CarteProduit = ({ produit }: { produit: typeof produits[0] }) => {
  const [survol, setSurvol] = useState(false);

  const ouvrirWhatsApp = () => {
    const message = `Bonjour, je suis intéressé(e) par le produit: ${produit.nom}`;
    window.open(`https://wa.me/33123456789?text=${encodeURIComponent(message)}`, '_blank');
  };

  const appelTelephone = () => {
    window.location.href = 'tel:+33123456789';
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-elegant overflow-hidden transition-all duration-500 hover:shadow-premium hover:-translate-y-3 border border-gray-100/50"
      onMouseEnter={() => setSurvol(true)}
      onMouseLeave={() => setSurvol(false)}
    >
      <div className="relative overflow-hidden">
        <Image
          src={produit.imageUrl}
          alt={produit.nom}
          width={320}
          height={240}
          className={`w-full h-52 sm:h-60 lg:h-72 object-cover transition-all duration-700 ${
            survol ? 'scale-110 brightness-110' : 'scale-100 brightness-100'
          }`}
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-gold text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-gold-light/30">
            <Award className="w-3 h-3 mr-1" />
            {produit.categorie}
          </Badge>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-500 ${
          survol ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Heart className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </div>
      
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-sienna mb-2 leading-tight">{produit.nom}</h3>
          <div className="flex items-center gap-1 ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-gold text-gold" />
            ))}
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed font-light">{produit.description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-sienna">{produit.prix}</span>
              <span className="text-sm text-gray-500 font-medium">FCFA</span>
            </div>
            <span className="text-xs text-green-600 font-semibold mt-1">Livraison gratuite</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-700 font-semibold">En stock</span>
          </div>
        </div>
        
        <div className="flex flex-row gap-3">
          <Button
            onClick={ouvrirWhatsApp}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WA</span>
          </Button>
          
          <Button
            onClick={appelTelephone}
            className="flex-1 bg-gradient-gold hover:opacity-90 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-gold"
          >
            <Phone className="w-4 h-4" />
            <span>Appeler</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState("Tous");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const produitsFiltres = categorieSelectionnee === "Tous" 
    ? produits 
    : produits.filter(produit => produit.categorie === categorieSelectionnee);

  // Scroll to top functionality
  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar currentPage="accueil" />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Section nos valeurs */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Shield className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">NOS VALEURS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sienna mb-6">
              Ce qui nous guide
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des valeurs fortes qui transforment chaque création en œuvre d'art
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Heart,
                title: "Authenticité",
                description: "Chaque création respecte les traditions ancestrales et reflète la véritable culture ivoirienne.",
                color: "text-red-500"
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
              }
            ].map((valeur, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
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

      {/* Section sélection premium */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Award className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">SÉLECTION PREMIUM</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sienna mb-6">
              Nos Créations d'Exception
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Découvrez une sélection soigneusement choisie de nos plus belles créations artisanales, 
              chaque pièce raconte une histoire unique de tradition et de savoir-faire ivoirien.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {produits.slice(0, 6).map((produit, index) => (
              <div 
                key={produit.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CarteProduit produit={produit} />
              </div>
            ))}
          </div>
          
          {produitsFiltres.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-8 shadow-elegant max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">Aucun produit trouvé dans cette catégorie.</p>
              </div>
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Link 
              href="/produits" 
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-gold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-premium hover:shadow-gold overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Découvrir toutes nos créations
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section statistiques */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sienna via-primary to-cocoa">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Notre Impact
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Depuis notre création, nous avons contribué à valoriser l'artisanat ivoirien
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "500+", label: "Artisans partenaires" },
              { icon: ShoppingBag, number: "10K+", label: "Créations vendues" },
              { icon: Globe, number: "25+", label: "Pays desservis" },
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

      {/* Section témoignages */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sienna/5 to-cocoa/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <Star className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">TÉMOIGNAGES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-sienna mb-6">
              Ce que disent nos clients
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              La satisfaction de nos clients est notre plus belle récompense
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aminata Traoré",
                role: "Collectionneuse d'art",
                content: "Les créations MEDEC-CI sont d'une beauté exceptionnelle. Chaque pièce raconte une histoire et apporte une authenticité rare à ma collection.",
                rating: 5
              },
              {
                name: "Jean-Baptiste Kouadio",
                role: "Architecte d'intérieur",
                content: "Je recommande vivement MEDEC-CI à mes clients. La qualité et l'originalité de leurs créations transforment chaque espace.",
                rating: 5
              },
              {
                name: "Fatou Diabaté",
                role: "Entrepreneuse",
                content: "Grâce à MEDEC-CI, j'ai découvert des artisans talentueux. Leur plateforme facilite vraiment l'accès à l'artisanat de qualité.",
                rating: 5
              }
            ].map((temoignage, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-elegant hover:shadow-premium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(temoignage.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">"{temoignage.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sienna">{temoignage.name}</div>
                    <div className="text-sm text-gray-500">{temoignage.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sienna via-primary to-cocoa">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <Zap className="w-5 h-5 text-gold-light" />
              <span className="text-sm font-medium text-gold-light tracking-wide">JOIGNEZ-VOUS À NOUS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              Prêt à découvrir l'artisanat d'exception ?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Rejoignez notre communauté et découvrez des créations uniques qui racontent l'histoire de la Côte d'Ivoire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/produits" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-sienna bg-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-premium overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Explorer nos créations
                </span>
                <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/a-propos" 
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  En savoir plus
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
