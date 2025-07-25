"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserPlus, Users, Newspaper, Bell, UserCircle, LogOut, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const stats = [
  { label: "Nouvelles Inscriptions", value: 12, icon: <UserPlus size={22} />, sub: "Cette semaine" },
  { label: "Utilisateurs Actifs", value: 156, icon: <Users size={22} />, sub: "Ce mois" },
  { label: "Articles Publiés", value: 1234, icon: <Newspaper size={22} />, sub: "+18 aujourd'hui" },
];

const notifications = [
  { title: "Nouvelle inscription", desc: "Marie Koné vient de s'inscrire", date: "09/07/2024", unread: true },
  { title: "Nouvel article", desc: "Aminata Dialla a publié un article", date: "09/07/2024", unread: false },
];

const recentActivity = [
  { user: "user", action: "Nouvelle inscription", date: "09/07/2024" },
  { user: "user", action: "Mise à jour du profil", date: "09/07/2024" },
  { user: "administrateur", action: "Connexion", date: "09/07/2024" },
];

const recentUsers = [
  { name: "Marie Koné", avatar: "M", specialite: "Commerçante", statut: "Actif" },
  { name: "Fatou Traoré", avatar: "F", specialite: "Coiffeuse", statut: "Actif" },
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
          <div className="font-bold text-lg text-white">MDT</div>
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

export default function SuperadminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
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
          <span className="text-xl font-bold text-white tracking-tight">Dashboard Administrateur</span>
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
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <Card key={idx} className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex-shrink-0 bg-neutral-800 rounded-full p-3 text-white">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-neutral-200 font-semibold">{stat.label}</div>
                    <div className="text-neutral-400 text-sm">{stat.sub}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Notifications + Activité */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Notifications */}
            <Card className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">Notifications récentes</h2>
                  <Button variant="ghost" size="sm" className="text-blue-400 text-sm font-medium">Tout marquer comme lu</Button>
                </div>
                <div className="flex flex-col gap-3">
                  {notifications.map((notif, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${notif.unread ? "bg-neutral-800 border-l-4 border-blue-400" : ""}`}>
                      <div className="mt-1"><Bell size={18} className={notif.unread ? "text-blue-400" : "text-neutral-500"} /></div>
                      <div className="flex-1">
                        <div className="font-semibold text-white flex items-center gap-2">
                          {notif.title}
                          {notif.unread && <span className="w-2 h-2 bg-blue-400 rounded-full inline-block" />}
                        </div>
                        <div className="text-neutral-300 text-sm">{notif.desc}</div>
                        <div className="text-neutral-500 text-xs mt-1">{notif.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Activité Récente */}
            <Card className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-white mb-4">Activité récente</h2>
                <ol className="relative border-l-2 border-neutral-800 ml-4">
                  {recentActivity.map((item, idx) => (
                    <li key={idx} className="mb-8 ml-6">
                      <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-neutral-900 border-2 border-neutral-800 rounded-full shadow text-neutral-400 font-bold text-lg">{item.user[0]}</span>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-white">{item.user}</span>
                        <span className="text-neutral-300 text-sm">{item.action}</span>
                        <span className="text-neutral-500 text-xs">{item.date}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
          {/* Utilisateurs récents */}
          <Card className="rounded-xl shadow-sm bg-neutral-900 border-neutral-800 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Utilisateurs récents</h2>
                <Button variant="ghost" size="sm" className="text-blue-400 text-sm font-medium">Voir tout →</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentUsers.map((user, idx) => (
                  <div key={idx} className="flex items-center gap-4 rounded-lg bg-neutral-800 p-4 shadow-sm">
                    <span className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center font-bold text-blue-200 text-lg">{user.avatar}</span>
                    <div>
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-neutral-300 text-xs mb-1">{user.specialite}</div>
                      <Badge variant={user.statut === "Actif" ? "default" : "secondary"}>{user.statut}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
} 