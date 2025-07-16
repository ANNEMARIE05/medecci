"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { LogOut, History, LayoutDashboard, Users, UserCircle } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { usePathname } from "next/navigation";

const superAdminSidebar = [
  { label: "Tableau de bord", icon: <LayoutDashboard />, href: "/dashboard/superadmin" },
  { label: "Utilisateurs", icon: <Users />, href: "/dashboard/superadmin/utilisateurs" },
  { label: "Historique", icon: <History />, href: "/dashboard/superadmin/historique" },
  { label: "Profile", icon: <UserCircle />, href: "/dashboard/superadmin/profile" },
  { label: "Déconnexion", icon: <LogOut />, href: "/login", logout: true },
];

export default function SuperAdminHistoriquePage() {
  const [produits, setProduits] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<{idx: number|null, open: boolean}>({idx: null, open: false});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const produitsStockes = JSON.parse(localStorage.getItem("produits") || "[]");
    setProduits(produitsStockes);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userPhone");
  };

  const handleDelete = (idx: number) => {
    setConfirmDelete({idx, open: true});
  };

  const confirmDeleteAction = () => {
    if (confirmDelete.idx === null) return;
    const newProduits = produits.filter((_, i) => i !== confirmDelete.idx);
    setProduits(newProduits);
    localStorage.setItem("produits", JSON.stringify(newProduits));
    setConfirmDelete({idx: null, open: false});
  };

  const cancelDeleteAction = () => {
    setConfirmDelete({idx: null, open: false});
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditForm({ ...produits[idx] });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setEditForm((prev: any) => ({ ...prev, image: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = () => {
    if (!editForm.nom || !editForm.prix || !editForm.description || !editForm.whatsapp) return;
    const newProduits = produits.map((p, i) => (i === editIndex ? { ...editForm } : p));
    setProduits(newProduits);
    localStorage.setItem("produits", JSON.stringify(newProduits));
    setEditIndex(null);
    setEditForm(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditForm(null);
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
        {superAdminSidebar.map((item) => {
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
        {superAdminSidebar.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.logout ? handleLogout : undefined}
              className={`flex flex-col items-center text-xs font-semibold transition-all
                ${isActive ? "text-blue-900 font-bold" : "text-gray-700 hover:text-blue-900"}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen max-h-screen">
        <Navbar title="Dashboard Superadmin" />
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
          <div className="w-full max-w-4xl">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">Historique des ajouts</h1>
            {produits.length === 0 ? (
              <p className="text-gray-500">Aucun ajout pour le moment.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Image</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Nom</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Prix</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">WhatsApp</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produits.map((produit, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-3 py-2">
                          {editIndex === idx ? (
                            <>
                              {editForm?.image && (
                                <img src={editForm.image} alt={editForm.nom} className="w-16 h-16 object-contain rounded mb-2" />
                              )}
                              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleEditImage} className="block text-xs" />
                            </>
                          ) : (
                            produit.image && (
                              <img src={produit.image} alt={produit.nom} className="w-16 h-16 object-contain rounded" />
                            )
                          )}
                        </td>
                        <td className="px-3 py-2 font-semibold text-blue-900">
                          {editIndex === idx ? (
                            <input type="text" name="nom" value={editForm.nom} onChange={handleEditChange} className="border rounded px-2 py-1 w-28" />
                          ) : (
                            produit.nom
                          )}
                        </td>
                        <td className="px-3 py-2 text-orange-700">
                          {editIndex === idx ? (
                            <input type="number" name="prix" value={editForm.prix} onChange={handleEditChange} className="border rounded px-2 py-1 w-20" />
                          ) : (
                            `${produit.prix} FCFA`
                          )}
                        </td>
                        <td className="px-3 py-2 text-gray-700">
                          {editIndex === idx ? (
                            <input type="tel" name="whatsapp" value={editForm.whatsapp} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" />
                          ) : (
                            produit.whatsapp
                          )}
                        </td>
                        <td className="px-3 py-2 text-gray-400 text-xs">
                          {editIndex === idx ? (
                            <textarea name="description" value={editForm.description} onChange={handleEditChange} className="border rounded px-2 py-1 w-40 text-xs" rows={2} />
                          ) : (
                            new Date(produit.date).toLocaleString()
                          )}
                        </td>
                        <td className="px-3 py-2 space-x-2">
                          {editIndex === idx ? (
                            <>
                              <button onClick={handleEditSave} className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition">Enregistrer</button>
                              <button onClick={handleEditCancel} className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition">Annuler</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(idx)} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200 transition">Modifier</button>
                              <button onClick={() => handleDelete(idx)} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition">Supprimer</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {confirmDelete.open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center">
                  <p className="text-lg font-semibold text-blue-900 mb-6 text-center">Voulez-vous vraiment supprimer cet article ?</p>
                  <div className="flex gap-4">
                    <button onClick={confirmDeleteAction} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">Supprimer</button>
                    <button onClick={cancelDeleteAction} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">Annuler</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 