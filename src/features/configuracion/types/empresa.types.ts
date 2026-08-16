export interface Empresa {
  id: number;
  razon_social: string | null;
  direccion_fiscal: string | null;
  documento: string | null;
  telefono: string | null;
  web: string | null;
  email: string | null;
}

export interface EmpresaUpdate {
  razon_social?: string;
  direccion_fiscal?: string;
  documento?: string;
  telefono?: string;
  web?: string;
  email?: string;
}
