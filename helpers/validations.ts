// Validaciones para formularios de autenticación y registro

import { calcularEdad } from "./utils";

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// Validación de email
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === "") {
    return { isValid: false, message: "El email es obligatorio" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "El formato del email no es válido" };
  }

  return { isValid: true, message: "" };
}

// Validación de contraseña
export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim() === "") {
    return { isValid: false, message: "La contraseña es obligatoria" };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: "La contraseña debe tener al menos 8 caracteres",
    };
  }

  // Al menos una mayúscula, una minúscula y un número
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return {
      isValid: false,
      message:
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
    };
  }

  return { isValid: true, message: "" };
}

// Validación de confirmación de contraseña
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return { isValid: false, message: "Confirma tu contraseña" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Las contraseñas no coinciden" };
  }

  return { isValid: true, message: "" };
}

// Validación de cédula ecuatoriana
export function validateCedula(cedula: string): ValidationResult {
  if (!cedula || cedula.trim() === "") {
    return { isValid: false, message: "La cédula es obligatoria" };
  }

  // Solo números
  if (!/^\d+$/.test(cedula)) {
    return { isValid: false, message: "La cédula solo debe contener números" };
  }

  // 10 dígitos para cédula, 13 para RUC
  if (cedula.length !== 10 && cedula.length !== 13) {
    return {
      isValid: false,
      message: "La cédula debe tener 10 dígitos o 13 para RUC",
    };
  }

  return { isValid: true, message: "" };
}

// Validación de teléfono
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === "") {
    return { isValid: true, message: "" }; // Opcional
  }

  // Solo números
  if (!/^\d+$/.test(phone)) {
    return {
      isValid: false,
      message: "El teléfono solo debe contener números",
    };
  }

  // Entre 7 y 15 dígitos
  if (phone.length < 7 || phone.length > 15) {
    return {
      isValid: false,
      message: "El teléfono debe tener entre 7 y 15 dígitos",
    };
  }

  return { isValid: true, message: "" };
}

// Validación de edad
export function validateAge(edad: number): ValidationResult {
  if (!edad || edad <= 0) {
    return { isValid: false, message: "La edad es obligatoria" };
  }

  if (edad < 18) {
    return { isValid: false, message: "Debes ser mayor de 18 años" };
  }

  if (edad > 100) {
    return { isValid: false, message: "La edad no puede ser mayor a 100 años" };
  }

  return { isValid: true, message: "" };
}

// Validación de nombre completo
export function validateFullName(nombre: string): ValidationResult {
  if (!nombre || nombre.trim() === "") {
    return { isValid: false, message: "El nombre completo es obligatorio" };
  }

  if (nombre.trim().length < 3) {
    return {
      isValid: false,
      message: "El nombre debe tener al menos 3 caracteres",
    };
  }

  // Al menos dos palabras (nombre y apellido)
  const words = nombre.trim().split(/\s+/);
  if (words.length < 2) {
    return { isValid: false, message: "Ingresa nombre y apellido" };
  }

  return { isValid: true, message: "" };
}

// Validación de fecha de nacimiento
export function validateBirthDate(fecha: string): ValidationResult {
  if (!fecha || fecha.trim() === "") {
    return { isValid: false, message: "La fecha de nacimiento es obligatoria" };
  }

  const birthDate = new Date(fecha);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    return { isValid: false, message: "La fecha de nacimiento no es válida" };
  }

  if (birthDate > today) {
    return {
      isValid: false,
      message: "La fecha de nacimiento no puede ser futura",
    };
  }

  // Calcular edad usando la función del helper
  const edad = calcularEdad(fecha);

  if (edad < 18) {
    return { isValid: false, message: "Debes ser mayor de 18 años" };
  }

  return { isValid: true, message: "" };
}

// Validación de género
export function validateGender(gender: string): ValidationResult {
  if (!gender || gender.trim() === "") {
    return { isValid: true, message: "" }; // Opcional
  }

  const validGenders = ["masculino", "femenino", "otro"];
  if (!validGenders.includes(gender.toLowerCase())) {
    return { isValid: false, message: "Selecciona un género válido" };
  }

  return { isValid: true, message: "" };
}

// Validación de dirección
export function validateAddress(address: string): ValidationResult {
  if (!address || address.trim() === "") {
    return { isValid: true, message: "" }; // Opcional
  }

  if (address.trim().length < 5) {
    return {
      isValid: false,
      message: "La dirección debe tener al menos 5 caracteres",
    };
  }

  return { isValid: true, message: "" };
}

// Validación completa para registro
export function validateRegistrationData(data: {
  email: string;
  password: string;
  confirmPassword: string;
  nombreCompleto: string;
  cedula: string;
  telefono?: string;
  edad?: number;
  fechaNacimiento?: string;
  genero?: string;
  direccion?: string;
}): ValidationResult {
  // Validar email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) return emailValidation;

  // Validar contraseña
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) return passwordValidation;

  // Validar confirmación de contraseña
  const confirmPasswordValidation = validateConfirmPassword(
    data.password,
    data.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) return confirmPasswordValidation;

  // Validar nombre completo
  const nameValidation = validateFullName(data.nombreCompleto);
  if (!nameValidation.isValid) return nameValidation;

  // Validar cédula
  const cedulaValidation = validateCedula(data.cedula);
  if (!cedulaValidation.isValid) return cedulaValidation;

  // Validar teléfono si se proporciona
  if (data.telefono) {
    const phoneValidation = validatePhone(data.telefono);
    if (!phoneValidation.isValid) return phoneValidation;
  }

  // Validar edad si se proporciona
  if (data.edad) {
    const ageValidation = validateAge(data.edad);
    if (!ageValidation.isValid) return ageValidation;
  }

  // Validar fecha de nacimiento si se proporciona
  if (data.fechaNacimiento) {
    const birthDateValidation = validateBirthDate(data.fechaNacimiento);
    if (!birthDateValidation.isValid) return birthDateValidation;
  }

  // Validar género si se proporciona
  if (data.genero) {
    const genderValidation = validateGender(data.genero);
    if (!genderValidation.isValid) return genderValidation;
  }

  // Validar dirección si se proporciona
  if (data.direccion) {
    const addressValidation = validateAddress(data.direccion);
    if (!addressValidation.isValid) return addressValidation;
  }

  return { isValid: true, message: "" };
}

// Validación para login
export function validateLoginData(
  email: string,
  password: string
): ValidationResult {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) return emailValidation;

  if (!password || password.trim() === "") {
    return { isValid: false, message: "La contraseña es obligatoria" };
  }

  return { isValid: true, message: "" };
}
