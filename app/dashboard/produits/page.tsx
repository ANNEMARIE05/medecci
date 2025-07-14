"use client";

import { useState } from 'react';
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  Tag,
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';

// Données fictives pour les produits
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
  },
  {
    id: 4,
    nom: "Vêtements de Travail",
    categorie: "Vêtements",
    prix: "47.480",
    stock: 67,
    statut: "En stock",
    ventes: 34,
    imageUrl: "https://images.pexels.com/photos/7937675/pexels-photo-7937675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    id: 5,
    nom: "Machines Portatives",
    categorie: "Machines",
    prix: "269.640",
    stock: 15,
    statut: "En stock",
    ventes: 8,
    imageUrl: "https://images.pexels.com/photos/5691641/pexels-photo-5691641.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    id: 6,
    nom: "Consommables Pro",
    categorie: "Consommables",
    prix: "23.440",
    stock: 89,
    statut: "En stock",
    ventes: 56,
    imageUrl: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  }
];

const categories = ["Toutes", "Outillage", "Sécurité", "Mesure", "Vêtements", "Machines", "Consommables", "Électrique", "Spécialisé", "Levage"];

export default function GestionProduits() {
  const [rechercheProduit, setRechercheProduit] = useState('');
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('Toutes');
  const [triPar, setTriPar] = useState('nom');

  const produitsFiltres = produits.filter(produit => {
    const correspondanceRecherche = produit.nom.toLowerCase().includes(rechercheProduit.toLowerCase()) ||
                                   produit.categorie.toLowerCase().includes(rechercheProduit.toLowerCase());
    const correspondanceCategorie = categorieSelectionnee === 'Toutes' || produit.categorie === categorieSelectionnee;
    return correspondanceRecherche && correspondanceCategorie;
  });

  const produitsTries = [...produitsFiltres].sort((a, b) => {
    switch (triPar) {
      case 'nom':
        return a.nom.localeCompare(b.nom);
      case 'prix':
        return parseFloat(a.prix.replace(/\./g, '')) - parseFloat(b.prix.replace(/\./g, ''));
      case 'stock':
        return a.stock - b.stock;
      case 'ventes':
        return b.ventes - a.ventes;
      default:
        return 0;
    }
  });

  const statistiques = {
    totalProduits: produits.length,
    produitsEnStock: produits.filter(p => p.statut === 'En stock').length,
    produitsRupture: produits.filter(p => p.statut === 'Rupture').length,
    chiffreAffaires: produits.reduce((total, p) => total + (parseFloat(p.prix.replace(/\./g, '')) * p.ventes), 0)
  };

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
                <p className="text-xs sm:text-sm text-gray-600 leading-none hidden sm:block">Gestion Produits</p>
              </div>
            </Link>
            
            {/* Bouton retour */}
            <Link 
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* En-tête de la page */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
              Gestion des Produits
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Gérez votre catalogue de produits, suivez les stocks et analysez les performances de vente.
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Produits</p>
                  <p className="text-2xl font-bold text-gray-900">{statistiques.totalProduits}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{statistiques.produitsEnStock}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rupture</p>
                  <p className="text-2xl font-bold text-gray-900">{statistiques.produitsRupture}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
                  <p className="text-2xl font-bold text-gray-900">{statistiques.chiffreAffaires.toLocaleString()} FCFA</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contrôles et filtres */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Recherche */}
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

                {/* Filtre par catégorie */}
                <select
                  value={categorieSelectionnee}
                  onChange={(e) => setCategorieSelectionnee(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  {categories.map((categorie) => (
                    <option key={categorie} value={categorie}>
                      {categorie}
                    </option>
                  ))}
                </select>

                {/* Tri */}
                <select
                  value={triPar}
                  onChange={(e) => setTriPar(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  <option value="nom">Trier par nom</option>
                  <option value="prix">Trier par prix</option>
                  <option value="stock">Trier par stock</option>
                  <option value="ventes">Trier par ventes</option>
                </select>
              </div>

              {/* Bouton ajouter */}
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Ajouter un produit</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des produits */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
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
                  {produitsTries.map((produit) => (
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

          {produitsTries.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucun produit trouvé.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 