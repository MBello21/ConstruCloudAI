export const formatearFecha = (fecha: string): string => {
  const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    fechaFormateada.slice(0, 3) +
    fechaFormateada.charAt(3).toUpperCase() +
    fechaFormateada.slice(4)
  );
};
