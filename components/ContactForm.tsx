"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Placeholder: reemplazar con HubSpot form embed o Formspree endpoint
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section id="contacto" className="py-24 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para integrar?
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Contanos sobre tu proyecto. En menos de 48 horas te contacta
              alguien del equipo técnico y comercial de Banco Supervielle.
            </p>
            <div className="space-y-4">
              {[
                "Acceso al sandbox en el primer contacto",
                "Documentación técnica completa",
                "Acompañamiento durante toda la integración",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">Mensaje enviado</h3>
                <p className="text-slate-500 text-sm">Te contactamos en menos de 48 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Juan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Mi Fintech S.A."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="juan@mifintech.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rol</label>
                  <select
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-slate-700"
                  >
                    <option value="">Seleccioná tu rol</option>
                    <option>CTO / Tech Lead</option>
                    <option>Product Manager</option>
                    <option>CEO / Founder</option>
                    <option>Desarrollador</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Caso de uso principal</label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-slate-700"
                  >
                    <option value="">Seleccioná una opción</option>
                    <option>CVUs para usuarios</option>
                    <option>Cobros por Debin</option>
                    <option>Pagos QR</option>
                    <option>Conciliación</option>
                    <option>Múltiples</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Volumen mensual estimado</label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-slate-700"
                  >
                    <option value="">Seleccioná un rango</option>
                    <option>Menos de 1.000 transacciones</option>
                    <option>1.000 – 10.000 transacciones</option>
                    <option>10.000 – 100.000 transacciones</option>
                    <option>Más de 100.000 transacciones</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Hablar con el equipo"}
                </button>
                <p className="text-xs text-slate-400 text-center">
                  Tu información es confidencial y no se comparte con terceros.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
