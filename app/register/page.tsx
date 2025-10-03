"use client";

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Phone, Menu, X, UserPlus, ChevronLeft, ChevronRight, CheckCircle, Check, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [etapeActuelle, setEtapeActuelle] = useState(1);
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [confirmationMotDePasseVisible, setConfirmationMotDePasseVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [formData, setFormData] = useState({
    // Étape 1
    nom: '',
    prenom: '',
    telephone: '',
    sexe: '',
    email: '', // Added email field
    
    // Étape 2
    motDePasse: '',
    confirmationMotDePasse: '',
    
    // Étape 3
    typeActivite: '',
    whatsapp: '',
    plan: ''
  });

  const basculerMenu = () => {
    setMenuOuvert(!menuOuvert);
  };

  const fermerMenu = () => {
    setMenuOuvert(false);
  };

  const basculerMotDePasse = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const basculerConfirmationMotDePasse = () => {
    setConfirmationMotDePasseVisible(!confirmationMotDePasseVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validerEtape1 = () => {
    const { nom, prenom, telephone, sexe } = formData;
    if (!nom || !prenom || !telephone || !sexe) {
      alert('Veuillez remplir tous les champs de l\'étape 1');
      return false;
    }
    return true;
  };

  const validerEtape2 = () => {
    const { motDePasse, confirmationMotDePasse } = formData;
    if (!motDePasse || !confirmationMotDePasse) {
      alert('Veuillez remplir tous les champs de l\'étape 2');
      return false;
    }
    if (motDePasse !== confirmationMotDePasse) {
      alert('Les mots de passe ne correspondent pas');
      return false;
    }
    if (motDePasse.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    return true;
  };

  const validerEtape3 = () => {
    const { typeActivite, whatsapp, plan } = formData;
    if (!typeActivite || !whatsapp || !plan) {
      alert('Veuillez remplir tous les champs de l\'étape 3');
      return false;
    }
    return true;
  };

  const etapeSuivante = () => {
    if (etapeActuelle === 1 && validerEtape1()) {
      setEtapeActuelle(2);
    } else if (etapeActuelle === 2 && validerEtape2()) {
      setEtapeActuelle(3);
    }
  };

  const etapePrecedente = () => {
    if (etapeActuelle === 2) {
      setEtapeActuelle(1);
    } else if (etapeActuelle === 3) {
      setEtapeActuelle(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validerEtape3()) {
      // Logique d'inscription à implémenter
      console.log('Tentative d\'inscription:', formData);
      setShowSuccessModal(true);
    }
  };

  const redirigerVersConnexion = () => {
    router.push('/login');
  };

  const plans = [
    { id: 'semaine', nom: 'Plan Semaine', prix: '300 FCFA', periode: 'par semaine' },
    { id: 'mois', nom: 'Plan Mois', prix: '1000 FCFA', periode: 'par mois' },
    { id: 'an', nom: 'Plan Année', prix: '10000 FCFA', periode: 'par an' }
  ];

  const typesActivite = [
    'Menuiserie',
    'Électricité',
    'Plomberie',
    'Maçonnerie',
    'Peinture',
    'Carrelage',
    'Serrurerie',
    'Ébénisterie',
    'Métallurgie',
    'Autre'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal de succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Inscription réussie !
            </h3>
            <p className="text-gray-600 mb-6">
              Votre compte artisan a été créé avec succès. Vous pouvez maintenant vous connecter pour accéder à votre tableau de bord.
            </p>
            <button
              onClick={redirigerVersConnexion}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Aller à la page de connexion
            </button>
          </div>
        </div>
      )}

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
              <Link href="/produits" className="relative text-sienna hover:text-gold font-semibold transition-colors duration-300 group">
                Créations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
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
              className="block text-sienna hover:text-gold font-semibold transition-colors py-2 text-sm sm:text-base"
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

      {/* En-tête de la page */}
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('https://images.pexels.com/photos/5691640/pexels-photo-5691640.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-sienna/90 via-primary/80 to-cocoa/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-gold-light" />
              <span className="text-sm font-medium text-gold-light tracking-wide">INSCRIPTION</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight text-gradient-animated">
              Rejoignez-nous
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Créez votre compte artisan en quelques étapes simples pour partager vos créations 
              et rejoindre notre communauté d'artisans passionnés.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire d'inscription */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-premium p-8 sm:p-10 border border-gray-100/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Étape 1: Informations personnelles */}
              {etapeActuelle === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-4 py-2 rounded-full mb-4 shadow-lg">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-semibold">Étape 1/3</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-sienna">Informations personnelles</h2>
                    <p className="text-gray-600 mt-2">Commençons par vos informations de base</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-semibold text-sienna mb-3">
                        Prénom *
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400 group-focus-within:text-gold transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          required
                          className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Email facultatif */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (facultatif)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                        placeholder="exemple@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Numéro de téléphone *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                        placeholder="+225 01 23 45 67 89"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sexe" className="block text-sm font-semibold text-gray-700 mb-2">
                      Sexe *
                    </label>
                    <select
                      id="sexe"
                      name="sexe"
                      value={formData.sexe}
                      onChange={handleChange}
                      required
                      className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Sélectionnez votre sexe</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                    </select>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="button"
                      onClick={etapeSuivante}
                      className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-gold hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-premium hover:shadow-gold overflow-hidden"
                    >
                      <span>Étape suivante</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2: Mot de passe */}
              {etapeActuelle === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-4 py-2 rounded-full mb-4 shadow-lg">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-semibold">Étape 2/3</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-sienna">Sécurité du compte</h2>
                    <p className="text-gray-600 mt-2">Choisissez un mot de passe sécurisé</p>
                  </div>
                  
                  <div>
                    <label htmlFor="motDePasse" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mot de passe *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={motDePasseVisible ? "text" : "password"}
                        id="motDePasse"
                        name="motDePasse"
                        value={formData.motDePasse}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                        placeholder="Votre mot de passe"
                      />
                      <button
                        type="button"
                        onClick={basculerMotDePasse}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {motDePasseVisible ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmationMotDePasse" className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirmer le mot de passe *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={confirmationMotDePasseVisible ? "text" : "password"}
                        id="confirmationMotDePasse"
                        name="confirmationMotDePasse"
                        value={formData.confirmationMotDePasse}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                        placeholder="Confirmez votre mot de passe"
                      />
                      <button
                        type="button"
                        onClick={basculerConfirmationMotDePasse}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {confirmationMotDePasseVisible ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 space-y-3 sm:space-y-0">
                    <button
                      type="button"
                      onClick={etapePrecedente}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Étape précédente</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={etapeSuivante}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <span>Étape suivante</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 3: Activité et Plan */}
              {etapeActuelle === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-gold text-white px-4 py-2 rounded-full mb-4 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-semibold">Étape 3/3</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-sienna">Activité et Plan d'abonnement</h2>
                    <p className="text-gray-600 mt-2">Finalisez votre profil d'artisan</p>
                  </div>
                  
                  <div>
                    <label htmlFor="typeActivite" className="block text-sm font-semibold text-gray-700 mb-2">
                      Type d'activité *
                    </label>
                    <select
                      id="typeActivite"
                      name="typeActivite"
                      value={formData.typeActivite}
                      onChange={handleChange}
                      required
                      className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Sélectionnez votre activité</option>
                      {typesActivite.map((activite) => (
                        <option key={activite} value={activite}>{activite}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-2">
                      Numéro WhatsApp *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                        placeholder="+225 01 23 45 67 89"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Choisissez votre plan d'abonnement *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            formData.plan === plan.id
                              ? 'border-blue-900 bg-blue-50'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                          onClick={() => setFormData({ ...formData, plan: plan.id })}
                        >
                          <div className="text-center">
                            <h3 className="font-bold text-lg text-gray-900">{plan.nom}</h3>
                            <p className="text-2xl font-bold text-blue-900 mt-2">{plan.prix}</p>
                            <p className="text-sm text-gray-600 mt-1">{plan.periode}</p>
                            {formData.plan === plan.id && (
                              <CheckCircle className="w-6 h-6 text-blue-900 mx-auto mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 space-y-3 sm:space-y-0">
                    <button
                      type="button"
                      onClick={etapePrecedente}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Étape précédente</span>
                    </button>
                    
                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-gold hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-premium hover:shadow-gold overflow-hidden"
                    >
                      <span>Créer mon compte</span>
                      <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 font-medium">ou</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <p className="text-base text-gray-600">
                Déjà inscrit&nbsp;?
                <Link href="/login" className="font-semibold text-gold hover:text-bronze transition-colors duration-300 ml-1">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
