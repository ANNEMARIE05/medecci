"use client";

import Image from 'next/image';
import { MessageCircle, Phone, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const produits = [
  {
    id: 1,
    nom: "Pagnes Traditionnels",
    description: "Tissus colorés et motifs traditionnels africains pour vêtements et décoration",
    prix: "12.500",
    imageUrl: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Textiles"
  },
  {
    id: 2,
    nom: "Fruits Frais Locaux",
    description: "Sélection de fruits frais de saison : mangues, bananes, oranges et ananas",
    prix: "3.200",
    imageUrl: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Alimentation"
  },
  {
    id: 3,
    nom: "Poteries Artisanales",
    description: "Vases, pots et ustensiles en terre cuite fabriqués à la main par nos artisans",
    prix: "8.900",
    imageUrl: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Artisanat"
  },
  {
    id: 4,
    nom: "Bijoux Traditionnels",
    description: "Colliers, bracelets et parures en perles et métaux précieux",
    prix: "15.750",
    imageUrl: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Bijouterie"
  },
  {
    id: 5,
    nom: "Épices et Condiments",
    description: "Mélanges d'épices traditionnelles et condiments locaux pour cuisine",
    prix: "2.800",
    imageUrl: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Alimentation"
  },
  {
    id: 6,
    nom: "Sculptures sur Bois",
    description: "Masques, statuettes et objets décoratifs sculptés dans le bois local",
    prix: "25.400",
    imageUrl: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Artisanat"
  },
  {
    id: 7,
    nom: "Huiles Essentielles",
    description: "Huiles naturelles extraites de plantes locales pour soins et bien-être",
    prix: "6.500",
    imageUrl: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Bien-être"
  },
  {
    id: 8,
    nom: "Tissus Wax",
    description: "Tissus imprimés aux couleurs vives et motifs africains authentiques",
    prix: "18.900",
    imageUrl: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Textiles"
  },
  {
    id: 9,
    nom: "Produits de Beauté",
    description: "Savons, crèmes et produits de soin naturels fabriqués localement",
    prix: "4.200",
    imageUrl: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    categorie: "Bien-être"
  }
];

export function generateStaticParams() {
  return produits.map((produit) => ({ id: produit.id.toString() }));
}

export default function Page({ params }: { params: { id: string } }) {
  const produit = produits.find((p) => p.id.toString() === params.id);
  if (!produit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Produit introuvable</h1>
          <Link href="/produits" className="text-orange-600 hover:underline">Retour aux produits</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src={produit.imageUrl}
            alt={produit.nom}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <Link href="/produits" className="inline-flex items-center text-orange-600 hover:underline mb-4">
              <ChevronLeft className="w-4 h-4 mr-1" /> Retour aux produits
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">{produit.nom}</h1>
            <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">{produit.categorie}</span>
            <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">{produit.description}</p>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-3xl font-black text-black">{produit.prix}</span>
              <span className="text-base text-gray-500 font-semibold">FCFA</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => window.open(`https://wa.me/33123456789?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par le produit: ${produit.nom}`)}`, '_blank')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </Button>
            <Button
              onClick={() => window.location.href = 'tel:+33123456789'}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 text-sm"
            >
              <Phone className="w-5 h-5" />
              <span>Appeler</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 