"use client";

import { useState, useEffect } from 'react';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User,
  Package,
  DollarSign,
  Calendar,
  Star,
  Eye,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Données fictives pour l'utilisateur
const commandesUtilisateur = [
  {
    id: 1,
    produit: "Kit Outillage Professionnel",
    prix: "179.400",
    date: "2024-02-15",
    statut: "Livré",
    imageUrl: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    id: 2,
    produit: "Équipement de Sécurité",
    prix: "53.460",
    date: "2024-02-10",
    statut: "En cours",
    imageUrl: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    id: 3,
    produit: "Matériel de Mesure",
    prix: "95.540",
    date: "2024-01-28",
    statut: "Livré",
    imageUrl: "https://images.pexels.com/photos/6256298/pexels-photo-6256298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  }
];

const favorisUtilisateur = [
  {
    id: 1,
    nom: "Vêtements de Travail",
    prix: "47.480",
    imageUrl: "https://images.pexels.com/photos/7937675/pexels-photo-7937675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    id: 2,
    nom: "Machines Portatives",
    prix: "269.640",
    imageUrl: "https://images.pexels.com/photos/5691641/pexels-photo-5691641.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  }
];

export default function UserDashboard() {
  const router = useRouter();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [sectionActive, setSectionActive] = useState('accueil');
  const [userInfo, setUserInfo] = useState({
    nom: "Jean Dupont",
    telephone: "0172317983",
    email: "jean.dupont@email.com"
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const userType = localStorage.getItem('userType');
    const userPhone = localStorage.getItem('userPhone');
    
    if (userType !== 'user' || userPhone !== '0172317983') {
      router.push('/login');
    }
  }, [router]);

  const basculerMenu = () => {
    setMenuOuvert(!menuOuvert);
  };

  const fermerMenu = () => {
    setMenuOuvert(false);
  };

  const deconnecter = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userPhone');
    router.push('/login');
  };

  const renderSection = () => {
    switch (sectionActive) {
      case 'accueil':
        return <SectionAccueil />;
      case 'commandes':
        return <SectionCommandes />;
      case 'favoris':
        return <SectionFavoris />;
      case 'profil':
        return <SectionProfil />;
      default:
        return <SectionAccueil />;
    }
  };

  const SectionAccueil = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue, {userInfo.nom} !</h2>
        <p className="text-gray-600">Voici un aperçu de votre activité sur MDT</p>
      </div>

      {/* Statistiques utilisateur */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{commandesUtilisateur.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Montant Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {commandesUtilisateur.reduce((total, cmd) => total + parseFloat(cmd.prix.replace(/\./g, '')), 0).toLocaleString()} FCFA
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Favoris</p>
              <p className="text-2xl font-bold text-gray-900">{favorisUtilisateur.length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Dernières commandes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dernières Commandes</h3>
        <div className="space-y-4">
          {commandesUtilisateur.slice(0, 3).map((commande) => (
            <div key={commande.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={commande.imageUrl}
                  alt={commande.produit}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{commande.produit}</p>
                  <p className="text-sm text-gray-600">{commande.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{commande.prix} FCFA</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  commande.statut === 'Livré' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {commande.statut}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/produits"
          className="bg-blue-900 hover:bg-blue-800 text-white p-6 rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-4"
        >
          <ShoppingBag className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Parcourir les produits</h3>
            <p className="text-blue-100">Découvrez notre catalogue</p>
          </div>
        </Link>

        <button className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-4">
          <MessageCircle className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Contacter le support</h3>
            <p className="text-orange-100">Besoin d'aide ?</p>
          </div>
        </button>
      </div>
    </div>
  );

  const SectionCommandes = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mes Commandes</h2>
        <p className="text-gray-600">Historique de toutes vos commandes</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {commandesUtilisateur.map((commande) => (
                <tr key={commande.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={commande.imageUrl}
                        alt={commande.produit}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                      <div className="text-sm font-medium text-gray-900">{commande.produit}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(commande.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {commande.prix} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      commande.statut === 'Livré' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {commande.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SectionFavoris = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mes Favoris</h2>
        <p className="text-gray-600">Produits que vous avez ajoutés à vos favoris</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorisUtilisateur.map((favori) => (
          <div key={favori.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={favori.imageUrl}
              alt={favori.nom}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{favori.nom}</h3>
              <p className="text-2xl font-bold text-blue-900 mb-4">{favori.prix} FCFA</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300">
                  Voir le produit
                </button>
                <button className="p-2 text-red-600 hover:text-red-800 transition-colors">
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SectionProfil = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mon Profil</h2>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              value={userInfo.nom}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={userInfo.telephone}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>

          <button className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300">
            Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>
  );

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
                <p className="text-xs sm:text-sm text-gray-600 leading-none hidden sm:block">Espace Utilisateur</p>
              </div>
            </Link>
            
            {/* Boutons mobile/tablet */}
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
      </nav>

      <div className="flex">
        {/* Menu latéral */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          menuOuvert ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={fermerMenu}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="mt-6 px-3">
            <div className="space-y-2">
              <button
                onClick={() => { setSectionActive('accueil'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'accueil' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Accueil</span>
              </button>
              
              <button
                onClick={() => { setSectionActive('commandes'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'commandes' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Mes Commandes</span>
              </button>
              
              <button
                onClick={() => { setSectionActive('favoris'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'favoris' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Favoris</span>
              </button>
              
              <button
                onClick={() => { setSectionActive('profil'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'profil' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Mon Profil</span>
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={deconnecter}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Se déconnecter</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {renderSection()}
          </main>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {menuOuvert && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={fermerMenu}
        />
      )}
    </div>
  );
} 