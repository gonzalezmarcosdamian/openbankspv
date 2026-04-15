const profiles = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Marketplaces y plataformas",
    description: "Gestioná CVUs para tus vendedores, automatizá cobros y liquidaciones sin depender de integraciones bancarias complejas.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Retailers y cadenas",
    description: "Aceptá pagos QR, Debin y transferencias en todos tus puntos de venta con conciliación automática centralizada.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "PSPs y fintechs",
    description: "Cambiá de banco sponsor o lanzá tu billetera digital con CVUs reales sobre infraestructura COELSA desde el día 1.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Gestoras y empresas de cobranza",
    description: "Automatizá débitos recurrentes, controlá recaudación por CVU y conciliá miles de operaciones sin intervención manual.",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="py-20 px-6 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">¿Para quién es?</h2>
          <p className="text-slate-500">
            Cualquier empresa que necesite operar pagos sobre infraestructura bancaria real.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profiles.map((p) => (
            <div key={p.title} className="p-5 border border-slate-100 rounded-xl hover:border-red-100 hover:bg-red-50/30 transition-all group">
              <div className="w-10 h-10 bg-slate-50 group-hover:bg-red-100 text-slate-500 group-hover:text-red-600 rounded-lg flex items-center justify-center mb-4 transition-colors">
                {p.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
