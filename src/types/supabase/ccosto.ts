
export interface Ccosto {
  id: string;
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
  created_at: string;
}


export interface CcostoCreate {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
}

export interface CcostoFormData {
  nombre: string;
  codigo: string;
  fecha_inicio: string;
  fecha_termino: string;
}

export const initialCcostoFormData: CcostoFormData = {
  nombre: '',
  codigo: '',
  fecha_inicio: '',
  fecha_termino: '',
};



