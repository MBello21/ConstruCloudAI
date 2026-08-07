export const formatearPrecio = (importe: number): string => {
  return importe.toLocaleString("es-ES", { minimumFractionDigits: 2 }) + " €";
};

export const formatearImporte = formatearPrecio;
