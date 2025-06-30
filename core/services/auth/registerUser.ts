import { Api } from "@/core/api/client/Api";

const api = new Api({});

export interface RegisterUserInput {
  email: string;
  password: string;
  nombreCompleto: string;
  numeroContacto: string;
  edad: number;
  ci: string;
  urlFoto?: string;
}

export interface RegisterUserResult {
  success: boolean;
  message: string;
  usuario?: any;
  status?: number;
}

export async function registerUser(
  input: RegisterUserInput
): Promise<RegisterUserResult> {
  try {
    const res = await api.auth.registrarUsuario(input);
    // La API puede devolver el usuario en res.data.usuario y el mensaje en res.data.message
    const usuario = (res.data as any)?.usuario || res.data;
    const message = (res.data as any)?.message || "Usuario creado exitosamente";
    if ((res.status === 201 || usuario) && message) {
      return {
        success: true,
        message,
        usuario,
        status: res.status,
      };
    } else {
      return {
        success: false,
        message:
          message || "No se pudo registrar el usuario. Intenta nuevamente.",
        status: res.status,
      };
    }
  } catch (e: any) {
    return {
      success: false,
      message: e?.response?.data?.message || "Error al registrar usuario",
      status: e?.response?.status,
    };
  }
}
