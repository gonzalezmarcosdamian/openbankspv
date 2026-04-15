const BASE = "/openbankspv";

export default function DocSection() {
  return (
    <section id="documentacion" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Documentación</h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Todo lo que tu equipo necesita para integrar. Referencia técnica online y descarga del PDF completo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Swagger / API Reference */}
          <a
            href={`${BASE}/docs/`}
            className="group flex items-start gap-5 p-6 bg-white border border-slate-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-lg">Referencia de la API</h3>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Explorá todos los endpoints interactivamente. CVU, Debin, QR, Pull y Movimientos con ejemplos de request/response.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["CVU", "Debin", "QR", "Pull", "Movimientos"].map((t) => (
                  <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{t}</span>
                ))}
              </div>
            </div>
          </a>

          {/* PDF Download */}
          <a
            href="/openbankspv/documentacion-api-bank-spv.pdf"
            download
            className="group flex items-start gap-5 p-6 bg-white border border-slate-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-lg">Documentación técnica PDF</h3>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Guía completa de integración: seguridad, ambientes, ABMs, flujos de COELSA y diagramas de estados. 57 páginas.
              </p>
              <div className="mt-3">
                <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded font-medium border border-red-100">PDF · 57 páginas</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
