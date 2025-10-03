"use client";

import { useState } from 'react';
import { ChevronLeft, ShoppingBag, MessageCircle, Phone, Menu, X, User, UserPlus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

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
          <span className="bg-gradient-gold text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-gold-light/30">
            {produit.categorie}
          </span>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-500 ${
          survol ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
      
      <div className="p-6 sm:p-8">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-sienna mb-3 leading-tight">{produit.nom}</h3>
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
          <button
            onClick={ouvrirWhatsApp}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WA</span>
          </button>
          
          <button
            onClick={appelTelephone}
            className="flex-1 bg-gradient-gold hover:opacity-90 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-gold"
          >
            <Phone className="w-4 h-4" />
            <span>Appeler</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PageProduits() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState("Tous");

  const basculerMenu = () => {
    setMenuOuvert(!menuOuvert);
  };

  const fermerMenu = () => {
    setMenuOuvert(false);
  };

  const produitsFiltres = categorieSelectionnee === "Tous" 
    ? produits 
    : produits.filter(produit => produit.categorie === categorieSelectionnee);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête de navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-elegant sticky top-0 z-50 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-black text-xl sm:text-2xl text-sienna group-hover:text-gold transition-colors duration-300">
                MEDEC-CI
              </span>
            </Link>
            
            {/* Menu desktop */}
            <div className="hidden lg:flex items-center justify-center space-x-8 xl:space-x-10">
              <Link href="/" className="relative text-sienna hover:text-gold font-semibold transition-colors duration-300 group">
                Accueil
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/a-propos" className="relative text-sienna hover:text-gold font-semibold transition-colors duration-300 group">
                À propos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/produits" className="relative text-gold font-bold transition-colors duration-300 group">
                Créations
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-gold transform scale-x-100 transition-transform duration-300"></span>
              </Link>
              <a href="/contact" className="relative text-sienna hover:text-gold font-semibold transition-colors duration-300 group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              </a>
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
              className="block text-sienna hover:text-gold font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Accueil
            </Link>
            <Link 
              href="/a-propos" 
              onClick={fermerMenu}
              className="block text-sienna hover:text-gold font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              À propos
            </Link>
            <Link 
              href="/produits" 
              onClick={fermerMenu}
              className="block text-gold font-bold py-2 text-sm sm:text-base"
            >
              Créations
            </Link>
            <a 
              href="/contact" 
              onClick={fermerMenu}
              className="block text-sienna hover:text-gold font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Contact
            </a>
            
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

      {/* Section d'intro Nos Produits */}
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('https://images.pexels.com/photos/5691640/pexels-photo-5691640.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-sienna/90 via-primary/80 to-cocoa/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-gold-light" />
              <span className="text-sm font-medium text-gold-light tracking-wide">NOS CRÉATIONS</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight text-gradient-animated">
              Nos Créations d'Exception
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              Découvrez notre collection complète de créations artisanales de haute qualité, 
              chacune racontant une histoire unique de tradition et de savoir-faire ivoirien.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="bg-gradient-to-br from-ivory to-white py-8 sm:py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-sienna mb-4">Filtrer par catégorie</h2>
            <p className="text-gray-600">Découvrez nos créations par type d'artisanat</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {categories.map((categorie) => (
              <button
                key={categorie}
                onClick={() => setCategorieSelectionnee(categorie)}
                className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  categorieSelectionnee === categorie
                    ? 'bg-gradient-gold text-white shadow-lg hover:shadow-gold transform scale-105'
                    : 'bg-white text-sienna hover:bg-gray-50 border border-gray-200 hover:border-gold'
                }`}
              >
                {categorie}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille de produits */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {produitsFiltres.map((produit, index) => (
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
              <div className="bg-white rounded-2xl p-12 shadow-elegant max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-sienna mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500">Aucune création dans cette catégorie pour le moment.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}