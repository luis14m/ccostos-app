export interface CCosto {
  id: string;
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
  estado: string;
  
  created_at: string;
}

export interface CCostoCreate {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
  estado: string;
}

export interface CCostoFormData {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
  estado: string;
}

export const initialCCostoFormData: CCostoFormData = {
  nombre: "",
  codigo: "",
  fecha_inicio: "",
  fecha_termino: "",
  estado: "",
};
export interface ccostoResponse {
  success: boolean;
  
  data?: CCosto;
  error?: string;
}
export const Estado = [
'Ejecucion',
'Suspendido',
'Terminado'
] as const;