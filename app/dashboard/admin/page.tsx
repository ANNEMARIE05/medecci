"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, PlusCircle, History, LayoutDashboard, UserCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { usePathname } from "next/navigation";

const adminSidebar = [
  { label: "Tableau de bord", icon: <LayoutDashboard />, href: "/dashboard/admin" },
  { label: "Ajouter un article", icon: <PlusCircle />, href: "/dashboard/admin/ajouter-article" },
  { label: "Historique", icon: <History />, href: "/dashboard/admin/historique" },
  { label: "Profile", icon: <UserCircle />, href: "/dashboard/admin/profile" },
  { label: "Déconnexion", icon: <LogOut />, href: "/login", logout: true },
];

const adminCards = [
  { title: "Ajouter un article", description: "Créer un nouvel article.", href: "/dashboard/admin/ajouter-article", icon: <PlusCircle className="w-8 h-8 text-blue-900" /> },
  { title: "Historique", description: "Voir l'historique des actions.", href: "/dashboard/admin/historique", icon: <History className="w-8 h-8 text-blue-900" /> },
  { title: "Profile", description: "Gérer votre profil.", href: "/dashboard/admin/profile", icon: <UserCircle className="w-8 h-8 text-blue-900" /> },
];

export default function AdminDashboardPage() {
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [produits, setProduits] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setUserPhone(localStorage.getItem("userPhone"));
    // Charger les produits depuis localStorage
    const produitsStockes = JSON.parse(localStorage.getItem("produits") || "[]");
    setProduits(produitsStockes);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userPhone");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col py-8 px-4 space-y-2">
        <div className="mb-8 flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-lg">MDT</span>
          </div>
          <span className="font-black text-blue-900 text-xl">Dashboard</span>
        </div>
        {adminSidebar.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.logout ? handleLogout : undefined}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all
                ${isActive ? "bg-blue-100 text-blue-900 font-bold" : "text-gray-700 hover:bg-blue-50"}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </aside>
      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-2 z-50">
        {adminSidebar.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={item.logout ? handleLogout : undefined}
            className="flex flex-col items-center text-gray-700 hover:text-blue-900"
          >
            {item.icon}
          </Link>
        ))}
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen max-h-screen">
        {/* Navbar en haut de la partie droite */}
        <Navbar title="Dashboard Admin" />
        {/* Contenu principal scrollable */}
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">

          <h1 className="text-3xl md:text-4xl font-black text-blue-900 mb-4">Bienvenue {userPhone ? userPhone : "Utilisateur"} !</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl mt-8">
            {adminCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {card.icon}
                <h2 className="mt-4 text-xl font-bold text-blue-900 group-hover:text-orange-600 transition-colors">{card.title}</h2>
                <p className="text-gray-600 mt-2 text-center">{card.description}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 