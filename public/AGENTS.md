# Guía de integración para agentes de código

Este archivo está pensado para agentes de IA (Claude Code, Cursor, Copilot Workspace)
que estén implementando una integración con **API Bank SPV de Banco Supervielle**.

## Contexto del producto

Estás integrando con la API bancaria de Banco Supervielle bajo el esquema de
Cesión de Credenciales con COELSA. Esto significa:

- Tu PSP recibe credenciales directas de COELSA (no intermediadas)
- Operás sobre infraestructura bancaria real regulada por el BCRA
- El ambiente de sandbox es idéntico a producción en comportamiento

## Setup inicial recomendado

```typescript
// config/apibank.ts
export const APIBANK_CONFIG = {
  baseUrl: process.env.APIBANK_BASE_URL ?? "https://sandbox.api.supervielle.com.ar",
  token: process.env.APIBANK_TOKEN ?? "",
};

async function apibankFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${APIBANK_CONFIG.baseUrl}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${APIBANK_CONFIG.token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`APIBank error ${res.status}: ${await res.text()}`);
  return res.json();
}
```

## Flujos más comunes

### Onboarding de usuario (crear CVU)

```typescript
const nuevaCVU = await apibankFetch("/apiCVU/CVU/AltaCVU", {
  method: "POST",
  body: JSON.stringify({
    cvu: {
      psp_id: Number(process.env.PSP_ID),
      cta_id: Number(process.env.CTA_ID),
      cuit: usuario.cuit,
      titular: usuario.nombre,
      moneda: "032", // ARS
      persona_tipo: "F",
    },
  }),
});
// nuevaCVU.alias.valor => "PERRO.CASA.LUNA"
// nuevaCVU.respuesta.codigo => "3200" (activo)
```

### Cobrar por Debin (el vendedor inicia)

El flujo Debin lo inicia COELSA (no hay endpoint de "crear debin" en esta API).
El PSP recibe el Debin vía webhook y lo confirma:

```typescript
// Confirmar aceptación del debin
await apibankFetch("/apiDebin/Debin/ConfirmaDebitoCVU", {
  method: "POST",
  body: JSON.stringify({
    debin: {
      id: debinId,
      cvu_comprador: usuario.cvu,
      acepta: true,
    },
  }),
});
```

### Pago QR (el comercio genera, el comprador paga)

```typescript
// 1. Comercio genera QR
const { qr } = await apibankFetch("/apiQR/QR/GenerarDebinQR", {
  method: "POST",
  body: JSON.stringify({
    qr: {
      cvu_vendedor: comercio.cvu,
      importe: monto,
      moneda: "032",
      descripcion: "Compra",
      vencimiento_segundos: 300,
    },
  }),
});

// 2. Comprador paga (app del PSP)
await apibankFetch("/apiQR/QR/CashoutQR", {
  method: "POST",
  body: JSON.stringify({
    cashout: {
      cvu_comprador: usuario.cvu,
      string_qr: qr.string_qr,
      importe: monto,
    },
  }),
});
```

### Conciliación diaria

```typescript
const { movimientos } = await apibankFetch(
  `/apiMovimientos/Movimientos/ConsultaMovimientos?cvu=${cvu}&fecha_desde=2026-04-15&tipo=TODOS`
);
```

## Variables de entorno necesarias

```env
APIBANK_BASE_URL=https://sandbox.api.supervielle.com.ar
APIBANK_TOKEN=your_bearer_token_here
PSP_ID=4
CTA_ID=1
```

## Spec OpenAPI (para importar en tu IDE)

`https://gonzalezmarcosdamian.github.io/openbankspv/openapi/v1.yaml`

## Convenciones de la API

- Moneda ARS = `"032"`, USD = `"840"`
- Persona física = `"F"`, jurídica = `"J"`
- Código `"0"` o `"3200"` = operación exitosa
- Todos los importes son `number` (no string)
- Fechas en ISO 8601 UTC

## Errores comunes a evitar

- No reutilizar tokens expirados — renovar antes de cada sesión larga
- El CVU tiene 22 dígitos exactos — validar antes de enviar
- El CUIT debe ser válido (validación módulo 11) — la API lo rechaza con 3213
