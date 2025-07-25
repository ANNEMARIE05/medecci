"use client";

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Menu, X, AlertCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);
  const [formData, setFormData] = useState({
    telephone: '',
    motDePasse: ''
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setChargement(true);

    // Vérification immédiate des identifiants
    if (formData.telephone === '0769144813' && formData.motDePasse === 'admin123@') {
      // Administrateur -> redirige vers dashboard administrateur
      localStorage.setItem('userType', 'administrateur');
      localStorage.setItem('userPhone', formData.telephone);
      router.push('/dashboard/administrateur');
    } else if (formData.telephone === '0172317983' && formData.motDePasse === 'user123@') {
      // Utilisateur -> redirige vers dashboard utilisateur
      localStorage.setItem('userType', 'utilisateur');
      localStorage.setItem('userPhone', formData.telephone);
      router.push('/dashboard/utilisateur');
    } else {
      setErreur('Identifiants incorrects. Veuillez réessayer.');
    }
    setChargement(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                <span className="text-white font-black text-sm sm:text-lg">MEDEC-CI</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-blue-900">MEDEC-CI</h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-none hidden sm:block">MEDEC-CI</p>
              </div>
            </Link>
            
            {/* Menu desktop */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link href="/" className="text-black hover:text-orange-600 font-semibold transition-colors text-sm xl:text-base">Accueil</Link>
              <Link href="/produits" className="text-black hover:text-orange-600 font-semibold transition-colors text-sm xl:text-base">Produits</Link>
              <a href="/contact" className="text-black hover:text-orange-600 font-semibold transition-colors text-sm xl:text-base">Contact</a>
              <div className="flex items-center space-x-3">
                <Link href="/login" className="flex items-center space-x-2 text-orange-600 font-bold text-sm xl:text-base">
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
              className="block text-black hover:text-orange-600 font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Accueil
            </Link>
            <Link 
              href="/produits" 
              onClick={fermerMenu}
              className="block text-black hover:text-orange-600 font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Produits
            </Link>
            <a 
              href="/contact" 
              onClick={fermerMenu}
              className="block text-black hover:text-orange-600 font-semibold transition-colors py-2 text-sm sm:text-base"
            >
              Contact
            </a>
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link 
                href="/login"
                onClick={fermerMenu}
                className="flex items-center space-x-2 w-full text-orange-600 font-bold py-2 text-sm sm:text-base"
              >
                <User className="w-4 h-4" />
                <span>Se connecter</span>
              </Link>
              <Link 
                href="/register"
                onClick={fermerMenu}
                className="flex items-center space-x-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                <span>S&apos;inscrire</span>
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
              Connexion
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Connectez-vous à votre compte pour accéder à tous nos services et produits.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire de connexion */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all duration-300"
                    placeholder="0123456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="motDePasse" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
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

              {erreur && (
                <div className="flex items-center space-x-2 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-red-700">{erreur}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-900 hover:text-blue-800 transition-colors">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={chargement}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                {chargement ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connexion...</span>
                  </>
                ) : (
                  <span>Se connecter</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-600">
                Pas encore de compte&nbsp;?
                <Link href="/register" className="font-semibold text-blue-900 hover:text-blue-800 transition-colors">
                  Créer un compte
                </Link>
              </p>
              <div className="border-t border-gray-200 pt-3">
                {/* Removed: Accéder au dashboard administrateur link */}
              </div>
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
                  <span className="text-white font-black text-lg sm:text-xl">MEDEC-CI</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">MEDEC-CI</h3>
                  <p className="text-sm sm:text-base text-gray-400">MEDEC-CI</p>
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
              © 2024 MEDEC-CI - MEDEC-CI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
