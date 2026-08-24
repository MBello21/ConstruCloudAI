export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export const formatMetricCards = formatPrice;

export const formatearPrecio = (importe: number): string => {
  return (
    importe.toLocaleString("es-ES", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }) + " €"
  );
};

export const formatearImporte = formatearPrecio;
