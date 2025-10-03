import React from "react";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <nav className="w-full bg-blue-900 text-white py-3 px-6 flex items-center shadow-sm z-50">
      <span className="text-xl font-semibold tracking-tight">{title}</span>
    </nav>
  );
} 