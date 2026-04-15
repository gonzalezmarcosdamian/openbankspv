const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "REST/JSON", label: "API moderna" },
  { value: "COELSA", label: "Infraestructura" },
  { value: "BCRA", label: "Regulado" },
];

export default function SocialProof() {
  return (
    <section className="border-y border-slate-100 bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
