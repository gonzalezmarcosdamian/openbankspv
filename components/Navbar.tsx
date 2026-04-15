"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE = "/openbankspv";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  const anchor = (hash: string) =>
    isHome ? hash : `${BASE}/${hash}`;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-50 border-b border-amber-200 text-amber-800 text-xs text-center py-2 px-4">
        Demo a modo de aprendizaje. Los datos, endpoints y flujos son ejemplos ilustrativos y no representan un producto real de Banco Supervielle.
      </div>
      <nav className="fixed top-10 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-slate-900">API Bank</span>
            <span className="text-slate-400 text-sm ml-1">by Supervielle</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href={anchor("#producto")} className="hover:text-slate-900 transition-colors">Producto</a>
            <a href={anchor("#como-funciona")} className="hover:text-slate-900 transition-colors">Como funciona</a>
            <Link href="/docs" className="hover:text-slate-900 transition-colors">Documentacion</Link>
          </div>
          <div className="flex items-center gap-3">
            <a href={anchor("#contacto")} className="text-sm text-slate-600 hover:text-slate-900 transition-colors hidden md:block">
              Hablar con el equipo
            </a>
            <a href={anchor("#contacto")} className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
              Empezar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
