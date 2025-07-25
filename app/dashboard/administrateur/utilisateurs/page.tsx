"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, Newspaper, Bell, UserCircle, LogOut, Home, Eye, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const users = [
  { name: "Marie Koné", avatar: "M", specialite: "Commerçante", statut: "Actif", contact: "+225 01 23 45 67 89", plan: "Mensuel", articles: 12, lastLogin: "09/07/2024 10:12" },
  { name: "Fatou Traoré", avatar: "F", specialite: "Coiffeuse", statut: "Actif", contact: "+225 07 12 34 56 78", plan: "Hebdo", articles: 5, lastLogin: "08/07/2024 18:45" },
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

export default function UtilisateursSuperadminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState(users);
  const [viewUser, setViewUser] = useState<null | typeof users[0]>(null);
  const [deleteIdx, setDeleteIdx] = useState<null | number>(null);

  // Filtrage par recherche
  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.contact?.toLowerCase().includes(search.toLowerCase())
  );

  // Suppression d'un utilisateur
  const handleDelete = (idx: number) => {
    setUserList(prev => prev.filter((_, i) => i !== idx));
    setDeleteIdx(null);
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
          <span className="text-xl font-bold text-white tracking-tight">Utilisateurs</span>
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
            <h1 className="text-2xl font-bold text-white">Gestion des Utilisateurs</h1>
            <div className="text-neutral-400 text-sm">{filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''}</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
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
                    <th className="py-3 px-4 text-left">Utilisateur</th>
                    <th className="py-3 px-4 text-left">Contact</th>
                    <th className="py-3 px-4 text-left">Plan</th>
                    <th className="py-3 px-4 text-left">Articles</th>
                    <th className="py-3 px-4 text-left">Statut</th>
                    <th className="py-3 px-4 text-left">Dernière Connexion</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr key={idx} className="border-t border-neutral-800 hover:bg-neutral-800">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center font-bold text-blue-200 text-base">{user.avatar}</span>
                        <div>
                          <div className="font-semibold text-white">{user.name}</div>
                          <div className="text-neutral-400 text-xs">{user.specialite}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">{user.contact}</td>
                      <td className="py-3 px-4 text-neutral-300">{user.plan}</td>
                      <td className="py-3 px-4 text-neutral-300">{user.articles}</td>
                      <td className="py-3 px-4">
                        <Badge variant={user.statut === "Actif" ? "default" : "secondary"}>{user.statut}</Badge>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">{user.lastLogin}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button size="icon" variant="ghost" className="text-blue-400" title="Voir" onClick={() => setViewUser(user)}>
                          <Eye size={18} />
                        </Button>
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
          {/* Modal Voir Utilisateur */}
          <Dialog open={!!viewUser} onOpenChange={open => !open && setViewUser(null)}>
            <DialogContent className="max-w-md bg-neutral-900 border border-neutral-800 text-white rounded-2xl shadow-2xl animate-fade-in p-8">
              <DialogHeader>
                <DialogTitle>Détails de l'utilisateur</DialogTitle>
              </DialogHeader>
              {viewUser && (
                <div className="space-y-8 mt-2">
                  <div className="flex items-center gap-6">
                    <span className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-800 to-blue-400 flex items-center justify-center font-bold text-white text-4xl shadow-lg border-4 border-blue-900">{viewUser.avatar}</span>
                    <div>
                      <div className="font-semibold text-white text-2xl leading-tight">{viewUser.name}</div>
                      <div className="text-blue-200 text-base font-medium">{viewUser.specialite}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <div className="text-xs text-neutral-400 mb-1">Contact</div>
                      <div className="text-white font-semibold text-base tracking-wide">{viewUser.contact}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 mb-1">Plan</div>
                      <div className="text-white font-semibold text-base tracking-wide">{viewUser.plan}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 mb-1">Articles</div>
                      <div className="text-white font-semibold text-base tracking-wide">{viewUser.articles}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 mb-1">Statut</div>
                      <div><Badge variant={viewUser.statut === "Actif" ? "default" : "secondary"}>{viewUser.statut}</Badge></div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-xs text-neutral-400 mb-1">Dernière Connexion</div>
                      <div className="text-white font-semibold text-base tracking-wide">{viewUser.lastLogin}</div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          {/* Modal Confirmation Suppression */}
          <Dialog open={deleteIdx !== null} onOpenChange={open => !open && setDeleteIdx(null)}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.</DialogDescription>
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