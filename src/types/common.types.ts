export interface EditingField {
  [key: string]: boolean;
}

export interface ConfirmDelete {
  tipo: string;
  id: number | string;
}

export interface DetalleToDelete {
  capituloId: number | string;
  detalleId: number | string;
}
