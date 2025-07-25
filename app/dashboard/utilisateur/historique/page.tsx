"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle, LogOut, Home, Clock, User, Plus, Image as ImageIcon, Search, Trash } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

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

// Données fictives pour l'historique des produits
const produits = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    nom: "iPhone 13 Pro Max",
    description: "État neuf, 256Go, accessoires inclus.",
    prix: 450000,
    whatsapp: "+225 01 23 45 67 89",
    date: "10/07/2024",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    nom: "Samsung Galaxy S22 Ultra",
    description: "Très bon état, double SIM, garantie 6 mois.",
    prix: 400000,
    whatsapp: "+225 07 12 34 56 78",
    date: "09/07/2024",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    nom: "Casque Bluetooth JBL",
    description: "Sans fil, autonomie 20h, couleur noire.",
    prix: 35000,
    whatsapp: "+225 05 98 76 54 32",
    date: "08/07/2024",
  },
];

export default function HistoriqueUtilisateur() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [produitsState, setProduitsState] = useState(produits);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const produitsFiltres = produitsState.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.whatsapp.replace(/\s+/g, '').includes(search.replace(/\s+/g, ''))
  );

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };
  const confirmDelete = () => {
    setProduitsState(produitsState.filter(p => p.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };
  const cancelDelete = () => setConfirmDeleteId(null);

  const handleVoir = (produit) => {
    setSelectedProduit({ ...produit });
    setModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduit(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedProduit(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProduitsState(produitsState.map(p => p.id === selectedProduit.id ? selectedProduit : p));
    setModalOpen(false);
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
          <span className="font-black text-lg text-white hidden md:inline">MEDEC-CI</span>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl font-black text-white">Historique de vos produits</h1>
            <Link href="/dashboard/utilisateur/ajouter-article">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-base shadow">Ajouter un produit</Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-neutral-700 bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder="Rechercher par nom ou WhatsApp..."
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full bg-neutral-900 text-white text-sm">
              <thead>
                <tr className="bg-neutral-800 text-neutral-200">
                  <th className="py-3 px-4 text-left font-semibold">Image</th>
                  <th className="py-3 px-4 text-left font-semibold">Nom</th>
                  <th className="py-3 px-4 text-left font-semibold">Prix</th>
                  <th className="py-3 px-4 text-left font-semibold">WhatsApp</th>
                  <th className="py-3 px-4 text-left font-semibold">Date</th>
                  <th className="py-3 px-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {produitsFiltres.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-400">Aucun produit trouvé.</td>
                  </tr>
                ) : (
                  produitsFiltres.map((p) => (
                    <tr key={p.id} className="border-b border-neutral-800 last:border-b-0 hover:bg-white/5 transition">
                      <td className="py-3 px-4">
                        <img src={p.image} alt={p.nom} className="w-14 h-14 object-cover rounded-lg border border-neutral-700 bg-neutral-800" />
                      </td>
                      <td className="py-3 px-4 font-semibold">{p.nom}
                        <div className="text-xs text-neutral-400 font-normal mt-1">{p.description}</div>
                      </td>
                      <td className="py-3 px-4">{p.prix.toLocaleString()} FCFA</td>
                      <td className="py-3 px-4">{p.whatsapp}</td>
                      <td className="py-3 px-4">{p.date}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button size="sm" variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-500/10" onClick={() => handleVoir(p)}>Voir</Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-600/10 flex items-center gap-1" onClick={() => handleDelete(p.id)}>
                          <Trash size={16} />
                          <span>Supprimer</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
        {/* Modal de détails/modification */}
        {modalOpen && selectedProduit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative">
              <button className="absolute top-3 right-3 text-neutral-400 hover:text-white" onClick={() => setModalOpen(false)}><X size={22} /></button>
              <h2 className="text-xl font-bold text-white mb-6">Détails du produit</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center">
                  <img src={selectedProduit.image} alt={selectedProduit.nom} className="w-32 h-32 object-cover rounded-lg border border-neutral-700 bg-neutral-800 mb-2" />
                  <label className="text-xs text-neutral-400 cursor-pointer hover:text-orange-500">
                    Modifier l'image
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Nom</label>
                  <input name="nom" value={selectedProduit.nom} onChange={handleModalChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Prix (FCFA)</label>
                  <input name="prix" type="number" value={selectedProduit.prix} onChange={handleModalChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Numéro WhatsApp</label>
                  <input name="whatsapp" value={selectedProduit.whatsapp} onChange={handleModalChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Description</label>
                  <textarea name="description" value={selectedProduit.description} onChange={handleModalChange} className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white min-h-[80px]" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setModalOpen(false)}>Annuler</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold" onClick={handleSave}>Enregistrer</Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal de confirmation suppression */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-sm shadow-2xl relative text-center">
              <h2 className="text-xl font-bold text-white mb-4">Confirmer la suppression</h2>
              <p className="text-neutral-300 mb-6">Voulez-vous vraiment supprimer ce produit ? Cette action est irréversible.</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={cancelDelete}>Annuler</Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold" onClick={confirmDelete}>Supprimer</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 