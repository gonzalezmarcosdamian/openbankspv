"use client";

import { useState } from "react";

const modules = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Cuentas Virtuales (CVU)",
    description: "Alta, baja y modificación de CVUs para tus usuarios. Con alias automático y soporte para pesos y dólares.",
    tag: "ABM completo",
    endpoints: [
      { method: "POST", path: "/apiCVU/CVU/AltaCVU", label: "Crear CVU" },
      { method: "GET", path: "/apiCVU/CVU/ConsultaCVU/{cvu}", label: "Consultar CVU" },
      { method: "DELETE", path: "/apiCVU/CVU/BajaCVU/{cvu}/{cuit}", label: "Dar de baja" },
      { method: "PUT", path: "/apiCVU/CVU/ModificacionCVU/{cvu}", label: "Modificar CVU" },
    ],
    example: `{
  "cvu": {
    "psp_id": 4,
    "cuit": "20333048494",
    "titular": "Juan Pérez",
    "moneda": "032",
    "persona_tipo": "F"
  }
}`,
    response: `{
  "alias": { "valor": "PERRO.CASA.LUNA" },
  "respuesta": {
    "codigo": "3200",
    "descripcion": "CVU ACTIVO"
  }
}`,
    fields: ["psp_id", "cta_id", "cuit", "titular", "moneda (032=ARS / 840=USD)", "persona_tipo (F/J)"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Debin",
    description: "Débito inmediato spot y recurrente. Confirmación, adhesión a recurrencias y contracargos.",
    tag: "Spot · Recurrente",
    endpoints: [
      { method: "GET", path: "/apiDebin/Debin/ConsultaDebin/{id}", label: "Consultar Debin" },
      { method: "POST", path: "/apiDebin/Debin/ConfirmaDebitoCVU", label: "Confirmar débito" },
      { method: "POST", path: "/apiDebin/Debin/AdhesionRecurrencia", label: "Adhesión recurrente" },
      { method: "POST", path: "/apiDebin/Debin/SolicitudContracargo", label: "Contracargo" },
    ],
    example: `{
  "debin": {
    "id": "123456",
    "cvu_comprador": "0000004800000000001263",
    "importe": 5000.00,
    "moneda": "032"
  }
}`,
    response: `{
  "respuesta": {
    "codigo": "0",
    "descripcion": "DÉBITO CONFIRMADO"
  }
}`,
    fields: ["id (ID del debin en COELSA)", "cvu_comprador", "importe", "moneda", "concepto"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
    title: "Pagos QR",
    description: "Generá QR para cobro (rol billetera y adquierente). Cashout QR desde CVU.",
    tag: "QR dinámico",
    endpoints: [
      { method: "POST", path: "/apiQR/QR/GenerarDebinQR", label: "Generar QR de cobro" },
      { method: "GET", path: "/apiQR/QR/ConsultaDebinQR/{id}", label: "Consultar QR" },
      { method: "POST", path: "/apiQR/QR/CashoutQR", label: "Cashout QR desde CVU" },
      { method: "POST", path: "/apiQR/QR/ContrarcargoDebinQR", label: "Contracargo QR" },
    ],
    example: `{
  "qr": {
    "cvu_vendedor": "0000004800000000001263",
    "importe": 1500.00,
    "moneda": "032",
    "descripcion": "Compra en local"
  }
}`,
    response: `{
  "qr": {
    "id": "QR-789456",
    "imagen_base64": "data:image/png;base64,...",
    "vencimiento": "2026-04-15T12:00:00Z"
  }
}`,
    fields: ["cvu_vendedor", "importe", "moneda", "descripcion", "vencimiento_segundos"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    title: "Transferencia Pull",
    description: "Ingreso de dinero desde cuentas externas hacia las CVUs de tus clientes.",
    tag: "Ingreso de fondos",
    endpoints: [
      { method: "POST", path: "/apiTransferencia/Pull/IngresoDinero", label: "Iniciar Pull" },
      { method: "POST", path: "/apiTransferencia/Pull/Contracargo", label: "Contracargo Pull" },
    ],
    example: `{
  "pull": {
    "cvu_destino": "0000004800000000001263",
    "cbu_origen": "0720461088000019563005",
    "importe": 10000.00,
    "concepto": "VAR",
    "referencia": "REF-001"
  }
}`,
    response: `{
  "pull": {
    "id_operacion": "PULL-456789",
    "estado": "PENDIENTE"
  },
  "respuesta": {
    "codigo": "0",
    "descripcion": "OPERACIÓN INICIADA"
  }
}`,
    fields: ["cvu_destino", "cbu_origen", "importe", "concepto (VAR/HAB/ALQ/...)", "referencia"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Conciliación",
    description: "API de movimientos para conciliar todas las operaciones de tus CVUs en tiempo real.",
    tag: "Tiempo real",
    endpoints: [
      { method: "GET", path: "/apiMovimientos/Movimientos/ConsultaMovimientos", label: "Consultar movimientos" },
      { method: "GET", path: "/apiMovimientos/Movimientos/ConsultaSaldo/{cvu}", label: "Consultar saldo CVU" },
    ],
    example: `GET /apiMovimientos/Movimientos/ConsultaMovimientos
  ?cvu=0000004800000000001263
  &fecha_desde=2026-04-01
  &fecha_hasta=2026-04-15
  &tipo=TODOS`,
    response: `{
  "movimientos": [
    {
      "id": "MOV-001",
      "tipo": "DEBIN",
      "importe": 5000.00,
      "fecha": "2026-04-10T14:30:00Z",
      "estado": "ACREDITADO"
    }
  ],
  "total_registros": 1
}`,
    fields: ["cvu", "fecha_desde", "fecha_hasta", "tipo (DEBIN/QR/PULL/TODOS)", "pagina"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Gestión de Comercios",
    description: "Alta, baja y modificación de comercios y actividades. Onboarding para tus merchants.",
    tag: "Merchants",
    endpoints: [
      { method: "POST", path: "/apiComercio/Actividad/AltaActividad", label: "Alta actividad" },
      { method: "POST", path: "/apiComercio/Comercio/AltaComercio", label: "Alta comercio" },
      { method: "GET", path: "/apiComercio/Comercio/ConsultaComercio/{id}", label: "Consultar comercio" },
      { method: "DELETE", path: "/apiComercio/Comercio/BajaComercio/{id}", label: "Baja comercio" },
    ],
    example: `{
  "comercio": {
    "nombre": "Kiosco El Sol",
    "cuit": "30712345678",
    "actividad_id": "ACT-001",
    "cvu_recaudadora": "0000004800000000001263",
    "direccion": "Av. Corrientes 1234, CABA"
  }
}`,
    response: `{
  "comercio": {
    "id": "COM-789",
    "estado": "ACTIVO"
  },
  "respuesta": {
    "codigo": "0",
    "descripcion": "COMERCIO CREADO"
  }
}`,
    fields: ["nombre", "cuit", "actividad_id", "cvu_recaudadora", "direccion", "email_contacto"],
  },
];

const methodColor: Record<string, string> = {
  GET: "bg-blue-100 text-blue-700",
  POST: "bg-green-100 text-green-700",
  PUT: "bg-yellow-100 text-yellow-700",
  DELETE: "bg-red-100 text-red-700",
};

export default function ProductModules() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="producto" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Todo lo que necesitás, en una sola API
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Módulos composables. Integrás lo que necesitás hoy y sumás
            funcionalidades a medida que tu producto crece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <div
              key={mod.title}
              className={`border rounded-xl transition-all ${
                open === i
                  ? "border-red-300 shadow-lg col-span-1 md:col-span-2 lg:col-span-3"
                  : "border-slate-200 hover:border-red-200 hover:shadow-md"
              }`}
            >
              {/* Card header — siempre visible */}
              <button
                className="w-full text-left p-6 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${open === i ? "bg-red-100 text-red-600" : "bg-slate-50 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600"}`}>
                      {mod.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{mod.description}</p>
                      <span className="inline-block text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded mt-3">
                        {mod.tag}
                      </span>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${open === i ? "border-red-300 text-red-600 rotate-180" : "border-slate-200 text-slate-400"}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Detalle técnico expandible */}
              {open === i && (
                <div className="border-t border-slate-100 p-6">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Endpoints */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Endpoints</h4>
                      <div className="space-y-2">
                        {mod.endpoints.map((ep) => (
                          <div key={ep.path} className="flex items-start gap-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5 ${methodColor[ep.method]}`}>
                              {ep.method}
                            </span>
                            <div>
                              <div className="text-xs text-slate-500">{ep.label}</div>
                              <code className="text-xs text-slate-700 font-mono">{ep.path}</code>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 mt-6">Campos principales</h4>
                      <div className="space-y-1">
                        {mod.fields.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                            <code className="text-xs text-slate-600 font-mono">{f}</code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Request */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Request de ejemplo</h4>
                      <pre className="bg-slate-900 text-slate-300 text-xs p-4 rounded-lg overflow-x-auto leading-5 font-mono">
                        {mod.example}
                      </pre>
                    </div>

                    {/* Response */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Response</h4>
                      <pre className="bg-slate-900 text-slate-300 text-xs p-4 rounded-lg overflow-x-auto leading-5 font-mono">
                        {mod.response}
                      </pre>
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500">
                          Autenticación vía <span className="font-mono text-slate-700">Bearer Token</span> obtenido desde la API de autenticación de COELSA.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
