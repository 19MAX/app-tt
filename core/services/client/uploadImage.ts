// Servicio para subir imagen de perfil o cualquier imagen del usuario
import { Api } from "@/core/api/client/Api";

interface UploadImageParams {
  api: InstanceType<typeof Api>;
  token: string;
  uri: string;
  nombreArchivo?: string;
  mimeType?: string;
}

export async function uploadProfileImage({
  api,
  token,
  uri,
  nombreArchivo,
  mimeType,
}: UploadImageParams) {
  const nombre = nombreArchivo || uri.split("/").pop() || `foto-perfil.jpg`;
  const type =
    mimeType ||
    (nombre.endsWith(".png")
      ? "image/png"
      : nombre.endsWith(".webp")
        ? "image/webp"
        : "image/jpeg");

  const fileObject = {
    uri,
    name: nombre,
    type,
  } as any;

  // Intentar con la API generada primero
  try {
    const res = await api.usuarios.actualizarFotoPerfil({
      archivo: fileObject,
    });
    return res;
  } catch (apiError) {
    console.log("[uploadProfileImage] Error: Intentando con petición manual", apiError);
    // Si falla, intentar con petición manual
    const formData = new FormData();
    formData.append("archivo", fileObject);
    const res = await api.instance.request({
      url: "/usuarios/perfil/foto",
      method: "PATCH",
      data: formData,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  }
}
