const steps = [
  {
    number: "01",
    title: "Contacto inicial",
    description:
      "Nos contás tu caso de uso, volumen estimado y timeline. En 48hs tenés respuesta del equipo técnico y comercial.",
  },
  {
    number: "02",
    title: "Acceso al sandbox",
    description:
      "Recibís credenciales de testing y acceso a la documentación completa. Tu equipo empieza a integrar contra un ambiente real.",
  },
  {
    number: "03",
    title: "Acompañamiento en la integración",
    description:
      "Nuestro equipo técnico está disponible durante todo el proceso. Sin tickets, sin esperas. Una conversación directa.",
  },
  {
    number: "04",
    title: "Go-live",
    description:
      "Homologación, credenciales de producción y lanzamiento. Con monitoreo conjunto en los primeros días de operación.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            De cero a producción en semanas
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Sin licencia bancaria. Sin meses de negociación. Con un equipo que
            entiende tanto el negocio como la integración técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-slate-200 z-0" style={{ width: "calc(100% - 2rem)" }} />
              )}
              <div className="bg-white border border-slate-200 rounded-xl p-6 relative z-10 h-full">
                <div className="text-3xl font-bold text-red-100 mb-4">{step.number}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
