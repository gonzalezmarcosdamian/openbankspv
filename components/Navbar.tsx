"use client";

import { useState, useEffect } from "react";

const BASE = "/openbankspv";

// Siempre usa paths absolutos en href.
// En el click, lee window.location en ese momento:
//   - si estamos en home → smooth scroll (preventDefault)
//   - si estamos en docs → deja navegar al browser normalmente
function anchorProps(sectionId: string) {
  return {
    href: `${BASE}/#${sectionId}`,
    onClick(e: React.MouseEvent<HTMLAnchorElement>) {
      if (!window.location.pathname.includes("/docs")) {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }
    },
  };
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [onDocs, setOnDocs] = useState(false);

  useEffect(() => {
    setOnDocs(window.location.pathname.includes("/docs"));

    if (window.location.pathname.includes("/docs")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ["producto", "como-funciona", "documentacion", "contacto"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const linkClass = (section: string) =>
    `hover:text-slate-900 transition-colors ${
      (onDocs && section === "docs") || (!onDocs && activeSection === section)
        ? "text-slate-900 font-semibold"
        : "text-slate-500"
    }`;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-50 border-b border-amber-200 text-amber-800 text-xs text-center py-2 px-4">
        Demo a modo de aprendizaje. Los datos, endpoints y flujos son ejemplos ilustrativos y no representan un producto real de Banco Supervielle.
      </div>
      <nav className="fixed top-10 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo — siempre navega a home; si ya estamos en home hace scroll top */}
          <a
            href={`${BASE}/`}
            onClick={(e) => {
              if (!window.location.pathname.includes("/docs")) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-slate-900">API Bank</span>
            <span className="text-slate-400 text-sm ml-1">by Supervielle</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a {...anchorProps("producto")} className={linkClass("producto")}>Producto</a>
            <a {...anchorProps("como-funciona")} className={linkClass("como-funciona")}>Como funciona</a>
            <a href={`${BASE}/docs/`} className={linkClass("docs")}>Documentacion</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              {...anchorProps("contacto")}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors hidden md:block"
            >
              Hablar con el equipo
            </a>
            <a
              {...anchorProps("contacto")}
              className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Empezar
            </a>
          </div>

        </div>
      </nav>
    </>
  );
}
