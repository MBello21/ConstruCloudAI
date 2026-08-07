export interface PresupuestoResumen {
  id: number;
  titulo: string;
  estado: string;
  total: number;
}

export interface Cliente {
  id: number;
  nombre_cliente: string;
  direccion?: string;
  poblacion: string;
  telefono: string;
  email?: string;
  estado?: string;
  presupuestos: PresupuestoResumen[];
}

export interface CreateClienteRequest {
  nombre_cliente: string;
  direccion?: string;
  poblacion: string;
  telefono: string;
  email?: string;
}

export interface UpdateClienteRequest {
  nombre_cliente: string;
  direccion?: string;
  poblacion: string;
  telefono: string;
  email?: string;
}

export type ClientesResponse = Cliente[];
