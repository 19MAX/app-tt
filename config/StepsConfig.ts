import { FormErrors, ServiceData, StepConfig } from "../types/servicios/FormTypes";

export const STEPS_CONFIG: StepConfig[] = [
  {
    id: 1,
    title: "Selecciona tu categoría",
    validation: (data: ServiceData): FormErrors => {
      const errors: FormErrors = {};
      if (!data.selectedCategory) {
        errors.selectedCategory = "Debes seleccionar una categoría";
      }
      return errors;
    }
  },
  {
    id: 2,
    title: "Precio y descripción",
    validation: (data: ServiceData): FormErrors => {
      const errors: FormErrors = {};
      if (data.precioPersonalizado <= 0) {
        errors.precioPersonalizado = "El precio debe ser mayor a 0";
      }
      if (!data.descripcionPersonalizada.trim()) {
        errors.descripcionPersonalizada = "La descripción es obligatoria";
      } else if (data.descripcionPersonalizada.trim().length < 20) {
        errors.descripcionPersonalizada = "La descripción debe tener al menos 20 caracteres";
      }
      return errors;
    }
  },
  {
    id: 3,
    title: "Disponibilidad",
    validation: (data: ServiceData): FormErrors => {
      const errors: FormErrors = {};
      if (data.disponibilidad.diasSemana.length === 0) {
        errors.diasSemana = "Debes seleccionar al menos un día";
      }
      // Validar formato de horas
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(data.disponibilidad.horaInicio)) {
        errors.horaInicio = "Formato de hora inválido (HH:MM)";
      }
      if (!timeRegex.test(data.disponibilidad.horaFin)) {
        errors.horaFin = "Formato de hora inválido (HH:MM)";
      }
      if (data.disponibilidad.horaInicio >= data.disponibilidad.horaFin) {
        errors.horaFin = "La hora de fin debe ser posterior a la de inicio";
      }
      return errors;
    }
  },
  {
    id: 4,
    title: "Ubicación y modalidad",
    validation: (data: ServiceData): FormErrors => {
      const errors: FormErrors = {};
      if (!data.ubicacion.ciudad.trim()) {
        errors.ciudad = "La ciudad es obligatoria";
      }
      if (!data.ubicacion.modalidad) {
        errors.modalidad = "Debes seleccionar una modalidad";
      }
      return errors;
    }
  },
  {
    id: 5,
    title: "Resumen y finalización"
  }
];