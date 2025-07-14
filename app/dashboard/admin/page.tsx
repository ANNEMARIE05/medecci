"use client";

import { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  TrendingUp,
  DollarSign,
  Package,
  Shield,
  Crown,
  Activity,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Données fictives pour le super admin
const utilisateurs = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "0172317983",
    statut: "Actif",
    dateInscription: "2024-01-15",
    commandes: 12,
    totalAchete: "2.450.000",
    role: "Utilisateur"
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Marie",
    email: "marie.martin@email.com",
    telephone: "+33 1 98 76 54 32",
    statut: "Actif",
    dateInscription: "2024-02-03",
    commandes: 8,
    totalAchete: "1.890.000",
    role: "Utilisateur"
  },
  {
    id: 3,
    nom: "Bernard",
    prenom: "Pierre",
    email: "pierre.bernard@email.com",
    telephone: "+33 1 45 67 89 12",
    statut: "Inactif",
    dateInscription: "2023-12-20",
    commandes: 3,
    totalAchete: "450.000",
    role: "Utilisateur"
  },
  {
    id: 4,
    nom: "Admin",
    prenom: "Super",
    email: "admin@mdt.com",
    telephone: "0769144813",
    statut: "Actif",
    dateInscription: "2023-01-01",
    commandes: 0,
    totalAchete: "0",
    role: "Super Admin"
  }
];

