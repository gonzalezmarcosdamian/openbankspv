const points = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Equipo técnico directo",
    description:
      "No abrís un ticket y esperás. Tenés una línea directa con el equipo que conoce la API por dentro.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Sandbox real, no mockeado",
    description:
      "El ambiente de testing opera sobre la misma infraestructura que producción. Lo que funciona ahí, funciona en vivo.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Documentación técnica completa",
    description:
      "Endpoints, ejemplos reales, códigos de error y diagramas de flujo. Todo lo que tu equipo necesita para integrar sin sorpresas.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Infraestructura regulada desde el día 1",
    description:
      "Operás bajo el paraguas regulatorio de Banco Supervielle. Sin los riesgos de construir infraestructura propia.",
  },
];

export default function Differentiator() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              El acompañamiento que ningún banco te da
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              La documentación técnica es solo el principio. La diferencia está
              en lo que pasa después: un equipo que te ayuda a integrar, a
              testear y a salir a producción con confianza.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Hablar con el equipo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {points.map((point) => (
              <div key={point.title} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                  {point.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{point.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
