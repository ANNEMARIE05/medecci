"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, PlusCircle, History, LayoutDashboard, UserCircle } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { usePathname } from "next/navigation";

const adminSidebar = [
  { label: "Tableau de bord", icon: <LayoutDashboard />, href: "/dashboard/admin" },
  { label: "Ajouter un article", icon: <PlusCircle />, href: "/dashboard/admin/ajouter-article" },
  { label: "Historique", icon: <History />, href: "/dashboard/admin/historique" },
  { label: "Profile", icon: <UserCircle />, href: "/dashboard/admin/profile" },
  { label: "Déconnexion", icon: <LogOut />, href: "/login", logout: true },
];

export default function ProfilePage() {
  const [whatsapp, setWhatsapp] = useState("");
  const [success, setSuccess] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const phone = localStorage.getItem("userPhone") || "";
    setWhatsapp(phone);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userPhone", whatsapp);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

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
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">Mon profil</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Numéro WhatsApp</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Numéro WhatsApp"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
              >
                Mettre à jour
              </button>
              {success && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center">
                  Numéro mis à jour !
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
