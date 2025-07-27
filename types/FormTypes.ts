export interface ServiceData {
  servicioId: string;
  selectedCategory: string;
  precioPersonalizado: number;
  descripcionPersonalizada: string;
  disponibilidad: {
    diasSemana: string[];
    horaInicio: string;
    horaFin: string;
  };
  ubicacion: {
    ciudad: string;
    direccion: string;
    modalidad: string;
  };
}
export interface FormErrors {
  [key: string]: string;
}

export interface StepProps {
  serviceData: ServiceData;
  updateServiceData: (updates: Partial<ServiceData>) => void;
  errors: FormErrors;
}

export interface StepConfig {
  id: number;
  title: string;
  validation?: (data: ServiceData) => FormErrors;
}