const produits = [
  {
    id: 1,
    nom: "Kit Outillage Professionnel",
    categorie: "Outillage",
    prix: "179.400",
    stock: 45,
    statut: "En stock",
    ventes: 23,
    imageUrl: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    id: 2,
    nom: "Équipement de Sécurité",
    categorie: "Sécurité",
    prix: "53.460",
    stock: 12,
    statut: "Stock faible",
    ventes: 18,
    imageUrl: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    id: 3,
    nom: "Matériel de Mesure",
    categorie: "Mesure",
    prix: "95.540",
    stock: 8,
    statut: "Rupture",
    ventes: 15,
    imageUrl: "https://images.pexels.com/photos/6256298/pexels-photo-6256298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  }
];

const statistiques = {
  totalUtilisateurs: 1247,
  nouveauxUtilisateurs: 89,
  utilisateursActifs: 1189,
  chiffreAffaires: "156.789.000",
  commandes: 3456,
  produitsVendus: 12890,
  produitsEnRupture: 3,
  alertes: 5
};

export default function AdminDashboard() {
  const router = useRouter();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [sectionActive, setSectionActive] = useState('accueil');
  const [rechercheUtilisateur, setRechercheUtilisateur] = useState('');
  const [rechercheProduit, setRechercheProduit] = useState('');

  useEffect(() => {
    // Vérifier si l'admin est connecté
    const userType = localStorage.getItem('userType');
    const userPhone = localStorage.getItem('userPhone');
    
    if (userType !== 'admin' || userPhone !== '0769144813') {
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

  const utilisateursFiltres = utilisateurs.filter(utilisateur =>
    utilisateur.nom.toLowerCase().includes(rechercheUtilisateur.toLowerCase()) ||
    utilisateur.prenom.toLowerCase().includes(rechercheUtilisateur.toLowerCase()) ||
    utilisateur.email.toLowerCase().includes(rechercheUtilisateur.toLowerCase())
  );

  const produitsFiltres = produits.filter(produit =>
    produit.nom.toLowerCase().includes(rechercheProduit.toLowerCase()) ||
    produit.categorie.toLowerCase().includes(rechercheProduit.toLowerCase())
  );

  const renderSection = () => {
    switch (sectionActive) {
      case 'accueil':
        return <SectionAccueil />;
      case 'utilisateurs':
        return <SectionUtilisateurs />;
      case 'produits':
        return <SectionProduits />;
      case 'statistiques':
        return <SectionStatistiques />;
      case 'parametres':
        return <SectionParametres />;
      default:
        return <SectionAccueil />;
    }
  };

  const SectionAccueil = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord Super Admin</h2>
          <p className="text-gray-600">Contrôle total de la plateforme MDT</p>
        </div>
        <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-2 rounded-lg">
          <Crown className="w-5 h-5 text-yellow-600" />
          <span className="text-sm font-semibold text-yellow-800">Super Admin</span>
        </div>
      </div>

      {/* Alertes */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-800">Alertes ({statistiques.alertes})</span>
        </div>
        <ul className="mt-2 space-y-1 text-sm text-red-700">
          <li>• 3 produits en rupture de stock</li>
          <li>• 2 commandes en attente de validation</li>
        </ul>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{statistiques.totalUtilisateurs}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{statistiques.nouveauxUtilisateurs} ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-gray-900">{statistiques.chiffreAffaires} FCFA</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+12.5% ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{statistiques.commandes}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+8.3% ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits Vendus</p>
              <p className="text-2xl font-bold text-gray-900">{statistiques.produitsVendus}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+15.2% ce mois</span>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-blue-900 hover:bg-blue-800 text-white p-6 rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-4">
          <UserPlus className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Ajouter un utilisateur</h3>
            <p className="text-blue-100">Créer un nouveau compte</p>
          </div>
        </button>

        <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-4">
          <Plus className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Ajouter un produit</h3>
            <p className="text-green-100">Étendre le catalogue</p>
          </div>
        </button>

        <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-4">
          <BarChart3 className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Voir les rapports</h3>
            <p className="text-purple-100">Analyses détaillées</p>
          </div>
        </button>
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
        <div className="space-y-4">
          {utilisateurs.slice(0, 5).map((utilisateur) => (
            <div key={utilisateur.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {utilisateur.prenom[0]}{utilisateur.nom[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{utilisateur.prenom} {utilisateur.nom}</p>
                  <p className="text-sm text-gray-600">{utilisateur.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{utilisateur.commandes} commandes</p>
                <p className="text-sm text-gray-600">{utilisateur.totalAchete} FCFA</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SectionUtilisateurs = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h2>
          <p className="text-gray-600">Contrôle total des comptes utilisateurs</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Ajouter un utilisateur</span>
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={rechercheUtilisateur}
              onChange={(e) => setRechercheUtilisateur(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {utilisateursFiltres.map((utilisateur) => (
                <tr key={utilisateur.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {utilisateur.prenom[0]}{utilisateur.nom[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {utilisateur.prenom} {utilisateur.nom}
                        </div>
                        <div className="text-sm text-gray-500">ID: {utilisateur.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{utilisateur.email}</div>
                    <div className="text-sm text-gray-500">{utilisateur.telephone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      utilisateur.role === 'Super Admin' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {utilisateur.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      utilisateur.statut === 'Actif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {utilisateur.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(utilisateur.dateInscription).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{utilisateur.commandes} commandes</div>
                    <div className="text-sm text-gray-500">{utilisateur.totalAchete} FCFA</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SectionProduits = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Produits</h2>
          <p className="text-gray-600">Contrôle total du catalogue produits</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Ajouter un produit</span>
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={rechercheProduit}
              onChange={(e) => setRechercheProduit(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Tableau des produits */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ventes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produitsFiltres.map((produit) => (
                <tr key={produit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={produit.imageUrl}
                        alt={produit.nom}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{produit.nom}</div>
                        <div className="text-sm text-gray-500">ID: {produit.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {produit.categorie}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {produit.prix} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        produit.statut === 'En stock' 
                          ? 'bg-green-100 text-green-800'
                          : produit.statut === 'Stock faible'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {produit.stock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {produit.ventes} unités
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SectionStatistiques = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Statistiques Détaillées</h2>
        <p className="text-gray-600">Analyses approfondies de la plateforme</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">Section de statistiques détaillées à développer...</p>
      </div>
    </div>
  );

  const SectionParametres = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Paramètres Système</h2>
        <p className="text-gray-600">Configuration de la plateforme</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">Section de paramètres système à développer...</p>
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
                <p className="text-xs sm:text-sm text-gray-600 leading-none hidden sm:block">Super Admin</p>
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
                onClick={() => { setSectionActive('utilisateurs'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'utilisateurs' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Utilisateurs</span>
              </button>
              
              <button
                onClick={() => { setSectionActive('produits'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'produits' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Produits</span>
              </button>
              
              <button
                onClick={() => { setSectionActive('statistiques'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'statistiques' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Statistiques</span>
              </button>
              
              <button
                onClick={() => { setSectionActive('parametres'); fermerMenu(); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  sectionActive === 'parametres' 
                    ? 'bg-blue-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Paramètres</span>
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