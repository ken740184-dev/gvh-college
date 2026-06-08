"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";

export default function MobileHeader() {
  const pathname = usePathname();
  
  if (pathname === "/admin") return null;

  return (
    <div className="md:hidden flex items-center mb-6">
      <Link 
        href="/admin"
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md text-sm w-max"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
