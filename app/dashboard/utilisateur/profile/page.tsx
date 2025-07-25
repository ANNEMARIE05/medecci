"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle, LogOut, Home, Clock, User, Plus, Edit2, Eye, EyeOff } from "lucide-react";
import { Button } from '@/components/ui/button';

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
        <SidebarLink icon={<LogOut size={18} />} label="Déconnexion" href="/login" danger />
      </nav>
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

const initialUser = {
  avatar: "MK",
  nom: "Koné",
  prenom: "Marie",
  email: "marie.kone@email.com",
  sexe: "Femme",
  telephone: "0172317983",
  whatsapp: "0172317983",
  typeCommerce: "Commerçante",
  plan: "Mensuel - 1.000 FCFA/mois (Populaire)",
  membreDepuis: "Jan 2024",
  motDePasse: "user123@",
};

export default function ProfileUtilisateur() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

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
    }
    setUser({ ...form, motDePasse: motDePasse ? motDePasse : user.motDePasse });
    setEdit(false);
    setMotDePasse("");
    setMotDePasseConfirm("");
    setErreur("");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
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
        <main className="flex-1 p-4 md:p-8 md:ml-64 flex flex-col items-center">
          <div className="bg-neutral-900 rounded-2xl p-4 sm:p-8 md:p-12 shadow-lg w-full max-w-3xl">
            {/* Profil résumé */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-4 sm:mb-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-black">{user.avatar}</div>
                <div className="text-xl font-bold text-white">{user.prenom} {user.nom}</div>
                <div className="text-sm text-orange-400 font-semibold">{user.typeCommerce}</div>
              </div>
              <div className="flex-1 flex flex-col gap-2 sm:gap-3 items-center sm:items-start">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 text-xs">Membre depuis {user.membreDepuis}</span>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold mt-1 sm:mt-2" onClick={() => setEdit(true)}>
                  <Edit2 size={16} className="mr-2" /> Modifier
                </Button>
              </div>
            </div>
            {/* Formulaire d'édition */}
            <form onSubmit={handleSave} className="space-y-4 sm:space-y-6 bg-neutral-900 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg font-bold text-white mb-4">Informations Personnelles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Nom *</label>
                  <input name="nom" value={form.nom} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Prénom *</label>
                  <input name="prenom" value={form.prenom} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-neutral-300 mb-1">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit} />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Sexe *</label>
                  <select name="sexe" value={form.sexe} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit}>
                    <option value="Femme">Femme</option>
                    <option value="Homme">Homme</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Téléphone *</label>
                  <input name="telephone" value={form.telephone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-neutral-300 mb-1">WhatsApp *</label>
                  <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-neutral-300 mb-1">Type de Commerce *</label>
                  <input name="typeCommerce" value={form.typeCommerce} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-neutral-300 mb-1">Plan d'abonnement *</label>
                  <select name="plan" value={form.plan} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" required disabled={!edit}>
                    <option value="Mensuel - 1.000 FCFA/mois (Populaire)">Mensuel - 1.000 FCFA/mois (Populaire)</option>
                    <option value="Annuel - 10.000 FCFA/an">Annuel - 10.000 FCFA/an</option>
                  </select>
                </div>
                {/* Champs mot de passe et confirmation juste après le plan */}
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm text-neutral-300 mb-1">Mot de passe</label>
                    <div className="relative">
                      <input
                        name="motDePasse"
                        type={motDePasseVisible ? "text" : "password"}
                        value={edit ? motDePasse : user.motDePasse}
                        onChange={e => edit ? setMotDePasse(e.target.value) : null}
                        className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white pr-10"
                        placeholder="Mot de passe"
                        disabled={!edit}
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" onClick={() => setMotDePasseVisible(v => !v)}>
                        {motDePasseVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-300 mb-1">Confirmer le mot de passe</label>
                    <div className="relative">
                      <input
                        name="motDePasseConfirm"
                        type={motDePasseConfirmVisible ? "text" : "password"}
                        value={edit ? motDePasseConfirm : user.motDePasse}
                        onChange={e => edit ? setMotDePasseConfirm(e.target.value) : null}
                        className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white pr-10"
                        placeholder="Confirmer le mot de passe"
                        disabled={!edit}
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" onClick={() => setMotDePasseConfirmVisible(v => !v)}>
                        {motDePasseConfirmVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {erreur && <div className="text-red-500 text-center font-semibold mt-1 sm:mt-2">{erreur}</div>}
              {edit && (
                <div className="flex justify-end gap-2 mt-2 sm:mt-4">
                  <Button variant="outline" onClick={() => { setForm(user); setEdit(false); setMotDePasse(""); setMotDePasseConfirm(""); setErreur(""); }}>Annuler</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold" type="submit">Enregistrer</Button>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 