"use client";

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Menu, X, AlertCircle, UserPlus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);
  const [formData, setFormData] = useState({
    telephone: '',
    motDePasse: ''
  });


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
      {/* Navbar */}
      <Navbar currentPage="login" />

      {/* En-tête de la page */}
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('https://images.pexels.com/photos/5691640/pexels-photo-5691640.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-sienna/90 via-primary/80 to-cocoa/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-gold-light" />
              <span className="text-sm font-medium text-gold-light tracking-wide">CONNEXION</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight text-gradient-animated">
              Bienvenue
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Accédez à votre espace personnel pour gérer vos créations, consulter votre historique 
              et mettre à jour votre profil d'artisan.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire de connexion */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ivory to-white">
        <div className="max-w-lg mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-premium p-8 sm:p-10 border border-gray-100/50">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-sienna mb-3">
                  Numéro de téléphone
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-gold transition-colors duration-300" />
                  </div>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                    placeholder="+225 01 23 45 67 89"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="motDePasse" className="block text-sm font-semibold text-sienna mb-3">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gold transition-colors duration-300" />
                  </div>
                  <input
                    type={motDePasseVisible ? "text" : "password"}
                    id="motDePasse"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-14 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={basculerMotDePasse}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors duration-300"
                  >
                    {motDePasseVisible ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gold transition-colors duration-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gold transition-colors duration-300" />
                    )}
                  </button>
                </div>
              </div>

              {erreur && (
                <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl backdrop-blur-sm">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700 font-medium">{erreur}</span>
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
                className="group relative w-full bg-gradient-gold hover:opacity-90 disabled:bg-gray-400 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-premium hover:shadow-gold flex items-center justify-center space-x-3 overflow-hidden"
              >
                {chargement ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Se connecter</span>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-bronze opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 font-medium">ou</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <p className="text-base text-gray-600">
                Pas encore de compte&nbsp;?
                <Link href="/register" className="font-semibold text-gold hover:text-bronze transition-colors duration-300 ml-1">
                  Créer un compte
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
