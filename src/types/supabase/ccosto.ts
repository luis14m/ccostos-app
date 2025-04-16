
export interface ccosto {
  id: string;
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
  created_at: string;
}


export interface ccostoCreate {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
}

export interface ccostoFormData {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
}

export const initialccostoFormData: ccostoFormData = {
  nombre: '',
  codigo: '',
  fecha_inicio: '',
  fecha_termino: '',
};



