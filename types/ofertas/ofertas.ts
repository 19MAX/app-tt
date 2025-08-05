// types/ofertas.ts

// ==================== TIPOS BASE ====================

export interface Disponibilidad {
  diasSemana: string[];
  horaInicio: string; // Formato HH:mm
  horaFin: string; // Formato HH:mm
}

export interface Ubicacion {
  ciudad: string;
  direccion?: string;
  modalidad: "presencial" | "virtual" | "ambas";
}

export interface ServicioResumen {
  id?: string;
  titulo: string;
  descripcion?: string;
  categoria: string;
  precio?: number;
}

// ==================== REQUESTS ====================

// Tipo para crear una nueva oferta
export interface CrearOfertaRequest {
  servicioId: string;
  precioPersonalizado?: number;
  descripcionPersonalizada?: string;
  disponibilidad: Disponibilidad;
  ubicacion?: Ubicacion;
}

// Tipo para actualizar una oferta existente
export interface ActualizarOfertaRequest {
  precioPersonalizado?: number;
  descripcionPersonalizada?: string;
  disponibilidad?: Disponibilidad;
  ubicacion?: Ubicacion;
  fechaFinOferta?: string; // Formato: YYYY-MM-DD
}

// ==================== RESPONSES ====================

// Tipo para la lista de mis ofertas
export interface MiOfertaResumen {
  id: string;
  servicioId: string;
  usuario: Usuario;
  titulo?: string;
  imagen?: string;
  precioPersonalizado?: number;
  descripcionPersonalizada?: string;
  disponibilidad: Disponibilidad;
  ubicacion: Ubicacion;
  estado: "activa" | "pausada" | "finalizada";
  fechaCreacion: string;
  servicio: ServicioResumen;
}

// Tipo para ofertas de un servicio específico (vista pública)
export interface OfertaPublica {
  id: string;
  usuarioId: string;
  usuario: Usuario;
  titulo?: string;
  imagen?: string;
  precioPersonalizado?: number;
  descripcionPersonalizada?: string;
  disponibilidad: Disponibilidad;
  ubicacion: Ubicacion;
  estado: "activa" | "pausada" | "finalizada";
  fechaCreacion: string;
  servicio: ServicioResumen;
}

// Tipo para el detalle completo de una oferta
export interface OfertaDetalle {
  id: string;
  usuarioId: string;
  servicioId: string;
  precioPersonalizado?: number;
  descripcionPersonalizada?: string;
  disponibilidad: Disponibilidad;
  ubicacion: Ubicacion;
  estado: "activa" | "pausada" | "finalizada";
  fechaCreacion: string;
  fechaActualizacion?: string;
  fechaInicioOferta?: string;
  fechaFinOferta?: string;
  servicio: ServicioResumen;
}

// Tipo para el usuario

export interface Usuario {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  valoracion: number; // Rating del usuario
  numeroValoraciones: number; // Cantidad de valoraciones recibidas
}

// ==================== RESPUESTAS DE ACCIONES ====================

export interface EliminarOfertaResponse {
  mensaje: string; // "Oferta eliminada correctamente"
}

export interface PausarOfertaResponse {
  mensaje: string; // "pausado"
}

export interface ActivarOfertaResponse {
  mensaje: string; // "activado"
}

// ==================== TIPOS DE LISTAS ====================

export type MisOfertasResponse = MiOfertaResumen[];
export type OfertasDeServicioResponse = OfertaPublica[];

// ==================== TIPOS DE ESTADO ====================

export type EstadoOferta = "activa" | "pausada" | "finalizada";
export type ModalidadServicio = "presencial" | "virtual" | "ambas";

// ==================== TIPOS PARA FORMULARIOS ====================

export interface OfertaFormData extends Omit<CrearOfertaRequest, "servicioId"> {
  servicioId?: string;
}

export interface ActualizarOfertaFormData extends ActualizarOfertaRequest {
  id: string;
}
