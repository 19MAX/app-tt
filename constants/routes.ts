// constants/routes.ts

export const routes = {
  root: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    RegisterDataScreen: "/auth/register-data",
    recover: "/auth/recover",
  },
  client: {
    index: "/client",
    modal: {
      creditos: "/client/modal/creditos",
      ofertas: "/client/modal/ofertas",
    },
    tabs: {
      buscar: "/client/tabs/buscar",
      categorias: "/client/tabs/categorias",
      favoritos: "/client/tabs/favoritos",
      inicio: "/client/tabs/inicio",
      perfil: "/client/tabs/perfil",
      publicar: "/client/publicar",
    },
    // ==================== NUEVAS RUTAS PARA OFERTAS ====================
    ofertas: {
      index: "/client/ofertas", // Ver mis ofertas creadas
      create: "/client/ofertas/create", // Crear nueva oferta
      detail: "/client/ofertas/[id]", // Ver detalle de oferta específica
    },
    // ==================== NUEVAS RUTAS PARA SERVICIOS ====================
    servicios: {
      index: "/client/servicios", // Ver todos mis servicios enviados a revisión
      create: "/client/servicios/create", // Solicitar nuevo servicio
      detail: "/client/servicios/[id]", // Ver detalle de servicio específico
    },
  },
};

// ==================== HELPERS PARA RUTAS DINÁMICAS ====================

export const routeHelpers = {
  // Generar ruta para detalle de oferta
  getOfertaDetail: (id: string): string => {
    return `/client/ofertas/${id}`;
  },

  // Generar ruta para detalle de servicio
  getServicioDetail: (id: string): string => {
    return `/client/servicios/${id}`;
  },
};

// ==================== TIPOS PARA LAS RUTAS ====================

export type RouteParams = {
  // Parámetros para rutas dinámicas
  "/client/ofertas/[id]": { id: string };
  "/client/servicios/[id]": { id: string };
};