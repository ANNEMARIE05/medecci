import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MEDEC-CI - Plateforme Artisanale Premium',
  description: 'Découvrez l\'artisanat ivoirien authentique. Une sélection exclusive de produits locaux, textiles, bijoux et créations artisanales de qualité premium.',
  keywords: 'artisanat ivoirien, produits locaux, textiles africains, bijoux traditionnels, Côte d\'Ivoire, commerce équitable',
  authors: [{ name: 'MEDEC-CI Team' }],
  openGraph: {
    title: 'MEDEC-CI - Artisanat Ivoirien Premium',
    description: 'Découvrez l\'artisanat ivoirien authentique avec MEDEC-CI',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEDEC-CI - Artisanat Ivoirien Premium',
    description: 'Découvrez l\'artisanat ivoirien authentique avec MEDEC-CI',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-50 to-orange-50/30`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
