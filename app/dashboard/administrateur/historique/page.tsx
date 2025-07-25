"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, Newspaper, Bell, UserCircle, LogOut, Home, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const actions = [
  { type: "Suppression", icon: <Trash2 size={18} />, user: "Marie Koné", details: "Suppression de l'utilisateur et de ses 23 articles", date: "20/01/2024 14:30" },
  { type: "Modification", icon: <Edit size={18} />, user: "Fatou Traoré", details: "Modification du plan: Hebdo → Mensuel", date: "20/01/2024 12:15" },
  { type: "Connexion", icon: <Users size={18} />, user: "user", details: "Connexion à l'interface utilisateur", date: "20/01/2024 09:00" },
  { type: "Connexion", icon: <Users size={18} />, user: "administrateur", details: "Connexion à l'interface administrateur", date: "20/01/2024 08:00" },
];

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
          <div className="text-xs text-neutral-400">Administrateur</div>
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

export default function HistoriqueSuperadminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [actionsList, setActionsList] = useState(actions);
  const [deleteIdx, setDeleteIdx] = useState<null | number>(null);

  // Filtrage par recherche
  const filteredActions = actionsList.filter(action =>
    action.user.toLowerCase().includes(search.toLowerCase()) ||
    action.details.toLowerCase().includes(search.toLowerCase()) ||
    action.type.toLowerCase().includes(search.toLowerCase())
  );

  // Suppression d'une ligne
  const handleDelete = (idx: number) => {
    setActionsList(prev => prev.filter((_, i) => i !== idx));
    setDeleteIdx(null);
  };

  // Vider l'historique
  const handleClear = () => setActionsList([]);

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
          <span className="text-xl font-bold text-white tracking-tight">Historique</span>
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
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full md:ml-64">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">Historique des Actions</h1>
            <Button variant="destructive" onClick={handleClear}>Vider l'historique</Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher dans l'historique..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full md:w-72 px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Card className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800 mb-8">
            <CardContent className="p-0 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-neutral-400 border-b border-neutral-800">
                    <th className="py-3 px-4 text-left">Action</th>
                    <th className="py-3 px-4 text-left">Utilisateur Concerné</th>
                    <th className="py-3 px-4 text-left">Détails</th>
                    <th className="py-3 px-4 text-left">Date & Heure</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActions.map((action, idx) => (
                    <tr key={idx} className="border-t border-neutral-800 hover:bg-neutral-800">
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-neutral-700">
                          {action.icon} {action.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">{action.user}</td>
                      <td className="py-3 px-4 text-neutral-300 truncate max-w-xs">{action.details}</td>
                      <td className="py-3 px-4 text-neutral-500">{action.date}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button size="icon" variant="ghost" className="text-red-400" title="Supprimer" onClick={() => setDeleteIdx(idx)}>
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          {/* Modal Confirmation Suppression */}
          <Dialog open={deleteIdx !== null} onOpenChange={open => !open && setDeleteIdx(null)}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>Voulez-vous vraiment supprimer cette ligne d'historique ? Cette action est irréversible.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setDeleteIdx(null)}>Annuler</Button>
                <Button variant="destructive" onClick={() => deleteIdx !== null && handleDelete(deleteIdx)}>Supprimer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
} 