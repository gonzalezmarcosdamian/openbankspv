export default function Hero() {
  return (
    <section className="pt-28 md:pt-40 pb-24 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-3 py-1 rounded-full mb-8 border border-red-100">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Infraestructura regulada · Banco Supervielle S.A.
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Pagos bancarios integrados{" "}
            <span className="text-red-600">en tu producto</span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            CVUs, Debin, Pagos QR y conciliación en una sola API.
            Operá sobre los rieles de un banco regulado sin necesitar licencia propia —
            con el acompañamiento técnico que ningún banco te da.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-base"
            >
              Hablar con el equipo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#documentacion"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ver documentación
            </a>
          </div>
        </div>

        {/* Code snippet decorativo */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-6 max-w-2xl font-mono text-sm shadow-2xl overflow-x-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-slate-500 text-xs">POST /apiCVU/CVU/AltaCVU</span>
          </div>
          <div className="text-slate-300 space-y-1 leading-6">
            <div><span className="text-blue-400">curl</span> <span className="text-green-400">--request POST</span> \</div>
            <div className="pl-4 text-slate-400">&apos;https://api.supervielle.com.ar/apiCVU/CVU/AltaCVU&apos; \</div>
            <div className="pl-4"><span className="text-yellow-400">--header</span> <span className="text-slate-300">&apos;Authorization: Bearer <span className="text-red-400">{"{{token}}"}</span>&apos;</span> \</div>
            <div className="pl-4"><span className="text-yellow-400">--data</span> <span className="text-slate-300">&apos;&#123;</span></div>
            <div className="pl-8 text-slate-300"><span className="text-green-400">&quot;cuit&quot;</span>: <span className="text-orange-400">&quot;20333048494&quot;</span>,</div>
            <div className="pl-8 text-slate-300"><span className="text-green-400">&quot;titular&quot;</span>: <span className="text-orange-400">&quot;Juan Pérez&quot;</span>,</div>
            <div className="pl-8 text-slate-300"><span className="text-green-400">&quot;moneda&quot;</span>: <span className="text-orange-400">&quot;032&quot;</span></div>
            <div className="pl-4 text-slate-300">&#125;&apos;</div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700 text-green-400 text-xs">
            ✓ 200 OK — CVU creada exitosamente
          </div>
        </div>
      </div>
    </section>
  );
}
