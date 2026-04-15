import SwaggerUIComponent from "@/components/SwaggerUI";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Documentación API — API Bank SPV",
  description: "Referencia técnica completa de los endpoints de API Bank SPV.",
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1 rounded-full border border-amber-200 mb-4">
              Demo ilustrativa — Endpoints y datos de ejemplo
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Referencia de la API</h1>
            <p className="text-slate-500 mt-2">
              Todos los endpoints, parámetros y ejemplos de request/response.
            </p>
          </div>
          <a
            href="/documentacion-api-bank-spv.pdf"
            download
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar PDF completo
          </a>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <SwaggerUIComponent url="/openbankspv/openapi/v1.yaml" />
        </div>
      </div>
    </main>
  );
}
