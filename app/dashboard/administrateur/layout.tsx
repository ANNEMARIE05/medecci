"use client";
import React from "react";

interface SuperadminLayoutProps {
  children: React.ReactNode;
}

export default function SuperadminLayout({ children }: SuperadminLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 