import type { EstadoConfig } from "../types";

export const ESTADO_CONFIG: Record<string, EstadoConfig> = {
  Aprobado: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-600",
  },
  "En Revisión": {
    bg: "bg-blue-100",
    text: "text-blue-600",
    dot: "bg-blue-600",
  },
  Pendiente: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "bg-yellow-600",
  },
  Borrador: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-600",
  },
  Rechazado: {
    bg: "bg-red-100",
    text: "text-red-600",
    dot: "bg-red-600",
  },
  Enviado: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    dot: "bg-purple-600",
  },
  Activo: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-600",
  },
  Potencial: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "bg-yellow-600",
  },
  Inactivo: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-600",
  },
};
