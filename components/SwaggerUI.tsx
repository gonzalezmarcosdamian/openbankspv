"use client";

import { useEffect, useState } from "react";

export default function SwaggerUIComponent({ url }: { url: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        Cargando documentación...
      </div>
    );
  }

  // Carga dinámica para evitar problemas de SSR
  const SwaggerUI = require("swagger-ui-react").default;
  require("swagger-ui-react/swagger-ui.css");

  return (
    <div className="swagger-wrapper">
      <SwaggerUI
        url={url}
        docExpansion="list"
        defaultModelsExpandDepth={1}
        tryItOutEnabled={false}
      />
    </div>
  );
}
