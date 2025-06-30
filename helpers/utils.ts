// Utilidades generales para la aplicación

// Calcular edad a partir de fecha de nacimiento
export function calcularEdad(fechaNacimiento: string): number {
  if (!fechaNacimiento) return 0;

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  if (isNaN(nacimiento.getTime())) return 0;

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

// Formatear fecha para mostrar (DD/MM/YYYY)
export function formatearFecha(fecha: string | Date): string {
  if (!fecha) return "";

  const date = new Date(fecha);
  if (isNaN(date.getTime())) return "";

  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const año = date.getFullYear();

  return `${dia}/${mes}/${año}`;
}

// Formatear fecha para input de fecha (YYYY-MM-DD)
export function formatearFechaParaInput(fecha: string | Date): string {
  if (!fecha) return "";

  const date = new Date(fecha);
  if (isNaN(date.getTime())) return "";

  const año = date.getFullYear();
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const dia = date.getDate().toString().padStart(2, "0");

  return `${año}-${mes}-${dia}`;
}

// Obtener fecha actual formateada
export function obtenerFechaActual(): string {
  return formatearFechaParaInput(new Date());
}

// Validar si una fecha es válida
export function esFechaValida(fecha: string): boolean {
  const date = new Date(fecha);
  return !isNaN(date.getTime());
}

// Obtener parámetro como string desde useLocalSearchParams
export function getParamString(param: any): string {
  if (Array.isArray(param)) return param[0] || "";
  return param || "";
}

// Capitalizar primera letra de cada palabra
export function capitalizarPalabras(texto: string): string {
  if (!texto) return "";

  return texto
    .toLowerCase()
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

// Formatear número de teléfono
export function formatearTelefono(telefono: string): string {
  if (!telefono) return "";

  // Remover todos los caracteres no numéricos
  const numeros = telefono.replace(/\D/g, "");

  // Formatear según la longitud
  if (numeros.length === 10) {
    return `${numeros.slice(0, 3)}-${numeros.slice(3, 6)}-${numeros.slice(6)}`;
  } else if (numeros.length === 9) {
    return `${numeros.slice(0, 3)}-${numeros.slice(3, 6)}-${numeros.slice(6)}`;
  }

  return numeros;
}

// Formatear cédula con guiones
export function formatearCedula(cedula: string): string {
  if (!cedula) return "";

  const numeros = cedula.replace(/\D/g, "");

  if (numeros.length === 10) {
    return `${numeros.slice(0, 2)}-${numeros.slice(2, 9)}-${numeros.slice(9)}`;
  } else if (numeros.length === 13) {
    return `${numeros.slice(0, 2)}-${numeros.slice(2, 9)}-${numeros.slice(9, 12)}-${numeros.slice(12)}`;
  }

  return numeros;
}

// Generar ID único simple
export function generarIdUnico(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Validar si es un número
export function esNumero(valor: any): boolean {
  return !isNaN(parseFloat(valor)) && isFinite(valor);
}

// Limpiar texto (remover espacios extra)
export function limpiarTexto(texto: string): string {
  if (!texto) return "";
  return texto.trim().replace(/\s+/g, " ");
}

// Obtener iniciales de un nombre
export function obtenerIniciales(nombre: string): string {
  if (!nombre) return "";

  return nombre
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

// Formatear precio
export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(precio);
}

// Validar formato de email
export function esEmailValido(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Obtener diferencia en días entre dos fechas
export function obtenerDiferenciaEnDias(fecha1: Date, fecha2: Date): number {
  const diferencia = Math.abs(fecha1.getTime() - fecha2.getTime());
  return Math.ceil(diferencia / (1000 * 3600 * 24));
}

// Verificar si es un día de semana
export function esDiaSemana(fecha: Date): boolean {
  const dia = fecha.getDay();
  return dia >= 1 && dia <= 5; // Lunes a Viernes
}

// Obtener nombre del mes
export function obtenerNombreMes(fecha: Date): string {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return meses[fecha.getMonth()];
}

// Obtener nombre del día
export function obtenerNombreDia(fecha: Date): string {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return dias[fecha.getDay()];
}
