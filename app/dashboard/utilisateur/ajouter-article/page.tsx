"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle, LogOut, Home, Clock, User, Plus, Image as ImageIcon } from "lucide-react";
import { Button } from '@/components/ui/button';

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard/utilisateur", icon: <Home size={18} /> },
  { label: "Ajouter un Article", href: "/dashboard/utilisateur/ajouter-article", icon: <Plus size={18} /> },
  { label: "Historique", href: "/dashboard/utilisateur/historique", icon: <Clock size={18} /> },
  { label: "Profil", href: "/dashboard/utilisateur/profile", icon: <User size={18} /> },
];

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

export default function AjouterArticleUtilisateur() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Produit publié avec succès ! (simulation)");
    setNom("");
    setPrix("");
    setWhatsapp("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
  };

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
        <main className="flex-1 p-4 md:p-8 md:ml-64 flex flex-col items-center">
          <div className="bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-lg w-full max-w-2xl">
            <h1 className="text-2xl font-black text-white mb-8 text-center">Ajouter un Article</h1>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div>
                <label className="block text-sm font-semibold text-neutral-200 mb-2">Nom de l'article</label>
                <input
                  type="text"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  required
                  className="block w-full px-4 py-3 border border-neutral-700 rounded-lg bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ex: iPhone 13 Pro Max"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">Prix (FCFA)</label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="0"
                      value={prix}
                      onChange={e => setPrix(e.target.value)}
                      required
                      className="block w-full px-4 py-3 border border-neutral-700 rounded-lg bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pr-8"
                      placeholder="0"
                    />
                    <span className="absolute right-3 text-neutral-400 font-bold text-lg">₣</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-200 mb-2">Numéro WhatsApp</label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 bg-neutral-800 text-neutral-300 rounded-l-lg border border-r-0 border-neutral-700 select-none">+225</span>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      required
                      className="block w-full px-3 py-3 border border-neutral-700 rounded-r-lg bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-200 mb-2">Description de l'article</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  className="block w-full px-4 py-3 border border-neutral-700 rounded-lg bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 min-h-[120px]"
                  placeholder="Décrivez votre produit en détail : caractéristiques, état, accessoires inclus, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-200 mb-2">Image de l'article</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-32 border-2 border-dashed border-neutral-700 rounded-lg cursor-pointer hover:border-orange-500 transition-all duration-300 bg-neutral-950">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Aperçu" className="h-28 object-contain" />
                    ) : (
                      <span className="flex flex-col items-center text-neutral-400">
                        <ImageIcon size={32} />
                        <span className="text-xs mt-2">Ajouter une image</span>
                      </span>
                    )}
                  </label>
                  {imagePreview && (
                    <Button type="button" variant="outline" className="mt-2 sm:mt-0" onClick={() => { setImage(null); setImagePreview(null); }}>
                      Supprimer l'image
                    </Button>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-3">Publier</Button>
              {message && <div className="text-green-500 text-center font-semibold mt-2">{message}</div>}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 