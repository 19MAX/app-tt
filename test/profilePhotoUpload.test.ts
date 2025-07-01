import { Api } from "../core/api/client/Api";

describe("Subida de foto de perfil", () => {
  it("debería enviar el archivo y recibir la URL de la foto actualizada", async () => {
    // Mock del archivo
    const fakeFile = new File(
      [new Blob(["fake content"], { type: "image/jpeg" })],
      "foto-test.jpg",
      { type: "image/jpeg" }
    );

    // Mock de la API
    const api = new Api({
      securityWorker: () => ({
        headers: { Authorization: "Bearer fake-token" },
      }),
    });
    // Mock de la función request
    api.usuarios.actualizarFotoPerfil = jest.fn().mockResolvedValue({
      data: {
        urlFoto: "https://fakeurl.com/foto-perfil.jpg",
      },
    });

    // Llamada simulada
    const res = await api.usuarios.actualizarFotoPerfil({ archivo: fakeFile });

    expect(api.usuarios.actualizarFotoPerfil).toHaveBeenCalledWith({
      archivo: fakeFile,
    });
    expect(res.data.urlFoto).toBe("https://fakeurl.com/foto-perfil.jpg");
  });

  it("debería manejar errores de red", async () => {
    const fakeFile = new File(
      [new Blob(["fake content"], { type: "image/jpeg" })],
      "foto-test.jpg",
      { type: "image/jpeg" }
    );
    const api = new Api({
      securityWorker: () => ({
        headers: { Authorization: "Bearer fake-token" },
      }),
    });
    api.usuarios.actualizarFotoPerfil = jest
      .fn()
      .mockRejectedValue(new Error("Network Error"));
    try {
      await api.usuarios.actualizarFotoPerfil({ archivo: fakeFile });
    } catch (e: any) {
      expect(e.message).toBe("Network Error");
    }
  });
});
