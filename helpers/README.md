# Helpers - Utilidades y Validaciones

Este directorio contiene funciones auxiliares reutilizables para toda la aplicación.

## Estructura

- `utils.ts` - Funciones de utilidad general
- `validations.ts` - Funciones de validación de formularios
- `index.ts` - Archivo de índice para exportaciones centralizadas

## Funciones de Utilidad (`utils.ts`)

### Fechas y Tiempo

- `calcularEdad(fechaNacimiento: string): number` - Calcula la edad a partir de una fecha de nacimiento
- `formatearFecha(fecha: string | Date): string` - Formatea fecha para mostrar (DD/MM/YYYY)
- `formatearFechaParaInput(fecha: string | Date): string` - Formatea fecha para input (YYYY-MM-DD)
- `obtenerFechaActual(): string` - Obtiene la fecha actual formateada
- `esFechaValida(fecha: string): boolean` - Valida si una fecha es válida
- `obtenerDiferenciaEnDias(fecha1: Date, fecha2: Date): number` - Calcula diferencia en días
- `esDiaSemana(fecha: Date): boolean` - Verifica si es un día de semana
- `obtenerNombreMes(fecha: Date): string` - Obtiene el nombre del mes
- `obtenerNombreDia(fecha: Date): string` - Obtiene el nombre del día

### Parámetros y Navegación

- `getParamString(param: any): string` - Obtiene parámetro como string desde useLocalSearchParams

### Formateo de Texto

- `capitalizarPalabras(texto: string): string` - Capitaliza primera letra de cada palabra
- `limpiarTexto(texto: string): string` - Limpia texto removiendo espacios extra
- `obtenerIniciales(nombre: string): string` - Obtiene iniciales de un nombre

### Formateo de Datos

- `formatearTelefono(telefono: string): string` - Formatea número de teléfono
- `formatearCedula(cedula: string): string` - Formatea cédula con guiones
- `formatearPrecio(precio: number): string` - Formatea precio en USD

### Validaciones

- `esNumero(valor: any): boolean` - Valida si es un número
- `esEmailValido(email: string): boolean` - Valida formato de email

### Utilidades

- `generarIdUnico(): string` - Genera ID único simple

## Funciones de Validación (`validations.ts`)

### Validaciones Individuales

- `validateEmail(email: string): ValidationResult` - Valida formato de email
- `validatePassword(password: string): ValidationResult` - Valida contraseña
- `validateConfirmPassword(password: string, confirmPassword: string): ValidationResult` - Valida confirmación de contraseña
- `validateCedula(cedula: string): ValidationResult` - Valida formato de cédula
- `validatePhone(phone: string): ValidationResult` - Valida formato de teléfono
- `validateAge(edad: number): ValidationResult` - Valida rango de edad
- `validateFullName(nombre: string): ValidationResult` - Valida nombre completo
- `validateBirthDate(fecha: string): ValidationResult` - Valida fecha de nacimiento
- `validateGender(gender: string): ValidationResult` - Valida género
- `validateAddress(address: string): ValidationResult` - Valida dirección

### Validaciones Complejas

- `validateRegistrationData(data): ValidationResult` - Valida todos los datos de registro
- `validateLoginData(email: string, password: string): ValidationResult` - Valida datos de login

## Uso

```typescript
// Importar funciones específicas
import { calcularEdad, formatearFecha, validateEmail } from "@/helpers";

// O importar todo
import * as Helpers from "@/helpers";

// Ejemplos de uso
const edad = calcularEdad("1990-05-15");
const fechaFormateada = formatearFecha(new Date());
const emailValido = validateEmail("usuario@ejemplo.com");
```

## Beneficios

- **Reutilización**: Funciones centralizadas para evitar duplicación de código
- **Consistencia**: Mismo comportamiento en toda la aplicación
- **Mantenibilidad**: Cambios en un solo lugar
- **Testabilidad**: Funciones puras fáciles de probar
- **Legibilidad**: Código más limpio y expresivo
