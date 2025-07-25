"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, Newspaper, Bell, UserCircle, LogOut, Home, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard/administrateur", icon: <Home size={18} /> },
  { label: "Utilisateurs", href: "/dashboard/administrateur/utilisateurs", icon: <Users size={18} /> },
  { label: "Historique", href: "/dashboard/administrateur/historique", icon: <Newspaper size={18} /> },
  { label: "Profil", href: "/dashboard/administrateur/profile", icon: <UserCircle size={18} /> },
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
          <div className="text-xs text-neutral-400">Super Administrateur</div>
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

export default function ProfileSuperadminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profile, setProfile] = useState({
    prenom: "Admin",
    nom: "MEDEC-CI",
    email: "admin@medec-ci.com",
    telephone: "0769144813",
    password: "admin123@",
    newPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Ici tu pourrais ajouter une logique d'API pour sauvegarder
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white" aria-label="Ouvrir le menu">
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </Button>
            </SheetTrigger>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </Sheet>
          <span className="text-xl font-bold text-white tracking-tight">Profil</span>
                    </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative text-white">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-neutral-900" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <UserCircle size={24} />
          </Button>
            </div>
        </header>
      {/* Sidebar desktop */}
      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col w-64 bg-neutral-900 border-r border-neutral-800 fixed inset-y-0 left-0 z-40">
          <SidebarContent pathname={pathname} />
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full md:ml-64">
          <h1 className="text-2xl font-bold text-white mb-6 text-left">Profil Administrateur</h1>
          <Card className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800 mb-8 w-full">
            <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-neutral-800 flex items-center justify-center text-5xl font-bold text-white">
                  AM
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-1">{profile.prenom} {profile.nom}</h2>
                <div className="text-neutral-300 text-lg mb-2">{profile.email}</div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-neutral-400 text-sm">
                  <span className="flex items-center gap-1"><Users size={16} /> {profile.telephone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Informations Personnelles */}
          <Card className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800 mb-8 w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Informations Personnelles</h3>
                {editMode ? (
                  <Button variant="secondary" onClick={handleSave}>Enregistrer</Button>
                ) : (
                  <Button variant="outline" onClick={() => setEditMode(true)}>Modifier</Button>
                )}
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-400 mb-2">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={profile.prenom}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-400 mb-2">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={profile.nom}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-400 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={profile.telephone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </CardContent>
          </Card>
          {/* Sécurité */}
          <Card className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800 mb-8 w-full">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Sécurité</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-400 mb-2">Mot de passe actuel</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-blue-400"
                      tabIndex={-1}
                      onClick={() => setShowPassword(v => !v)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-400 mb-2">Nouveau mot de passe</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={profile.newPassword}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-blue-400"
                      tabIndex={-1}
                      onClick={() => setShowNewPassword(v => !v)}
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
        </div>
    </div>
  );
} 