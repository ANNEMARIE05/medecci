"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, UserCircle, LogOut, Home, Clock, User, Plus, AlertTriangle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const stats = [
  { label: "Commandes", value: 5, icon: <Clock size={22} />, sub: "Ce mois" },
  { label: "Messages", value: 2, icon: <User size={22} />, sub: "Non lus" },
];

const notifications = [
  { title: "Commande expédiée", desc: "Votre commande #123 a été expédiée.", date: "10/07/2024", unread: true },
  { title: "Profil mis à jour", desc: "Votre profil a été mis à jour.", date: "09/07/2024", unread: false },
];

const recentActivity = [
  { action: "Commande passée", date: "08/07/2024" },
  { action: "Message reçu", date: "07/07/2024" },
];

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

export default function UtilisateurDashboardPage() {
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
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <h1 className="text-2xl font-black text-white mb-2">Bienvenue sur votre espace utilisateur</h1>
          <p className="text-neutral-300 mb-6">Gérez vos articles, consultez votre historique ou modifiez votre profil en un clic.</p>
          {/* Actions rapides sous forme de grandes cards sobres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/dashboard/utilisateur/ajouter-article" className="group block bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl shadow-lg p-8 transition-all duration-300 h-full border border-neutral-800">
              <div className="flex flex-col items-center justify-center h-full">
                <Plus size={40} className="mb-4 text-orange-500 group-hover:text-orange-600 transition-colors" />
                <h2 className="text-2xl font-bold mb-2">Ajouter un article</h2>
                <p className="text-base opacity-80">Publiez rapidement un nouvel article sur la plateforme.</p>
              </div>
            </Link>
            <Link href="/dashboard/utilisateur/historique" className="group block bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl shadow-lg p-8 transition-all duration-300 h-full border border-neutral-800">
              <div className="flex flex-col items-center justify-center h-full">
                <Clock size={40} className="mb-4 text-blue-700 group-hover:text-blue-800 transition-colors" />
                <h2 className="text-2xl font-bold mb-2">Historique</h2>
                <p className="text-base opacity-80">Consultez l'historique de vos actions et commandes.</p>
              </div>
            </Link>
            <Link href="/dashboard/utilisateur/profile" className="group block bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl shadow-lg p-8 transition-all duration-300 h-full border border-neutral-800">
              <div className="flex flex-col items-center justify-center h-full">
                <User size={40} className="mb-4 text-neutral-400 group-hover:text-white transition-colors" />
                <h2 className="text-2xl font-bold mb-2">Profil</h2>
                <p className="text-base opacity-80">Gérez vos informations personnelles et votre abonnement.</p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
} 