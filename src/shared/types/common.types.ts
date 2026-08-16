export interface EditingField {
  [key: string]: boolean;
}

export interface EditValues {
  [key: string]: string | number;
}

export interface ConfirmDelete {
  tipo: string;
  id: number | string;
  capituloId?: number | string;
}

export interface DetalleToDelete {
  capituloId: number | string;
  detalleId: number | string;
}
