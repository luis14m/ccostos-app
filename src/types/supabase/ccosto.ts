export interface CCosto {
  id: string;
  nombre: string;
  codigo: string;
  estado: estado;
  fecha_inicio: string;
  fecha_termino: string;
  created_at: string;
}

export interface CCostoCreate {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
}

export interface CCostoFormData {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
}

export const initialCCostoFormData: CCostoFormData = {
  nombre: "",
  codigo: "",
  fecha_inicio: "",
  fecha_termino: "",
};
export interface CreateCCostoResponse {
  success: boolean;
  error?: string;
  data?: CCosto;
}
export type estado = 
'Ejecucion' | 
'Suspendido' | 
'Terminado'
;
