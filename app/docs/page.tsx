import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Documentación API — API Bank SPV",
  description: "Referencia técnica completa de los endpoints de API Bank SPV.",
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-10 px-6 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Referencia de la API</h1>
            <p className="text-slate-500 mt-2">
              Estructura de endpoints, parámetros, campos y ejemplos de respuesta.
            </p>
          </div>
          <a
            href="/openbankspv/documentacion-api-bank-spv.pdf"
            download
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar PDF completo
          </a>
        </div>

        {/* Aviso ilustrativo */}
        <div className="mb-5 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-slate-700">Documentación ilustrativa</p>
            <p className="text-sm text-slate-500 mt-0.5">
              Esta referencia muestra la estructura real de la API a modo de ejemplo.
              Los endpoints y datos son ficticios. Para acceder al sandbox real,{" "}
              <a href="/#contacto" className="underline hover:text-slate-700">contactá al equipo</a>.
            </p>
          </div>
        </div>

        {/* Tags módulos */}
        <div className="mb-5 flex flex-wrap gap-2">
          {["CVU", "Alias", "Comercios", "Debin", "QR", "Transferencia Pull", "Movimientos"].map((tag) => (
            <span key={tag} className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
          <span className="text-xs bg-slate-900 text-white px-3 py-1 rounded-full font-medium">OpenAPI 3.0</span>
        </div>

        {/* Swagger iframe */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <span className="text-xs text-slate-500 font-mono">openapi/v1.yaml</span>
            </div>
            <a
              href="/openbankspv/openapi/v1.yaml"
              target="_blank"
              className="text-xs text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
            >
              Ver spec raw
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <iframe
            src="/openbankspv/swagger.html"
            className="w-full"
            style={{ height: "80vh", border: "none" }}
            title="API Reference"
          />
        </div>

      </div>
    </main>
  );
}
