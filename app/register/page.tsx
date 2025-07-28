"use client";

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Phone, Menu, X, UserPlus, ChevronLeft, ChevronRight, CheckCircle, Check, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className="text-lg sm:text-xl font-black text-blue-900">MEDEC-CI</h1>
            </Link>
            
            {/* Menu desktop */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-900 font-semibold transition-colors text-sm xl:text-base">
                Accueil
              </Link>
              <Link href="/produits" className="text-gray-700 hover:text-blue-900 font-semibold transition-colors text-sm xl:text-base">
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
                  <span>S&apos;inscrire</span>
                </Link>
              </div>
            </div>

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
              className="block text-gray-700 hover:text-blue-900 font-semibold transition-colors py-2 text-sm sm:text-base"
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
                <span>S&apos;inscrire</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* En-tête de la page */}
      <div className="relative py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/5691640/pexels-photo-5691640.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-orange-800/60" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 drop-shadow-lg">
              Inscription Artisan
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Créez votre compte artisan en quelques étapes simples pour vendre vos produits et services.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire d'inscription */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Étape 1: Informations personnelles */}
              {etapeActuelle === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
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

                  <div className="flex justify-end pt-4">
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

              {/* Étape 2: Mot de passe */}
              {etapeActuelle === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité du compte</h2>
                  
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Activité et Plan d'abonnement</h2>
                  
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
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <span>Créer mon compte</span>
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                D&eacute;j&agrave; inscrit&nbsp;?{' '}
                <Link href="/login" className="font-semibold text-blue-900 hover:text-blue-800 transition-colors">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2">
              <Link href="/" className="flex items-center mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-black text-white">MEDEC-CI</h3>
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
                <li className="text-gray-400 text-sm sm:text-base">+225 01 23 45 67 89</li>
                <li className="text-gray-400 text-sm sm:text-base">contact@medecci.ci</li>
                <li className="text-gray-400 text-sm sm:text-base">Abidjan, Côte d'Ivoire</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              © 2024 MEDEC-CI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
