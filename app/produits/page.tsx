"use client";

import { useState } from 'react';
import { ChevronLeft, ShoppingBag, MessageCircle, Phone, Menu, X, User, UserPlus } from 'lucide-react';
import Link from 'next/link';

const produits = [
  {
    id: 1,
    nom: "Kit Outillage Professionnel",
    description: "Ensemble complet d'outils professionnels de haute qualité pour tous travaux de maintenance et réparation",
    prix: "179.400",
    imageUrl: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Outillage"
  },
  {
    id: 2,
    nom: "Équipement de Sécurité",
    description: "Protection individuelle complète conforme aux normes européennes pour tous les corps de métier",
    prix: "53.460",
    imageUrl: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Sécurité"
  },
  {
    id: 3,
    nom: "Matériel de Mesure",
    description: "Instruments de mesure précis et fiables pour professionnels exigeants dans tous les domaines",
    prix: "95.540",
    imageUrl: "https://images.pexels.com/photos/6256298/pexels-photo-6256298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Mesure"
  },
  {
    id: 4,
    nom: "Vêtements de Travail",
    description: "Tenues professionnelles confortables et résistantes adaptées à tous les environnements de travail",
    prix: "47.480",
    imageUrl: "https://images.pexels.com/photos/7937675/pexels-photo-7937675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Vêtements"
  },
  {
    id: 5,
    nom: "Machines Portatives",
    description: "Machines légères et puissantes pour tous vos chantiers et travaux de construction",
    prix: "269.640",
    imageUrl: "https://images.pexels.com/photos/5691641/pexels-photo-5691641.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Machines"
  },
  {
    id: 6,
    nom: "Consommables Pro",
    description: "Fournitures et consommables de qualité professionnelle pour tous vos besoins quotidiens",
    prix: "23.440",
    imageUrl: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Consommables"
  },
  {
    id: 7,
    nom: "Équipement Électrique",
    description: "Matériel électrique professionnel certifié pour installations et maintenance électrique",
    prix: "134.200",
    imageUrl: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Électrique"
  },
  {
    id: 8,
    nom: "Outillage Spécialisé",
    description: "Outils spécialisés pour métiers techniques nécessitant une précision et une qualité exceptionnelles",
    prix: "198.750",
    imageUrl: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Spécialisé"
  },
  {
    id: 9,
    nom: "Matériel de Levage",
    description: "Équipements de levage et manutention conformes aux normes de sécurité les plus strictes",
    prix: "312.890",
    imageUrl: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Levage"
  }
];

const categories = ["Tous", "Outillage", "Sécurité", "Mesure", "Vêtements", "Machines", "Consommables", "Électrique", "Spécialisé", "Levage"];

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
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setSurvol(true)}
      onMouseLeave={() => setSurvol(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={produit.imageUrl}
          alt={produit.nom}
          className={`w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 ${
            survol ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className="bg-blue-900 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {produit.categorie}
          </span>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
          survol ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{produit.nom}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{produit.description}</p>
        
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black text-blue-900">{produit.prix}</span>
            <span className="text-sm text-gray-500 font-semibold">FCFA</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <span className="text-xs sm:text-sm text-gray-500">En stock</span>
          </div>
        </div>
        
        <div className="flex flex-row gap-2 sm:gap-3">
          <button
            onClick={ouvrirWhatsApp}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 transform hover:scale-105 text-xs sm:text-sm"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WA</span>
          </button>
          
          <button
            onClick={appelTelephone}
            className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 transform hover:scale-105 text-xs sm:text-sm"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
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
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm sm:text-lg">MDT</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-blue-900">MDT</h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-none hidden sm:block">Mouvement des Travailleurs</p>
              </div>
            </Link>
            
            {/* Menu desktop */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-900 font-semibold transition-colors text-sm xl:text-base">
                Accueil
              </Link>
              <Link href="/produits" className="text-blue-900 font-semibold text-sm xl:text-base">
                Produits
              </Link>
              <a href="/#contact" className="text-gray-700 hover:text-blue-900 font-semibold transition-colors text-sm xl:text-base">
                Contact
              </a>
              <div className="flex items-center space-x-3">
                <Link href="/login" className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 font-semibold transition-colors text-sm xl:text-base">
                  <User className="w-4 h-4" />
                  <span>Se connecter</span>
                </Link>
                <Link href="/register" className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm xl:text-base">
                  <UserPlus className="w-4 h-4" />
                  <span>S'inscrire</span>
                </Link>
              </div>
            </div>

            {/* Boutons mobile/tablet */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* Bouton menu burger */}
              <button
                onClick={basculerMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-100 transition-colors"
              >
                {menuOuvert ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
              className="block text-gray-700 hover:text-blue-900 font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Accueil
            </Link>
            <Link 
              href="/produits" 
              onClick={fermerMenu}
              className="block text-blue-900 font-semibold py-2 text-sm sm:text-base"
            >
              Produits
            </Link>
            <a 
              href="/#contact" 
              onClick={fermerMenu}
              className="block text-gray-700 hover:text-blue-900 font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Contact
            </a>
            
            {/* Boutons connexion/inscription dans le menu mobile */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link 
                href="/login"
                onClick={fermerMenu}
                className="flex items-center space-x-2 w-full text-gray-700 hover:text-blue-900 font-semibold transition-colors py-2 text-sm sm:text-base"
              >
                <User className="w-4 h-4" />
                <span>Se connecter</span>
              </Link>
              <Link 
                href="/register"
                onClick={fermerMenu}
                className="flex items-center space-x-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                <UserPlus className="w-4 h-4" />
                <span>S'inscrire</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* En-tête de la page */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
              Nos Produits
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre gamme complète d'équipements professionnels de haute qualité, 
              conçus pour répondre aux besoins spécifiques de chaque métier.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="bg-white py-6 sm:py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((categorie) => (
              <button
                key={categorie}
                onClick={() => setCategorieSelectionnee(categorie)}
                className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm ${
                  categorieSelectionnee === categorie
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categorie}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille de produits */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {produitsFiltres.map((produit) => (
              <CarteProduit key={produit.id} produit={produit} />
            ))}
          </div>
          
          {produitsFiltres.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun produit trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Section Contact */}
      <section className="bg-blue-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
            Contactez-nous
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 sm:mb-12 leading-relaxed">
            Notre équipe d'experts est à votre disposition pour vous conseiller 
            et vous accompagner dans tous vos projets professionnels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/20">
              <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">WhatsApp</h3>
              <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6">Discutez directement avec nos conseillers</p>
              <button
                onClick={() => window.open('https://wa.me/33123456789', '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Ouvrir WhatsApp
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/20">
              <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Téléphone</h3>
              <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6">Appelez-nous pour un conseil immédiat</p>
              <button
                onClick={() => window.location.href = 'tel:+33123456789'}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Appeler maintenant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-lg sm:text-xl">MDT</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">MDT</h3>
                  <p className="text-sm sm:text-base text-gray-400">Mouvement des Travailleurs</p>
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
                <li><a href="/#contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contact</a></li>
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
              © 2024 MDT - Mouvement des Travailleurs. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}