import React from "react";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <nav className="w-full bg-blue-900 text-white py-4 px-8 flex items-center shadow-md z-50">
      <span className="text-2xl font-black tracking-wide">{title}</span>
    </nav>
  );
} 