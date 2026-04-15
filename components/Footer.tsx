export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-white font-medium text-sm">API Bank</span>
          <span className="text-slate-500 text-sm">· Banco Supervielle S.A.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-slate-500">
          <a href="#producto" className="hover:text-slate-300 transition-colors">Producto</a>
          <a href="#como-funciona" className="hover:text-slate-300 transition-colors">Cómo funciona</a>
          <a href="#contacto" className="hover:text-slate-300 transition-colors">Contacto</a>
        </div>
        <div className="text-sm text-slate-500">
          <a href="mailto:apibank@supervielle.com.ar" className="hover:text-slate-300 transition-colors">
            apibank@supervielle.com.ar
          </a>
        </div>
        <div className="text-xs text-slate-600">
          © {new Date().getFullYear()} Banco Supervielle S.A. · BCRA
        </div>
      </div>
    </footer>
  );
}
