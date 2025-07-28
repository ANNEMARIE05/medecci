"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, UserCircle, LogOut, Home, Clock, User, Plus, Edit, Camera, Eye, EyeOff, AlertTriangle, Check } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard/utilisateur", icon: <Home size={18} /> },
  { label: "Ajouter un Article", href: "/dashboard/utilisateur/ajouter-article", icon: <Plus size={18} /> },
  { label: "Historique", href: "/dashboard/utilisateur/historique", icon: <Clock size={18} /> },
  { label: "Profil", href: "/dashboard/utilisateur/profile", icon: <User size={18} /> },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-64 bg-neutral-900 border-none">
        <SidebarContent pathname={pathname} />
      </SheetContent>
    </Sheet>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Ici vous pouvez ajouter la logique de déconnexion (suppression du token, etc.)
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-neutral-800">
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
          <UserCircle size={24} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-lg text-white">MEDEC-CI</div>
          <div className="text-xs text-neutral-400">Utilisateur</div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 flex-1 px-2 py-4">
        {sidebarLinks.map(link => (
          <SidebarLink key={link.href} {...link} active={pathname === link.href} />
        ))}
        <div className="border-t border-neutral-800 my-3" />
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition text-base text-red-500 hover:bg-red-900/20"
        >
          <span className="text-xl"><LogOut size={18} /></span>
          <span>Déconnexion</span>
        </button>
      </nav>

      {/* Modal de confirmation de déconnexion */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-neutral-800">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Confirmer la déconnexion
            </h3>
            <p className="text-neutral-300 mb-6">
              Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre tableau de bord.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 border border-neutral-700"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarLink({ icon, label, href, active = false, danger = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean; danger?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition text-base
        ${danger ? "text-red-500 hover:bg-red-900/20" : active ? "bg-white/10 text-white" : "text-neutral-200 hover:bg-white/5"}`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

// Données utilisateur basées sur l'inscription
const initialUser = {
  nom: "Koné",
  prenom: "Marie",
  telephone: "+225 01 23 45 67 89",
  sexe: "Femme",
  email: "",
  typeActivite: "Menuiserie",
  whatsapp: "+225 01 23 45 67 89",
  plan: "Plan Mois",
  membreDepuis: "Jan 2024",
  motDePasse: "********",
};

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

const plans = [
  { id: 'semaine', nom: 'Plan Semaine', prix: '300 FCFA', periode: 'par semaine' },
  { id: 'mois', nom: 'Plan Mois', prix: '1000 FCFA', periode: 'par mois' },
  { id: 'an', nom: 'Plan Année', prix: '10000 FCFA', periode: 'par an' }
];

export default function ProfileUtilisateur() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fermer la sidebar si on clique en dehors
  useEffect(() => {
    if (!sidebarOpen) return;
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState(user);
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [motDePasseConfirmVisible, setMotDePasseConfirmVisible] = useState(false);
  const [motDePasse, setMotDePasse] = useState("");
  const [motDePasseConfirm, setMotDePasseConfirm] = useState("");
  const [erreur, setErreur] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (edit && (motDePasse || motDePasseConfirm)) {
      if (motDePasse !== motDePasseConfirm) {
        setErreur("Les mots de passe ne correspondent pas.");
        return;
      }
      if (motDePasse.length < 6) {
        setErreur("Le mot de passe doit contenir au moins 6 caractères.");
        return;
      }
    }
    setUser({ ...form, motDePasse: motDePasse ? motDePasse : user.motDePasse });
    setEdit(false);
    setMotDePasse("");
    setMotDePasseConfirm("");
    setErreur("");
    setShowSuccessModal(true);
  };

  const getPlanDisplay = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? `${plan.nom} - ${plan.prix} ${plan.periode}` : planId;
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Modal de succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-neutral-800">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Profil mis à jour !
            </h3>
            <p className="text-neutral-300 mb-6">
              Vos informations ont été modifiées avec succès.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          {/* Menu burger mobile */}
          <button
            className="md:hidden text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Ouvrir le menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <span className="font-black text-lg text-white">MEDEC-CI</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/utilisateur/profile" className="flex items-center gap-2 text-white hover:text-orange-500">
            <UserCircle size={22} />
            <span className="hidden sm:inline">Mon profil</span>
          </Link>
        </div>
      </header>
      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40" />
          {/* Sidebar */}
          <div ref={sidebarRef} className="relative w-3/4 max-w-xs h-full bg-neutral-900 border-r border-neutral-800 shadow-xl animate-slideInLeft">
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-lg hover:bg-neutral-800"
              aria-label="Fermer le menu"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={22} />
            </button>
            <SidebarContent pathname={pathname} />
          </div>
        </div>
      )}
      {/* Sidebar + Main */}
      <div className="flex flex-1">
        {/* Sidebar desktop */}
        <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-neutral-900 border-r border-neutral-800 z-40">
          <SidebarContent pathname={pathname} />
        </aside>
        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="max-w-4xl mx-auto">
            {/* En-tête du profil */}
            <div className="bg-neutral-900 rounded-2xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user.prenom[0]}{user.nom[0]}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-white mb-2">{user.prenom} {user.nom}</h1>
                  <p className="text-orange-400 font-semibold mb-2">{user.typeActivite}</p>
                  <p className="text-neutral-400 text-sm">Membre depuis {user.membreDepuis}</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold" 
                  onClick={() => setEdit(true)}
                >
                  <Edit size={16} className="mr-2" /> Modifier le profil
                </Button>
              </div>
            </div>

            {/* Informations du profil */}
            <div className="bg-neutral-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Informations personnelles</h2>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nom et Prénom */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Nom *</label>
                    <input 
                      name="nom" 
                      value={form.nom} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      required 
                      disabled={!edit} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Prénom *</label>
                    <input 
                      name="prenom" 
                      value={form.prenom} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      required 
                      disabled={!edit} 
                    />
                  </div>
                  {/* Email facultatif */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Email (facultatif)</label>
                    <input 
                      name="email" 
                      type="email"
                      value={form.email} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      placeholder="exemple@email.com"
                      disabled={!edit} 
                    />
                  </div>

                  {/* Téléphone et Sexe */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Téléphone *</label>
                    <input 
                      name="telephone" 
                      value={form.telephone} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      required 
                      disabled={!edit} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Sexe *</label>
                    <select 
                      name="sexe" 
                      value={form.sexe} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      required 
                      disabled={!edit}
                    >
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>

                  {/* Type d'activité */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Type d'activité *</label>
                    <select 
                      name="typeActivite" 
                      value={form.typeActivite} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      required 
                      disabled={!edit}
                    >
                      <option value="">Sélectionnez votre activité</option>
                      {typesActivite.map((activite) => (
                        <option key={activite} value={activite}>{activite}</option>
                      ))}
                    </select>
                  </div>

                  {/* WhatsApp */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Numéro WhatsApp *</label>
                    <input 
                      name="whatsapp" 
                      value={form.whatsapp} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      required 
                      disabled={!edit} 
                    />
                  </div>

                  {/* Plan d'abonnement */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Plan d'abonnement *</label>
                    <select 
                      name="plan" 
                      value={form.plan} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:outline-none transition-colors" 
                      required 
                      disabled={!edit}
                    >
                      <option value="">Sélectionnez votre plan</option>
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>{plan.nom} - {plan.prix} {plan.periode}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mot de passe et confirmation */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <input
                        name="motDePasse"
                        type={motDePasseVisible ? "text" : "password"}
                        value={edit ? motDePasse : "********"}
                        onChange={e => edit ? setMotDePasse(e.target.value) : null}
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white pr-10 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="Laissez vide pour ne pas changer"
                        disabled={!edit}
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white" 
                        onClick={() => setMotDePasseVisible(v => !v)}
                        disabled={!edit}
                      >
                        {motDePasseVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">Confirmer le nouveau mot de passe</label>
                    <div className="relative">
                      <input
                        name="motDePasseConfirm"
                        type={motDePasseConfirmVisible ? "text" : "password"}
                        value={edit ? motDePasseConfirm : "********"}
                        onChange={e => edit ? setMotDePasseConfirm(e.target.value) : null}
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white pr-10 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="Confirmez le nouveau mot de passe"
                        disabled={!edit}
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white" 
                        onClick={() => setMotDePasseConfirmVisible(v => !v)}
                        disabled={!edit}
                      >
                        {motDePasseConfirmVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {erreur && (
                  <div className="text-red-500 text-center font-semibold p-3 bg-red-900/20 rounded-lg border border-red-800">
                    {erreur}
                  </div>
                )}

                {edit && (
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-neutral-800">
                    <Button 
                      variant="outline" 
                      onClick={() => { 
                        setForm(user); 
                        setEdit(false); 
                        setMotDePasse(""); 
                        setMotDePasseConfirm(""); 
                        setErreur(""); 
                      }}
                      className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    >
                      Annuler
                    </Button>
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold" 
                      type="submit"
                    >
                      Enregistrer les modifications
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 