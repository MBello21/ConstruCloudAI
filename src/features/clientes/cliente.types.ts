export interface PresupuestoResumen {
  id: number;
  titulo: string;
  estado: string;
  total: number;
}

export interface Cliente {
  id: number;
  cif: string;
  nombre_cliente: string;
  direccion?: string;
  poblacion: string;
  telefono: string;
  email?: string;
  estado?: string;
  notas?: string;
  presupuestos: PresupuestoResumen[];
}

export interface CreateClienteRequest {
  nombre_cliente: string;
  direccion?: string;
  poblacion: string;
  telefono: string;
  email?: string;
  cif?: string;
  estado?: string;
  tipo?: string;
  notas?: string;
}

export interface UpdateClienteRequest {
  nombre_cliente?: string;
  direccion?: string;
  poblacion?: string;
  telefono?: string;
  email?: string;
  cif?: string;
  estado?: string;
  tipo?: string;
  notas?: string;
}

export type ClientesResponse = Cliente[];

export interface ClientesPaginacionResponse {
  total: number;
  clientes: Cliente[];
}
