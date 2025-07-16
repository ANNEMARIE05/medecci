"use client";
import { useState, useEffect } from "react";
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

export default function AjouterArticlePage() {
  const [form, setForm] = useState({
    nom: "",
    prix: "",
    description: "",
    whatsapp: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [produits, setProduits] = useState<any[]>([]);
  const [error, setError] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    const produitsStockes = JSON.parse(localStorage.getItem("produits") || "[]");
    setProduits(produitsStockes);
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const produits = JSON.parse(localStorage.getItem("produits") || "[]");
    // Vérifier doublon par nom
    if (produits.some((p: any) => p.nom.trim().toLowerCase() === form.nom.trim().toLowerCase())) {
      setError("Un article avec ce nom existe déjà.");
      return;
    }
    const nouveauProduit = {
      nom: form.nom,
      prix: form.prix,
      description: form.description,
      whatsapp: form.whatsapp,
      image: imagePreview,
      date: new Date().toISOString(),
    };
    produits.push(nouveauProduit);
    localStorage.setItem("produits", JSON.stringify(produits));
    setSuccess(true);
    setForm({ nom: "", prix: "", description: "", whatsapp: "", image: null });
    setImagePreview(null);
    setTimeout(() => setSuccess(false), 3000);
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
        <main className="flex-1 overflow-y-auto flex flex-col gap-8 p-6 md:p-12 lg:p-16 bg-gray-50">
          {/* Formulaire d'ajout */}
          <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">Ajouter un article</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nom de l'article</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Nom de l'article"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prix de l'article (FCFA)</label>
                <input
                  type="number"
                  name="prix"
                  value={form.prix}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Prix de l'article en FCFA"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description de l'article</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Description de l'article"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Numéro WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Numéro WhatsApp"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image de l'article</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Aperçu" className="mt-3 rounded-lg w-full max-h-48 object-contain border" />
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
              >
                Ajouter l'article
              </button>
              {success && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center">
                  Article ajouté avec succès !
                </div>
              )}
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-center">
                {error}
              </div>
            )}
          </div>
          {/* Liste des articles sous forme de cards (très grandes, pleine largeur) */}
          <div className="w-full">
            {produits.length > 0 && (
              <div className="grid grid-cols-1 gap-12">
                {produits.map((produit, idx) => (
                  <div key={idx} className="bg-white rounded-3xl shadow-2xl hover:shadow-2xl transition-shadow duration-300 p-16 flex flex-col items-center border border-gray-100 group w-full">
                    {produit.image && (
                      <img src={produit.image} alt={produit.nom} className="w-full h-[32rem] object-cover rounded-2xl mb-10 border group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <h3 className="font-bold text-4xl text-blue-900 mb-4 group-hover:text-orange-600 transition-colors text-center w-full">{produit.nom}</h3>
                    <p className="text-orange-700 font-bold mb-4 text-3xl w-full text-center">{produit.prix} FCFA</p>
                    <p className="text-gray-700 text-2xl mb-8 text-center w-full">{produit.description}</p>
                    <p className="text-gray-500 text-lg mb-4 w-full text-center">WhatsApp : {produit.whatsapp}</p>
                    <p className="text-gray-400 text-base w-full text-center">Ajouté le {new Date(produit.date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 