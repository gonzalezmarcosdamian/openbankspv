"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
      Cargando referencia de endpoints...
    </div>
  ),
});

export default function SwaggerUIComponent({ url }: { url: string }) {
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
