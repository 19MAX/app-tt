/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://api-tandt.softecsa.com/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API de Servicios
 * @version 1.0
 * @baseUrl https://api-tandt.softecsa.com/api
 * @contact
 *
 * Documentación de la API de Servicios
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  usuarios = {
    /**
     * @description Registro público de usuarios. Automáticamente asigna rol de cliente y otorga 5 créditos gratuitos.
     *
     * @tags Usuarios
     * @name CrearUsuario
     * @summary Registrar un nuevo usuario
     * @request POST:/usuarios
     */
    crearUsuario: (
      data: {
        /**
         * Correo electrónico único del usuario
         * @format email
         * @example "usuario@example.com"
         */
        email: string;
        /**
         * Contraseña con al menos 8 caracteres, una mayúscula, una minúscula y un número
         * @example "Password123"
         */
        password: string;
        /**
         * Nombre completo del usuario
         * @example "Juan Pérez González"
         */
        nombreCompleto: string;
        /**
         * Número de teléfono de 8 a 15 dígitos
         * @example "0987654321"
         */
        numeroContacto: string;
        /**
         * Edad del usuario (mínimo 18 años)
         * @min 18
         * @max 100
         * @example 25
         */
        edad: number;
        /**
         * Cédula de identidad ecuatoriana (10 dígitos)
         * @pattern ^\d{10}$
         * @example "1234567890"
         */
        ci: string;
        /**
         * URL de la foto de perfil (opcional)
         * @example "https://foto.com/usuario.jpg"
         */
        urlFoto?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez González" */
          nombreCompleto?: string;
          /** @example "0987654321" */
          numeroContacto?: string;
          /** @example 25 */
          edad?: number;
          /** @example "1234567890" */
          ci?: string;
          /** @example "https://foto.com/usuario.jpg" */
          urlFoto?: string;
          /**
           * Asignado automáticamente
           * @example "cliente"
           */
          rol?: string;
          /**
           * Créditos gratuitos por registro
           * @example 5
           */
          creditosDisponibles?: number;
          /** @example true */
          activo?: boolean;
          /** @example "2024-05-20T12:00:00.000Z" */
          fechaCreacion?: string;
          /** @example "2024-05-20T12:00:00.000Z" */
          fechaActualizacion?: string;
          /** @example "" */
          nivelEducacion?: string;
          /** @example "" */
          ciudadania?: string;
          /** @example null */
          trabajoDeseado?: object | null;
          /** @example 0 */
          calificacionPromedio?: number;
          /** @example [] */
          comentarios?: any[];
          /** @example [] */
          contactosFavoritos?: string[];
        },
        {
          message?: string | string[];
          /** @example 400 */
          statusCode?: number;
        }
      >({
        path: `/usuarios`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usuarios
     * @name ObtenerPerfil
     * @summary Obtener el perfil del usuario autenticado
     * @request GET:/usuarios/perfil
     * @secure
     */
    obtenerPerfil: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez" */
          nombreCompleto?: string;
        },
        any
      >({
        path: `/usuarios/perfil`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usuarios
     * @name ActualizarPerfil
     * @summary Actualizar el perfil del usuario autenticado
     * @request PUT:/usuarios/perfil
     * @secure
     */
    actualizarPerfil: (
      data: {
        /** @example "Juan Pérez" */
        nombreCompleto?: string;
        /** @example "+593987654321" */
        numeroContacto?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "Juan Pérez" */
          nombreCompleto?: string;
          /** @example "+593987654321" */
          numeroContacto?: string;
        },
        any
      >({
        path: `/usuarios/perfil`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usuarios
     * @name ActualizarUsuarioPorAdmin
     * @summary Actualizar un usuario por ID (solo para administradores)
     * @request PUT:/usuarios/{id}
     * @secure
     */
    actualizarUsuarioPorAdmin: (
      id: string,
      data: {
        /** @example "Juan Pérez" */
        nombreCompleto?: string;
        /** @example "+593987654321" */
        numeroContacto?: string;
        /** @example 25 */
        edad?: number;
        /** @example "USUARIO" */
        rol?: "ADMIN" | "USUARIO";
        /** @example "1234567890" */
        ci?: string;
        /** @example "https://..." */
        urlFoto?: string;
        /** @example "Universitario" */
        nivelEducacion?: string;
        /** @example "Ecuatoriana" */
        ciudadania?: string;
        /** @example "Desarrollador" */
        trabajoDeseado?: string;
        /** @example 10 */
        creditosDisponibles?: number;
        /** @example true */
        activo?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "Juan Pérez" */
          nombreCompleto?: string;
          /** @example "+593987654321" */
          numeroContacto?: string;
          /** @example 25 */
          edad?: number;
          /** @example "USUARIO" */
          rol?: string;
          /** @example "1234567890" */
          ci?: string;
          /** @example "https://..." */
          urlFoto?: string;
          /** @example "Universitario" */
          nivelEducacion?: string;
          /** @example "Ecuatoriana" */
          ciudadania?: string;
          /** @example "Desarrollador" */
          trabajoDeseado?: string;
          /** @example 10 */
          creditosDisponibles?: number;
          /** @example true */
          activo?: boolean;
        },
        {
          /** @example ["El campo email es obligatorio."] */
          message?: string[];
          /** @example 400 */
          statusCode?: number;
        }
      >({
        path: `/usuarios/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usuarios
     * @name EliminarUsuario
     * @summary Eliminar un usuario por ID (solo para administradores)
     * @request DELETE:/usuarios/{id}
     * @secure
     */
    eliminarUsuario: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Usuario eliminado correctamente" */
          message?: string;
        },
        any
      >({
        path: `/usuarios/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene una lista de todos los usuarios que tienen el estado activo en true.
     *
     * @tags Usuarios
     * @name ObtenerUsuariosActivos
     * @summary Obtener todos los usuarios activos (solo para administradores)
     * @request GET:/usuarios/activos
     * @secure
     */
    obtenerUsuariosActivos: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez González" */
          nombreCompleto?: string;
          /** @example "0987654321" */
          numeroContacto?: string;
          /** @example 25 */
          edad?: number;
          /** @example "1234567890" */
          ci?: string;
          /** @example "https://foto.com/usuario.jpg" */
          urlFoto?: string;
          /** @example "cliente" */
          rol?: string;
          /** @example 5 */
          creditosDisponibles?: number;
          /** @example true */
          activo?: boolean;
          /** @example "Universitaria" */
          nivelEducacion?: string;
          /** @example "Ecuatoriana" */
          ciudadania?: string;
          trabajoDeseado?: {
            /** @example "Mesera" */
            tipo?: string;
            /** @example "Quito" */
            ciudad?: string;
            /** @example 500 */
            expectativaIngresos?: number;
          } | null;
          /** @example 4.5 */
          calificacionPromedio?: number;
          /** @example [] */
          comentarios?: any[];
          /** @example ["contactoId1","contactoId2"] */
          contactosFavoritos?: string[];
          /**
           * @format date-time
           * @example "2024-05-20T12:00:00.000Z"
           */
          fechaCreacion?: string;
          /**
           * @format date-time
           * @example "2024-05-20T15:30:00.000Z"
           */
          fechaActualizacion?: string;
        }[],
        | {
            /** @example "Error al obtener usuarios activos: mensaje de error" */
            message?: string;
            /** @example 400 */
            statusCode?: number;
          }
        | {
            /** @example "Acceso denegado" */
            message?: string;
            /** @example 401 */
            statusCode?: number;
          }
      >({
        path: `/usuarios/activos`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene una lista completa de todos los usuarios registrados, incluyendo activos e inactivos. Útil para administración y auditoría.
     *
     * @tags Usuarios
     * @name ObtenerTodosLosUsuarios
     * @summary Obtener todos los usuarios sin filtrar por estado (solo para administradores)
     * @request GET:/usuarios/todos
     * @secure
     */
    obtenerTodosLosUsuarios: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez González" */
          nombreCompleto?: string;
          /** @example "0987654321" */
          numeroContacto?: string;
          /** @example 25 */
          edad?: number;
          /** @example "1234567890" */
          ci?: string;
          /** @example "https://foto.com/usuario.jpg" */
          urlFoto?: string;
          /** @example "cliente" */
          rol?: "ADMIN" | "CLIENTE";
          /** @example 5 */
          creditosDisponibles?: number;
          /**
           * Estado de la cuenta (true=activo, false=inactivo)
           * @example true
           */
          activo?: boolean;
          /** @example "Universitaria" */
          nivelEducacion?: string;
          /** @example "Ecuatoriana" */
          ciudadania?: string;
          trabajoDeseado?: {
            /** @example "Mesera" */
            tipo?: string;
            /** @example "Quito" */
            ciudad?: string;
            /** @example 500 */
            expectativaIngresos?: number;
          } | null;
          /** @example 4.5 */
          calificacionPromedio?: number;
          /** @example [] */
          comentarios?: any[];
          /** @example ["contactoId1","contactoId2"] */
          contactosFavoritos?: string[];
          /**
           * @format date-time
           * @example "2024-05-20T12:00:00.000Z"
           */
          fechaCreacion?: string;
          /**
           * @format date-time
           * @example "2024-05-20T15:30:00.000Z"
           */
          fechaActualizacion?: string;
        }[],
        | {
            /** @example "Error al obtener usuarios: mensaje de error" */
            message?: string;
            /** @example 400 */
            statusCode?: number;
          }
        | {
            /** @example "Acceso denegado" */
            message?: string;
            /** @example 401 */
            statusCode?: number;
          }
      >({
        path: `/usuarios/todos`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Desactiva la cuenta de un usuario específico. El usuario no podrá iniciar sesión hasta que su cuenta sea reactivada. También se desactiva en Firebase Auth.
     *
     * @tags Usuarios
     * @name DesactivarUsuario
     * @summary Desactivar la cuenta de un usuario (solo para administradores)
     * @request PATCH:/usuarios/{id}/desactivar
     * @secure
     */
    desactivarUsuario: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Usuario desactivado correctamente" */
          mensaje?: string;
          usuario?: {
            /** @example "12345" */
            id?: string;
            /** @example "usuario@example.com" */
            email?: string;
            /** @example "Juan Pérez González" */
            nombreCompleto?: string;
            /** @example "0987654321" */
            numeroContacto?: string;
            /** @example 25 */
            edad?: number;
            /** @example "1234567890" */
            ci?: string;
            /** @example "https://foto.com/usuario.jpg" */
            urlFoto?: string;
            /** @example "cliente" */
            rol?: string;
            /** @example 5 */
            creditosDisponibles?: number;
            /**
             * Estado actualizado a inactivo
             * @example false
             */
            activo?: boolean;
            /**
             * @format date-time
             * @example "2024-05-20T12:00:00.000Z"
             */
            fechaCreacion?: string;
            /**
             * Fecha actualizada al momento de la desactivación
             * @format date-time
             * @example "2024-05-20T16:00:00.000Z"
             */
            fechaActualizacion?: string;
          };
        },
        | {
            message?: string;
            /** @example 400 */
            statusCode?: number;
          }
        | {
            /** @example "Acceso denegado" */
            message?: string;
            /** @example 401 */
            statusCode?: number;
          }
        | {
            /** @example "Usuario no encontrado" */
            message?: string;
            /** @example 404 */
            statusCode?: number;
          }
      >({
        path: `/usuarios/${id}/desactivar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Reactiva la cuenta de un usuario previamente desactivado. El usuario podrá volver a iniciar sesión normalmente. También se reactiva en Firebase Auth.
     *
     * @tags Usuarios
     * @name ReactivarUsuario
     * @summary Reactivar la cuenta de un usuario (solo para administradores)
     * @request PATCH:/usuarios/{id}/reactivar
     * @secure
     */
    reactivarUsuario: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Usuario activado correctamente" */
          mensaje?: string;
          usuario?: {
            /** @example "12345" */
            id?: string;
            /** @example "usuario@example.com" */
            email?: string;
            /** @example "Juan Pérez González" */
            nombreCompleto?: string;
            /** @example "0987654321" */
            numeroContacto?: string;
            /** @example 25 */
            edad?: number;
            /** @example "1234567890" */
            ci?: string;
            /** @example "https://foto.com/usuario.jpg" */
            urlFoto?: string;
            /** @example "cliente" */
            rol?: string;
            /** @example 5 */
            creditosDisponibles?: number;
            /**
             * Estado actualizado a activo
             * @example true
             */
            activo?: boolean;
            /**
             * @format date-time
             * @example "2024-05-20T12:00:00.000Z"
             */
            fechaCreacion?: string;
            /**
             * Fecha actualizada al momento de la reactivación
             * @format date-time
             * @example "2024-05-20T17:00:00.000Z"
             */
            fechaActualizacion?: string;
          };
        },
        | {
            message?: string;
            /** @example 400 */
            statusCode?: number;
          }
        | {
            /** @example "Acceso denegado" */
            message?: string;
            /** @example 401 */
            statusCode?: number;
          }
        | {
            /** @example "Usuario no encontrado" */
            message?: string;
            /** @example 404 */
            statusCode?: number;
          }
      >({
        path: `/usuarios/${id}/reactivar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description El token FCM (Firebase Cloud Messaging) es un identificador único generado por Firebase para cada dispositivo o navegador. Permite que la plataforma envíe notificaciones push personalizadas a tu dispositivo. Debes enviar este token desde tu app móvil o web para poder recibir notificaciones en tiempo real.
     *
     * @tags Usuarios
     * @name ActualizarFcmToken
     * @summary Actualizar el token FCM del usuario autenticado
     * @request PATCH:/usuarios/fcm-token
     * @secure
     */
    actualizarFcmToken: (
      data: {
        /**
         * Token único generado por Firebase para tu dispositivo.
         * @example "fcm_token_123456"
         */
        fcmToken: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "Token FCM actualizado correctamente" */
          mensaje?: string;
        },
        void
      >({
        path: `/usuarios/fcm-token`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usuarios
     * @name VerificarCi
     * @summary Verificar si una cédula de identidad ya está registrada
     * @request GET:/usuarios/verificar/ci
     */
    verificarCi: (
      query: {
        /**
         * Cédula de identidad a verificar
         * @example "1234567890"
         */
        ci: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * true si la CI ya está registrada, false si está disponible
           * @example true
           */
          existe?: boolean;
          /**
           * Mensaje descriptivo sobre el estado de la cédula de identidad
           * @example "La cédula de identidad ya está registrada en el sistema."
           */
          mensaje?: string;
        },
        {
          /** @example "Error al verificar CI: CI inválida" */
          message?: string;
          /** @example 400 */
          statusCode?: number;
        }
      >({
        path: `/usuarios/verificar/ci`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Permite al usuario completar su perfil con información adicional para ofrecer servicios en la plataforma.
     *
     * @tags Usuarios
     * @name ConfigurarPerfil
     * @summary Configurar perfil del usuario para ofrecer servicios
     * @request GET:/usuarios/perfil/{id}
     * @secure
     */
    configurarPerfil: (
      id: string,
      data: {
        /**
         * Nivel educativo del usuario
         * @example "Universitaria"
         */
        nivelEducacion?: string;
        /**
         * Nacionalidad del usuario
         * @example "Ecuatoriana"
         */
        ciudadania?: string;
        /** Información sobre el tipo de trabajo que desea ofrecer */
        trabajoDeseado?: {
          /**
           * Tipo de servicio que desea ofrecer
           * @example "Mesera"
           */
          tipo: string;
          /**
           * Ciudad donde desea trabajar
           * @example "Quito"
           */
          ciudad: string;
          /**
           * Expectativa de ingresos mensuales (opcional)
           * @min 0
           * @example 500
           */
          expectativaIngresos?: number;
        };
        /**
         * Lista de IDs de contactos favoritos
         * @example ["contactoId1","contactoId2"]
         */
        contactosFavoritos?: string[];
        /**
         * URL actualizada de la foto de perfil
         * @example "https://foto.com/usuario.jpg"
         */
        urlFoto?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez González" */
          nombreCompleto?: string;
          /** @example "0987654321" */
          numeroContacto?: string;
          /** @example 25 */
          edad?: number;
          /** @example "1234567890" */
          ci?: string;
          /** @example "https://foto.com/usuario.jpg" */
          urlFoto?: string;
          /** @example "cliente" */
          rol?: string;
          /** @example 5 */
          creditosDisponibles?: number;
          /** @example true */
          activo?: boolean;
          /** @example "Universitaria" */
          nivelEducacion?: string;
          /** @example "Ecuatoriana" */
          ciudadania?: string;
          trabajoDeseado?: {
            /** @example "Mesera" */
            tipo?: string;
            /** @example "Quito" */
            ciudad?: string;
            /** @example 500 */
            expectativaIngresos?: number;
          };
          /** @example ["contactoId1","contactoId2"] */
          contactosFavoritos?: string[];
          /** @example "2024-05-20T12:00:00.000Z" */
          fechaCreacion?: string;
          /** @example "2024-05-20T15:30:00.000Z" */
          fechaActualizacion?: string;
          /** @example 0 */
          calificacionPromedio?: number;
          /** @example [] */
          comentarios?: any[];
        },
        | {
            /** @example ["El tipo de trabajo es obligatorio","La ciudad es obligatoria"] */
            message?: string[];
            /** @example 400 */
            statusCode?: number;
          }
        | {
            /** @example "Usuario no encontrado" */
            message?: string;
            /** @example 404 */
            statusCode?: number;
          }
      >({
        path: `/usuarios/perfil/${id}`,
        method: "GET",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Permite al usuario autenticado subir una nueva foto de perfil. Elimina automáticamente la foto anterior si existe y actualiza la URL en el perfil del usuario.
     *
     * @tags Usuarios
     * @name ActualizarFotoPerfil
     * @summary Actualizar la foto de perfil del usuario
     * @request PATCH:/usuarios/perfil/foto
     * @secure
     */
    actualizarFotoPerfil: (
      data: {
        /**
         * Archivo de imagen (JPEG, PNG, WebP, máximo 5MB)
         * @format binary
         */
        archivo: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez González" */
          nombreCompleto?: string;
          /** @example "0987654321" */
          numeroContacto?: string;
          /** @example 25 */
          edad?: number;
          /** @example "1234567890" */
          ci?: string;
          /**
           * Nueva URL de la foto de perfil
           * @example "https://storage.googleapis.com/bucket/perfiles/12345/perfil-12345-1620000000000.jpg"
           */
          urlFoto?: string;
          /** @example "cliente" */
          rol?: string;
          /** @example 5 */
          creditosDisponibles?: number;
          /** @example true */
          activo?: boolean;
          /**
           * @format date-time
           * @example "2024-05-20T12:00:00.000Z"
           */
          fechaCreacion?: string;
          /**
           * @format date-time
           * @example "2024-05-20T15:30:00.000Z"
           */
          fechaActualizacion?: string;
        },
        | {
            message?: string;
            /** @example 400 */
            statusCode?: number;
          }
        | {
            /** @example "Unauthorized" */
            message?: string;
            /** @example 401 */
            statusCode?: number;
          }
        | {
            /** @example "Usuario no encontrado" */
            message?: string;
            /** @example 404 */
            statusCode?: number;
          }
      >({
        path: `/usuarios/perfil/foto`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  imagenes = {
    /**
     * @description Permite subir una imagen a una carpeta específica. El usuario se obtiene automáticamente del token JWT.
     *
     * @tags Imagenes
     * @name SubirImagen
     * @summary Subir una imagen
     * @request POST:/imagenes/subir
     * @secure
     */
    subirImagen: (
      data: {
        /**
         * Archivo de imagen (jpeg, jpg, png, webp) - Máximo 5MB
         * @format binary
         */
        imagen: File;
        /**
         * Carpeta donde se guardará la imagen
         * @example "perfiles"
         */
        carpeta: "perfiles" | "documentos" | "trabajos" | "general";
        /**
         * Nombre personalizado para la imagen (opcional)
         * @example "mi-imagen-perfil"
         */
        nombre?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * URL pública de la imagen
           * @example "https://storage.googleapis.com/bucket/perfiles/user123/imagen.jpg"
           */
          url?: string;
          /**
           * Nombre del archivo
           * @example "uuid-timestamp.jpg"
           */
          nombre?: string;
          /**
           * Tamaño del archivo en bytes
           * @example 1024000
           */
          tamanio?: number;
          /**
           * Tipo MIME del archivo
           * @example "image/jpeg"
           */
          tipo?: string;
        },
        | {
            /** @example 400 */
            statusCode?: number;
            /** @example "El archivo es demasiado grande. Máximo: 5MB" */
            message?: string;
            /** @example "Bad Request" */
            error?: string;
          }
        | {
            /** @example 401 */
            statusCode?: number;
            /** @example "Unauthorized" */
            message?: string;
          }
      >({
        path: `/imagenes/subir`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Elimina una imagen del usuario autenticado por su ID. Solo se pueden eliminar las imágenes propias.
     *
     * @tags Imagenes
     * @name EliminarImagen
     * @summary Eliminar una imagen
     * @request DELETE:/imagenes/{id}
     * @secure
     */
    eliminarImagen: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Imagen eliminada exitosamente" */
          mensaje?: string;
        },
        void
      >({
        path: `/imagenes/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene los detalles de una imagen específica por su ID.
     *
     * @tags Imagenes
     * @name ObtenerImagenPorId
     * @summary Obtener imagen por ID
     * @request GET:/imagenes/{id}
     * @secure
     */
    obtenerImagenPorId: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/imagenes/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Obtiene todas las imágenes del usuario autenticado, con opción de filtrar por carpeta.
     *
     * @tags Imagenes
     * @name ObtenerMisImagenes
     * @summary Obtener mis imágenes
     * @request GET:/imagenes
     * @secure
     */
    obtenerMisImagenes: (
      query?: {
        /** Filtrar por carpeta específica */
        carpeta?: "perfiles" | "documentos" | "trabajos" | "general";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * ID único de la imagen en Firestore
           * @example "doc123abc"
           */
          id?: string;
          /**
           * Nombre del archivo
           * @example "uuid-timestamp.jpg"
           */
          nombre?: string;
          /**
           * URL pública de la imagen
           * @example "https://storage.googleapis.com/bucket/perfiles/user123/imagen.jpg"
           */
          url?: string;
          /**
           * Tamaño del archivo en bytes
           * @example 1024000
           */
          tamanio?: number;
          /**
           * Tipo MIME del archivo
           * @example "image/jpeg"
           */
          tipo?: string;
          /**
           * ID del usuario propietario
           * @example "user123"
           */
          usuarioId?: string;
          /**
           * Fecha y hora de subida
           * @format date-time
           * @example "2025-06-16T10:30:00.000Z"
           */
          fechaSubida?: string;
          /**
           * Carpeta donde está almacenada
           * @example "perfiles"
           */
          carpeta?: "perfiles" | "documentos" | "trabajos" | "general";
        }[],
        {
          /** @example 401 */
          statusCode?: number;
          /** @example "Unauthorized" */
          message?: string;
        }
      >({
        path: `/imagenes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Permite a los administradores obtener todas las imágenes de un usuario específico por su ID, con opción de filtrar por carpeta. Este endpoint requiere permisos de administrador.
     *
     * @tags Imagenes
     * @name ObtenerImagenesDeUsuario
     * @summary Obtener imágenes de un usuario específico (Solo Administradores)
     * @request GET:/imagenes/usuario/{usuarioId}
     * @secure
     */
    obtenerImagenesDeUsuario: (
      usuarioId: string,
      query?: {
        /** Filtrar por carpeta específica (opcional) */
        carpeta?: "perfiles" | "documentos" | "trabajos" | "general";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * ID único de la imagen en Firestore
           * @example "doc123abc456def"
           */
          id?: string;
          /**
           * Nombre del archivo
           * @example "trabajo-1640995200000-abc12345.jpg"
           */
          nombre?: string;
          /**
           * URL pública de la imagen
           * @example "https://storage.googleapis.com/bucket/trabajos/user123/imagen.jpg"
           */
          url?: string;
          /**
           * Tamaño del archivo en bytes
           * @example 2048576
           */
          tamanio?: number;
          /**
           * Tipo MIME del archivo
           * @example "image/jpeg"
           */
          tipo?: string;
          /**
           * ID del usuario propietario de la imagen
           * @example "user123"
           */
          usuarioId?: string;
          /**
           * Fecha y hora de subida de la imagen
           * @format date-time
           * @example "2025-06-18T10:30:00.000Z"
           */
          fechaSubida?: string;
          /**
           * Carpeta donde está almacenada la imagen
           * @example "trabajos"
           */
          carpeta?: "perfiles" | "documentos" | "trabajos" | "general";
          /**
           * Descripción de la imagen (disponible en imágenes de trabajos)
           * @example "Instalación eléctrica completa en casa residencial"
           */
          descripcion?: string | null;
        }[],
        | {
            /** @example 401 */
            statusCode?: number;
            /** @example "Unauthorized" */
            message?: string;
          }
        | {
            /** @example 403 */
            statusCode?: number;
            /** @example "Acceso denegado. Se requieren permisos de administrador." */
            message?: string;
            /** @example "Forbidden" */
            error?: string;
          }
        | {
            /** @example 404 */
            statusCode?: number;
            /** @example "Usuario no encontrado" */
            message?: string;
            /** @example "Not Found" */
            error?: string;
          }
      >({
        path: `/imagenes/usuario/${usuarioId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Permite subir una imagen de trabajo con descripción para la galería de trabajos realizados.
     *
     * @tags Imagenes
     * @name SubirImagenTrabajo
     * @summary Subir imagen de trabajo
     * @request POST:/imagenes/trabajos/subir
     * @secure
     */
    subirImagenTrabajo: (
      data: {
        /**
         * Archivo de imagen del trabajo (jpeg, jpg, png, webp) - Máximo 5MB
         * @format binary
         */
        imagen: File;
        /**
         * Descripción detallada del trabajo realizado
         * @maxLength 500
         * @example "Instalación eléctrica completa en casa residencial de 3 dormitorios"
         */
        descripcion: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * URL pública de la imagen subida
           * @example "https://storage.googleapis.com/bucket/trabajos/user123/trabajo-1640995200000-abc12345.jpg"
           */
          url?: string;
          /**
           * Nombre del archivo generado
           * @example "trabajo-1640995200000-abc12345.jpg"
           */
          nombre?: string;
          /**
           * Tamaño del archivo en bytes
           * @example 2048576
           */
          tamanio?: number;
          /**
           * Tipo MIME del archivo
           * @example "image/jpeg"
           */
          tipo?: string;
          /**
           * ID único del documento en Firestore
           * @example "doc123abc456def"
           */
          id?: string;
        },
        | {
            /** @example 400 */
            statusCode?: number;
            /** @example "El archivo es demasiado grande (6.2MB). Máximo permitido: 5.0MB" */
            message?: string;
            /** @example "Bad Request" */
            error?: string;
          }
        | {
            /** @example 401 */
            statusCode?: number;
            /** @example "Unauthorized" */
            message?: string;
          }
      >({
        path: `/imagenes/trabajos/subir`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene una galería pública con las imágenes de trabajos de todos los usuarios, limitada a las 50 más recientes.
     *
     * @tags Imagenes
     * @name ObtenerGaleriaPublica
     * @summary Obtener galería pública de trabajos
     * @request GET:/imagenes/trabajos/galeria-publica
     * @secure
     */
    obtenerGaleriaPublica: (params: RequestParams = {}) =>
      this.request<
        {
          /**
           * ID único de la imagen en Firestore
           * @example "doc123abc456def"
           */
          id?: string;
          /**
           * Nombre del archivo
           * @example "trabajo-1640995200000-abc12345.jpg"
           */
          nombre?: string;
          /**
           * URL pública de la imagen
           * @example "https://storage.googleapis.com/bucket/trabajos/user456/trabajo-1640995200000-abc12345.jpg"
           */
          url?: string;
          /**
           * Tamaño del archivo en bytes
           * @example 2048576
           */
          tamanio?: number;
          /**
           * Tipo MIME del archivo
           * @example "image/jpeg"
           */
          tipo?: string;
          /**
           * ID del usuario que subió la imagen
           * @example "user456"
           */
          usuarioId?: string;
          /**
           * Fecha y hora de subida
           * @format date-time
           * @example "2025-06-17T10:30:00.000Z"
           */
          fechaSubida?: string;
          /**
           * Carpeta donde está almacenada la imagen
           * @example "trabajos"
           */
          carpeta?: "trabajos";
          /**
           * Descripción del trabajo realizado
           * @example "Reparación de sistema de plomería en baño principal"
           */
          descripcion?: string;
        }[],
        | {
            /** @example 401 */
            statusCode?: number;
            /** @example "Unauthorized" */
            message?: string;
          }
        | {
            /** @example 500 */
            statusCode?: number;
            /** @example "Error interno del servidor" */
            message?: string;
          }
      >({
        path: `/imagenes/trabajos/galeria-publica`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Autenticación
     * @name LoginUsuario
     * @summary Iniciar sesión con credenciales
     * @request POST:/auth/login
     */
    loginUsuario: (
      data: {
        /**
         * @format email
         * @example "usuario@example.com"
         */
        email: string;
        /** @example "password123" */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "eyJhbGciOiJIUzI1NiIsInR5..." */
          accessToken?: string;
          user?: {
            /** @example "12345" */
            id?: string;
            /** @example "usuario@example.com" */
            email?: string;
          };
        },
        | {
            /** @example "Credenciales inválidas" */
            message?: string;
            /** @example 401 */
            statusCode?: number;
          }
        | {
            /** @example "Error interno del servidor" */
            message?: string;
            /** @example 500 */
            statusCode?: number;
          }
      >({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Registro público simplificado. Automáticamente asigna rol de cliente y otorga 5 créditos gratuitos.
     *
     * @tags Autenticación
     * @name RegistrarUsuario
     * @summary Registrar un nuevo usuario
     * @request POST:/auth/registrarse
     */
    registrarUsuario: (
      data: {
        /**
         * Correo electrónico único del usuario
         * @format email
         * @example "usuario@example.com"
         */
        email: string;
        /**
         * Contraseña con al menos 8 caracteres, una mayúscula, una minúscula y un número
         * @example "Password123"
         */
        password: string;
        /**
         * Nombre completo del usuario
         * @example "Juan Pérez González"
         */
        nombreCompleto: string;
        /**
         * Número de teléfono de 8 a 15 dígitos
         * @example "0987654321"
         */
        numeroContacto: string;
        /**
         * Edad del usuario (mínimo 18 años)
         * @min 18
         * @max 100
         * @example 25
         */
        edad: number;
        /**
         * Cédula de identidad ecuatoriana (10 dígitos)
         * @pattern ^\d{10}$
         * @example "1234567890"
         */
        ci: string;
        /**
         * URL de la foto de perfil (opcional)
         * @example "https://foto.com/usuario.jpg"
         */
        urlFoto?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez González" */
          nombreCompleto?: string;
          /** @example "0987654321" */
          numeroContacto?: string;
          /** @example 25 */
          edad?: number;
          /** @example "1234567890" */
          ci?: string;
          /** @example "https://foto.com/usuario.jpg" */
          urlFoto?: string;
          /**
           * Asignado automáticamente
           * @example "cliente"
           */
          rol?: string;
          /**
           * Créditos gratuitos por registro
           * @example 5
           */
          creditosDisponibles?: number;
          /** @example true */
          activo?: boolean;
          /** @example "2024-05-20T12:00:00.000Z" */
          fechaCreacion?: string;
          /** @example "2024-05-20T12:00:00.000Z" */
          fechaActualizacion?: string;
          /**
           * Se configura después del registro
           * @example ""
           */
          nivelEducacion?: string;
          /**
           * Se configura después del registro
           * @example ""
           */
          ciudadania?: string;
          /**
           * Se configura cuando desee ofrecer servicios
           * @example null
           */
          trabajoDeseado?: object | null;
          /** @example 0 */
          calificacionPromedio?: number;
          /** @example [] */
          comentarios?: any[];
          /** @example [] */
          contactosFavoritos?: string[];
        },
        {
          message?: string | string[];
          /** @example 400 */
          statusCode?: number;
        }
      >({
        path: `/auth/registrarse`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Autenticación
     * @name ObtenerPerfilUsuario
     * @summary Obtener el perfil del usuario autenticado
     * @request GET:/auth/perfil
     * @secure
     */
    obtenerPerfilUsuario: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "usuario@example.com" */
          email?: string;
          /** @example "Juan Pérez" */
          nombreCompleto?: string;
        },
        any
      >({
        path: `/auth/perfil`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Invalida el token JWT actual añadiéndolo a una lista negra
     *
     * @tags Autenticación
     * @name CerrarSesion
     * @summary Cerrar sesión del usuario autenticado
     * @request POST:/auth/logout
     * @secure
     */
    cerrarSesion: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Logout exitoso" */
          message?: string;
        },
        {
          /** @example "Token no proporcionado" */
          message?: string;
          /** @example 401 */
          statusCode?: number;
        }
      >({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Autenticación
     * @name SolicitarRecuperacionPassword
     * @summary Solicitar recuperación de contraseña
     * @request POST:/auth/solicitar-recuperacion
     */
    solicitarRecuperacionPassword: (
      data: {
        /** @format email */
        email?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
        },
        any
      >({
        path: `/auth/solicitar-recuperacion`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Permite restablecer la contraseña usando el token JWT recibido por email
     *
     * @tags Autenticación
     * @name RestablecerPassword
     * @summary Restablecer contraseña con token
     * @request POST:/auth/restablecer-password
     */
    restablecerPassword: (
      data: {
        /**
         * Token JWT recibido en el email de recuperación
         * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
         */
        token: string;
        /**
         * Nueva contraseña (mínimo 8 caracteres, una mayúscula, una minúscula y un número)
         * @minLength 8
         * @example "NuevaPassword123"
         */
        nuevaPassword: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "Contraseña restablecida exitosamente" */
          message?: string;
        },
        | {
            message?: string;
            /** @example 400 */
            statusCode?: number;
          }
        | {
            /** @example "Error interno del servidor" */
            message?: string;
            /** @example 500 */
            statusCode?: number;
          }
      >({
        path: `/auth/restablecer-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  creditos = {
    /**
     * No description
     *
     * @tags Creditos
     * @name ComprarCreditos
     * @summary Comprar créditos
     * @request POST:/creditos/comprar
     */
    comprarCreditos: (
      data: {
        /** @example 10 */
        cantidad: number;
        /** @example "Tarjeta de crédito" */
        metodoPago: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "Créditos comprados exitosamente" */
          mensaje?: string;
          /** @example 10 */
          creditos?: number;
        },
        any
      >({
        path: `/creditos/comprar`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Creditos
     * @name UsarCredito
     * @summary Usar un crédito para un trabajador
     * @request POST:/creditos/usar
     * @secure
     */
    usarCredito: (trabajadorId: any, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Crédito usado exitosamente" */
          mensaje?: string;
        },
        any
      >({
        path: `/creditos/usar`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Creditos
     * @name ObtenerHistorial
     * @summary Obtener el historial de créditos del usuario autenticado
     * @request GET:/creditos/historial
     * @secure
     */
    obtenerHistorial: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example 10 */
          cantidad?: number;
          /**
           * @format date-time
           * @example "2025-05-06T12:00:00Z"
           */
          fecha?: string;
        }[],
        any
      >({
        path: `/creditos/historial`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Creditos
     * @name RegalarCreditos
     * @summary Regalar créditos a un usuario (solo para administradores)
     * @request POST:/creditos/regalo/{usuarioId}
     * @secure
     */
    regalarCreditos: (
      usuarioId: string,
      data: {
        /** @example 5 */
        cantidad: number;
        /** @example "Regalo de créditos por promoción" */
        descripcion: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "Créditos regalados exitosamente" */
          mensaje?: string;
        },
        any
      >({
        path: `/creditos/regalo/${usuarioId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Creditos
     * @name ObtenerHistorialGlobal
     * @summary Obtener historial global de créditos de todos los usuarios (solo administradores)
     * @request GET:/creditos/historial-global
     * @secure
     */
    obtenerHistorialGlobal: (
      query?: {
        /**
         * Número máximo de registros a devolver
         * @example 50
         */
        limite?: number;
        /** Orden de los resultados (ascendente o descendente por fecha) */
        orden?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "67890" */
          usuarioId?: string;
          /** @example 10 */
          cantidad?: number;
          /**
           * @format date-time
           * @example "2025-05-06T12:00:00Z"
           */
          fechaCreacion?: string;
          /** @example "Compra de 10 créditos" */
          descripcion?: string;
          /** @example "COMPRA" */
          tipo?: string;
        }[],
        any
      >({
        path: `/creditos/historial-global`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  valoraciones = {
    /**
     * No description
     *
     * @tags Valoraciones
     * @name CrearValoracion
     * @summary Crear una nueva valoración
     * @request POST:/valoraciones
     */
    crearValoracion: (
      data: {
        /** @example "12345" */
        trabajadorId: string;
        /** @example 4 */
        calificacion: number;
        /** @example "Excelente trabajo realizado." */
        comentario?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "67890" */
          id?: string;
          /** @example "12345" */
          trabajadorId?: string;
          /** @example 4 */
          calificacion?: number;
          /** @example "Excelente trabajo realizado." */
          comentario?: string;
        },
        any
      >({
        path: `/valoraciones`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Valoraciones
     * @name ObtenerTodasLasValoraciones
     * @summary Obtener todas las valoraciones (solo para administradores)
     * @request GET:/valoraciones
     * @secure
     */
    obtenerTodasLasValoraciones: (
      query?: {
        /**
         * Número máximo de valoraciones a devolver
         * @example 50
         */
        limite?: number;
        /** Orden de los resultados (ascendente o descendente por fecha) */
        orden?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "67890" */
          id?: string;
          /** @example "12345" */
          trabajadorId?: string;
          /** @example "54321" */
          clienteId?: string;
          /** @example 4 */
          calificacion?: number;
          /** @example "Excelente trabajo realizado." */
          comentario?: string;
          /**
           * @format date-time
           * @example "2025-05-20T14:30:00Z"
           */
          fechaCreacion?: string;
        }[],
        any
      >({
        path: `/valoraciones`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Valoraciones
     * @name ObtenerValoracionesPorTrabajador
     * @summary Obtener todas las valoraciones de un trabajador
     * @request GET:/valoraciones/trabajador/{trabajadorId}
     */
    obtenerValoracionesPorTrabajador: (
      trabajadorId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "67890" */
          id?: string;
          /** @example 4 */
          calificacion?: number;
          /** @example "Excelente trabajo realizado." */
          comentario?: string;
        }[],
        any
      >({
        path: `/valoraciones/trabajador/${trabajadorId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Valoraciones
     * @name ObtenerValoracionPorId
     * @summary Obtener una valoración por su ID
     * @request GET:/valoraciones/{valoracionId}
     */
    obtenerValoracionPorId: (
      valoracionId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "67890" */
          id?: string;
          /** @example "12345" */
          trabajadorId?: string;
          /** @example 4 */
          calificacion?: number;
          /** @example "Excelente trabajo realizado." */
          comentario?: string;
        },
        any
      >({
        path: `/valoraciones/${valoracionId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Valoraciones
     * @name ActualizarValoracion
     * @summary Actualizar una valoración (solo para administradores)
     * @request PATCH:/valoraciones/{valoracionId}
     * @secure
     */
    actualizarValoracion: (
      valoracionId: string,
      data: {
        /** @example 5 */
        calificacion?: number;
        /** @example "Trabajo excepcional." */
        comentario?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "67890" */
          id?: string;
          /** @example 5 */
          calificacion?: number;
          /** @example "Trabajo excepcional." */
          comentario?: string;
        },
        any
      >({
        path: `/valoraciones/${valoracionId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Valoraciones
     * @name EliminarValoracion
     * @summary Eliminar una valoración por ID (solo para administradores)
     * @request DELETE:/valoraciones/{valoracionId}
     * @secure
     */
    eliminarValoracion: (valoracionId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Valoración eliminada correctamente" */
          mensaje?: string;
        },
        any
      >({
        path: `/valoraciones/${valoracionId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Valoraciones
     * @name ObtenerPromedioCalificaciones
     * @summary Obtener el promedio de calificaciones de un trabajador
     * @request GET:/valoraciones/trabajador/{trabajadorId}/promedio
     */
    obtenerPromedioCalificaciones: (
      trabajadorId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example 4.5 */
          promedio?: number;
        },
        any
      >({
        path: `/valoraciones/trabajador/${trabajadorId}/promedio`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  servicios = {
    /**
     * No description
     *
     * @tags Servicios
     * @name CrearServicio
     * @summary Crear un nuevo servicio (Solo administradores)
     * @request POST:/servicios
     * @secure
     */
    crearServicio: (
      data: {
        /** @example "Desarrollo Web" */
        titulo: string;
        /** @example "Creación de sitios web modernos y responsivos." */
        descripcion: string;
        /** @example "abc123" */
        categoriaId: string;
        /** @example 150 */
        precio?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "admin_id" */
          usuarioId?: string;
          /** @example "Desarrollo Web" */
          titulo?: string;
          /** @example "Creación de sitios web modernos y responsivos." */
          descripcion?: string;
          /** @example "abc123" */
          categoriaId?: string;
          /** @example 150 */
          precio?: number;
          /** @example "activo" */
          estado?: string;
          /** @example "catalogo" */
          tipo?: string;
          /** @example "2025-06-26T10:00:00Z" */
          fechaCreacion?: string;
          /** @example "2025-06-26T10:00:00Z" */
          fechaActualizacion?: string;
        },
        any
      >({
        path: `/servicios`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name ObtenerServicios
     * @summary Obtener todos los servicios del catálogo  (Solo administradores)
     * @request GET:/servicios
     * @secure
     */
    obtenerServicios: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "Desarrollo Web" */
          titulo?: string;
          /** @example "Creación de sitios web modernos y responsivos." */
          descripcion?: string;
          /** @example "Tecnología" */
          categoria?: string;
          /** @example 150 */
          precio?: number;
          /** @example "activo" */
          estado?: string;
          /** @example "catalogo" */
          tipo?: string;
        }[],
        any
      >({
        path: `/servicios`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name ObtenerServiciosPendientes
     * @summary Ver solicitudes pendientes de aprobación (Solo administradores)
     * @request GET:/servicios/pendientes
     * @secure
     */
    obtenerServiciosPendientes: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "sol123" */
          id?: string;
          /** @example "user_id" */
          usuarioId?: string;
          /** @example "Clases de Piano Online" */
          titulo?: string;
          /** @example "Necesito un instructor..." */
          descripcion?: string;
          /** @example "Educación" */
          categoria?: string;
          /** @example "pendiente" */
          estado?: string;
          /** @example "solicitud" */
          tipo?: string;
          /** @example "2025-06-26T10:00:00Z" */
          fechaCreacion?: string;
        }[],
        any
      >({
        path: `/servicios/pendientes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name GestionarSolicitud
     * @summary Aprobar o rechazar solicitud de servicio (Solo administradores)
     * @request PATCH:/servicios/gestionar/{id}
     * @secure
     */
    gestionarSolicitud: (
      id: string,
      data: {
        /** @example "rechazado" */
        accion: "aprobado" | "rechazado";
        /**
         * Requerido solo para rechazos
         * @example "No cumple con los estándares de calidad requeridos"
         */
        motivo?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "sol123" */
          id?: string;
          /** @example "aprobado" */
          estado?: string;
          /** @example "admin_id" */
          aprobadoPor?: string;
          /** @example "2025-06-26T12:00:00Z" */
          fechaAprobacion?: string;
          /** @example "Motivo del rechazo si aplica" */
          motivoRechazo?: string;
        },
        any
      >({
        path: `/servicios/gestionar/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name ObternerServiciosActivos
     * @summary Obtener todos los servicios activos del catálogo
     * @request GET:/servicios/activos
     * @secure
     */
    obternerServiciosActivos: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "Desarrollo Web" */
          titulo?: string;
          /** @example "Creación de sitios web modernos y responsivos." */
          descripcion?: string;
          /** @example "Tecnología" */
          categoria?: string;
          /** @example 150 */
          precio?: number;
          /** @example "activo" */
          estado?: string;
          /** @example "catalogo" */
          tipo?: string;
        }[],
        any
      >({
        path: `/servicios/activos`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name SolicitarServicio
     * @summary Solicitar un nuevo servicio
     * @request POST:/servicios/solicitar
     * @secure
     */
    solicitarServicio: (
      data: {
        /** @example "Clases de Piano Online" */
        titulo: string;
        /** @example "Necesito un instructor de piano que dé clases virtuales para principiantes" */
        descripcion: string;
        /** @example "educacion_id" */
        categoriaId: string;
        /** @example 30 */
        precio?: number;
        /** @example "No encuentro este servicio en el catálogo y lo necesito urgentemente" */
        justificacion?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "sol123" */
          id?: string;
          /** @example "user_id" */
          usuarioId?: string;
          /** @example "Clases de Piano Online" */
          titulo?: string;
          /** @example "Necesito un instructor..." */
          descripcion?: string;
          /** @example "pendiente" */
          estado?: string;
          /** @example "solicitud" */
          tipo?: string;
        },
        any
      >({
        path: `/servicios/solicitar`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name ObtenerMisSolicitudes
     * @summary Ver mis solicitudes de servicios (Usuario autenticado)
     * @request GET:/servicios/mis-servicios
     * @secure
     */
    obtenerMisSolicitudes: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "sol123" */
          id?: string;
          /** @example "Clases de Piano Online" */
          titulo?: string;
          /** @example "pendiente" */
          estado?: string;
          /** @example "solicitud" */
          tipo?: string;
          /** @example "2025-06-26T10:00:00Z" */
          fechaCreacion?: string;
          /** @example "No cumple estándares" */
          motivoRechazo?: string;
        }[],
        any
      >({
        path: `/servicios/mis-servicios`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name ObtenerServicioPorId
     * @summary Obtener un servicio específico por ID
     * @request GET:/servicios/{id}
     * @secure
     */
    obtenerServicioPorId: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "Desarrollo Web" */
          titulo?: string;
          /** @example "Creación de sitios web modernos y responsivos." */
          descripcion?: string;
          /** @example "Tecnología" */
          categoria?: string;
          /** @example 150 */
          precio?: number;
          /** @example "activo" */
          estado?: string;
          /** @example "catalogo" */
          tipo?: string;
        },
        any
      >({
        path: `/servicios/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name ActualizarServicio
     * @summary Actualizar un servicio del catálogo (Solo administradores)
     * @request PATCH:/servicios/{id}
     * @secure
     */
    actualizarServicio: (
      id: string,
      data: {
        /** @example "Desarrollo Web Avanzado" */
        titulo?: string;
        /** @example "Actualización de sitios web existentes con nuevas tecnologías." */
        descripcion?: string;
        /** @example "abc123" */
        categoriaId?: string;
        /** @example 200 */
        precio?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "12345" */
          id?: string;
          /** @example "Desarrollo Web Avanzado" */
          titulo?: string;
          /** @example "Actualización de sitios web..." */
          descripcion?: string;
          /** @example "Tecnología" */
          categoria?: string;
          /** @example 200 */
          precio?: number;
          /** @example "2025-06-26T12:00:00Z" */
          fechaActualizacion?: string;
        },
        any
      >({
        path: `/servicios/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name EliminarServicioPermanente
     * @summary Eliminar permanentemente un servicio (Solo administradores)
     * @request DELETE:/servicios/{id}
     * @secure
     */
    eliminarServicioPermanente: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Servicio eliminado permanentemente." */
          mensaje?: string;
        },
        any
      >({
        path: `/servicios/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name DesactivarServicio
     * @summary Desactivar un servicio del catálogo (Solo administradores)
     * @request PATCH:/servicios/{id}/desactivar
     * @secure
     */
    desactivarServicio: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Servicio desactivado satisfactoriamente." */
          mensaje?: string;
        },
        any
      >({
        path: `/servicios/${id}/desactivar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Servicios
     * @name ActivarServicio
     * @summary Activar un servicio desactivado (Solo administradores)
     * @request PATCH:/servicios/{id}/activar
     * @secure
     */
    activarServicio: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Servicio activado satisfactoriamente." */
          mensaje?: string;
        },
        any
      >({
        path: `/servicios/${id}/activar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  notificaciones = {
    /**
     * No description
     *
     * @tags Notificaciones
     * @name CrearNotificacion
     * @summary Crear una notificación (requiere autenticación)
     * @request POST:/notificaciones
     * @secure
     */
    crearNotificacion: (
      data: {
        /** @example "user123" */
        usuarioId: string;
        /** @example "Nuevo servicio disponible" */
        titulo: string;
        /** @example "Se ha publicado un nuevo servicio." */
        mensaje: string;
        /** @example "servicio" */
        tipo?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "notif123" */
          id?: string;
          /** @example "user123" */
          usuarioId?: string;
          /** @example "Nuevo servicio disponible" */
          titulo?: string;
          /** @example "Se ha publicado un nuevo servicio." */
          mensaje?: string;
          /** @example "servicio" */
          tipo?: string;
          /** @example false */
          leida?: boolean;
          /** @format date-time */
          fechaCreacion?: string;
        },
        void
      >({
        path: `/notificaciones`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notificaciones
     * @name ObtenerNotificaciones
     * @summary Obtener todas las notificaciones del usuario autenticado
     * @request GET:/notificaciones
     * @secure
     */
    obtenerNotificaciones: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "notif123" */
          id?: string;
          /** @example "user123" */
          usuarioId?: string;
          /** @example "Nuevo servicio disponible" */
          titulo?: string;
          /** @example "Se ha publicado un nuevo servicio." */
          mensaje?: string;
          /** @example "servicio" */
          tipo?: string;
          /** @example false */
          leida?: boolean;
          /** @format date-time */
          fechaCreacion?: string;
        }[],
        void
      >({
        path: `/notificaciones`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notificaciones
     * @name MarcarNotificacionComoLeida
     * @summary Marcar una notificación como leída
     * @request PATCH:/notificaciones/{id}/leida
     * @secure
     */
    marcarNotificacionComoLeida: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Notificación marcada como leída" */
          mensaje?: string;
        },
        void
      >({
        path: `/notificaciones/${id}/leida`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Envía una notificación push y la registra para todos los usuarios que el usuario autenticado tiene como favoritos.
     *
     * @tags Notificaciones
     * @name NotificarAFavoritos
     * @summary Enviar una notificación a todos los usuarios favoritos
     * @request POST:/notificaciones/favoritos
     * @secure
     */
    notificarAFavoritos: (
      data: {
        /** @example "¡Nueva oferta!" */
        titulo: string;
        /** @example "Hay una nueva oferta disponible para ti." */
        mensaje: string;
        /** @example "oferta" */
        tipo?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "Notificaciones enviadas correctamente a tus usuarios favoritos" */
          mensaje?: string;
          notificaciones?: {
            /** @example "notif123" */
            id?: string;
            /** @example "userFav123" */
            usuarioId?: string;
            /** @example "¡Nueva oferta!" */
            titulo?: string;
            /** @example "Hay una nueva oferta disponible para ti." */
            mensaje?: string;
            /** @example "oferta" */
            tipo?: string;
            /** @example false */
            leida?: boolean;
            /** @format date-time */
            fechaCreacion?: string;
          }[];
        },
        void
      >({
        path: `/notificaciones/favoritos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  favoritos = {
    /**
     * No description
     *
     * @tags Favoritos
     * @name AgregarFavorito
     * @summary Agregar un usuario a favoritos
     * @request POST:/favoritos
     */
    agregarFavorito: (
      data: {
        /** @example "usuario123" */
        favoritoId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "fav1" */
          id?: string;
          /** @example "miUsuario" */
          usuarioId?: string;
          /** @example "usuario123" */
          favoritoId?: string;
          /** @format date-time */
          fechaCreacion?: string;
        },
        void
      >({
        path: `/favoritos`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favoritos
     * @name ObtenerFavoritos
     * @summary Obtener la lista de favoritos del usuario autenticado
     * @request GET:/favoritos
     */
    obtenerFavoritos: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "fav1" */
          id?: string;
          /** @example "miUsuario" */
          usuarioId?: string;
          /** @example "usuario123" */
          favoritoId?: string;
          /** @format date-time */
          fechaCreacion?: string;
        }[],
        any
      >({
        path: `/favoritos`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favoritos
     * @name ObtenerFavoritoId
     * @summary Obtener la información de un usuario favorito específico
     * @request GET:/favoritos/{favoritoId}
     */
    obtenerFavoritoId: (favoritoId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "fav1" */
          id?: string;
          /** @example "miUsuario" */
          usuarioId?: string;
          /** @example "usuario123" */
          favoritoId?: string;
          /** @format date-time */
          fechaCreacion?: string;
          usuario?: {
            /** @example "usuario123" */
            id?: string;
            /** @example "Juan Pérez" */
            nombreCompleto?: string;
            /** @example "juan@example.com" */
            email?: string;
            /** @example "https://..." */
            urlFoto?: string;
          };
        },
        void
      >({
        path: `/favoritos/${favoritoId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favoritos
     * @name EliminarFavorito
     * @summary Eliminar un usuario de favoritos
     * @request DELETE:/favoritos/{favoritoId}
     */
    eliminarFavorito: (favoritoId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Favorito eliminado correctamente" */
          mensaje?: string;
        },
        void
      >({
        path: `/favoritos/${favoritoId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  categorias = {
    /**
     * No description
     *
     * @tags Categorias
     * @name CrearCategoria
     * @summary Crear una nueva categoría (solo administradores)
     * @request POST:/categorias
     * @secure
     */
    crearCategoria: (
      data: {
        /** @example "Plomería" */
        nombre: string;
        /** @example "Servicios de plomería para el hogar" */
        descripcion?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "abc123" */
          id?: string;
          /** @example "Plomería" */
          nombre?: string;
          /** @example "Servicios de plomería para el hogar" */
          descripcion?: string;
          /** @format date-time */
          fechaCreacion?: string;
          /** @format date-time */
          fechaActualizacion?: string;
          /** @example true */
          activa?: boolean;
        },
        void
      >({
        path: `/categorias`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categorias
     * @name ObtenerCategorias
     * @summary Obtener todas las categorías activas
     * @request GET:/categorias
     */
    obtenerCategorias: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "abc123" */
          id?: string;
          /** @example "Plomería" */
          nombre?: string;
          /** @example "Servicios de plomería para el hogar" */
          descripcion?: string;
          /** @format date-time */
          fechaCreacion?: string;
          /** @format date-time */
          fechaActualizacion?: string;
          /** @example true */
          activa?: boolean;
        }[],
        any
      >({
        path: `/categorias`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Solo para administradores - Devuelve todas las categorías sin importar su estado
     *
     * @tags Categorias
     * @name ObtenerTodasCategorias
     * @summary Obtener todas las categorías (activas e inactivas solo administradores)
     * @request GET:/categorias/todas
     * @secure
     */
    obtenerTodasCategorias: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "abc123" */
          id?: string;
          /** @example "Plomería" */
          nombre?: string;
          /** @example "Servicios de plomería para el hogar" */
          descripcion?: string;
          /** @format date-time */
          fechaCreacion?: string;
          /** @format date-time */
          fechaActualizacion?: string;
          /**
           * Indica si la categoría está activa o no
           * @example true
           */
          activa?: boolean;
        }[],
        void
      >({
        path: `/categorias/todas`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categorias
     * @name ObtenerCategoriaPorId
     * @summary Obtener una categoría por ID
     * @request GET:/categorias/{id}
     */
    obtenerCategoriaPorId: (
      id: string,
      categoriaId: any,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "abc123" */
          id?: string;
          /** @example "Plomería" */
          nombre?: string;
          /** @example "Servicios de plomería para el hogar" */
          descripcion?: string;
          /** @format date-time */
          fechaCreacion?: string;
          /** @format date-time */
          fechaActualizacion?: string;
          /** @example true */
          activa?: boolean;
        },
        void
      >({
        path: `/categorias/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categorias
     * @name ActualizarCategoria
     * @summary Actualizar una categoría por ID (solo administradores)
     * @request PATCH:/categorias/{id}
     * @secure
     */
    actualizarCategoria: (
      id: string,
      data: {
        /** @example "Plomería actualizada" */
        nombre?: string;
        /** @example "Descripción actualizada" */
        descripcion?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "abc123" */
          id?: string;
          /** @example "Plomería actualizada" */
          nombre?: string;
          /** @example "Descripción actualizada" */
          descripcion?: string;
          /** @format date-time */
          fechaCreacion?: string;
          /** @format date-time */
          fechaActualizacion?: string;
          /** @example true */
          activa?: boolean;
        },
        void
      >({
        path: `/categorias/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categorias
     * @name ActivarCategoria
     * @summary Activar una categoría por ID (solo administradores)
     * @request PATCH:/categorias/{id}/activar
     * @secure
     */
    activarCategoria: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Categoría activada correctamente" */
          mensaje?: string;
        },
        void
      >({
        path: `/categorias/${id}/activar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categorias
     * @name DesactivarCategoria
     * @summary Desactivar una categoría por ID (solo administradores)
     * @request PATCH:/categorias/{id}/desactivar
     * @secure
     */
    desactivarCategoria: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Categoría desactivada con éxito." */
          mensaje?: string;
          categoria?: {
            /** @example "abc123" */
            id?: string;
            /** @example "Plomería" */
            nombre?: string;
            /** @example false */
            activa?: boolean;
          };
        },
        void
      >({
        path: `/categorias/${id}/desactivar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  ofertas = {
    /**
     * @description Permite al usuario crear una oferta basada en un servicio del catálogo. El usuario puede personalizar precio, horarios y ubicación.
     *
     * @tags Ofertas
     * @name CrearOferta
     * @summary Crear oferta de servicio
     * @request POST:/ofertas
     * @secure
     */
    crearOferta: (
      data: {
        /**
         * ID del servicio del catálogo que se quiere ofertar
         * @example "servicio123"
         */
        servicioId: string;
        /**
         * Precio personalizado (opcional)
         * @example 120
         */
        precioPersonalizado?: number;
        /**
         * Descripción adicional del oferente
         * @example "Con 5 años de experiencia en desarrollo web moderno"
         */
        descripcionPersonalizada?: string;
        disponibilidad: {
          /**
           * Días de la semana disponibles
           * @example ["lunes","martes","miércoles","jueves","viernes"]
           */
          diasSemana: string[];
          /**
           * Hora de inicio en formato HH:mm
           * @example "09:00"
           */
          horaInicio: string;
          /**
           * Hora de fin en formato HH:mm
           * @example "18:00"
           */
          horaFin: string;
        };
        ubicacion?: {
          /**
           * Ciudad donde se ofrece el servicio
           * @example "Madrid"
           */
          ciudad: string;
          /**
           * Dirección específica (opcional)
           * @example "Calle Principal 123"
           */
          direccion?: string;
          /**
           * Modalidad de prestación del servicio
           * @example "ambas"
           */
          modalidad: "presencial" | "virtual" | "ambas";
        };
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "oferta123" */
          id?: string;
          /** @example "user456" */
          usuarioId?: string;
          /** @example "servicio123" */
          servicioId?: string;
          /** @example 120 */
          precioPersonalizado?: number;
          /** @example "Con 5 años de experiencia..." */
          descripcionPersonalizada?: string;
          disponibilidad?: {
            /** @example ["lunes","martes","miércoles"] */
            diasSemana?: string[];
            /** @example "09:00" */
            horaInicio?: string;
            /** @example "18:00" */
            horaFin?: string;
          };
          ubicacion?: {
            /** @example "Madrid" */
            ciudad?: string;
            /** @example "ambas" */
            modalidad?: string;
          };
          /** @example "activa" */
          estado?: string;
          /** @example "2025-07-02T10:00:00Z" */
          fechaCreacion?: string;
          /** Datos del servicio del catálogo */
          servicio?: {
            /** @example "servicio123" */
            id?: string;
            /** @example "Desarrollo Web" */
            titulo?: string;
            /** @example "Creación de sitios web..." */
            descripcion?: string;
            /** @example "Tecnología" */
            categoria?: string;
            /** @example 150 */
            precio?: number;
          };
        },
        any
      >({
        path: `/ofertas`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene todas las ofertas de servicios creadas por el usuario autenticado, incluyendo activas, pausadas e inactivas.
     *
     * @tags Ofertas
     * @name ObtenerMisOfertas
     * @summary Obtener mis ofertas de servicios
     * @request GET:/ofertas/mis-ofertas
     * @secure
     */
    obtenerMisOfertas: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "oferta123" */
          id?: string;
          /** @example "servicio123" */
          servicioId?: string;
          /** @example 120 */
          precioPersonalizado?: number;
          /** @example "Con 5 años de experiencia..." */
          descripcionPersonalizada?: string;
          disponibilidad?: {
            /** @example ["lunes","martes"] */
            diasSemana?: string[];
            /** @example "09:00" */
            horaInicio?: string;
            /** @example "18:00" */
            horaFin?: string;
          };
          ubicacion?: {
            /** @example "Madrid" */
            ciudad?: string;
            /** @example "virtual" */
            modalidad?: string;
          };
          /** @example "activa" */
          estado?: string;
          /** @example "2025-07-02T10:00:00Z" */
          fechaCreacion?: string;
          /** Información del servicio del catálogo */
          servicio?: {
            /** @example "Desarrollo Web" */
            titulo?: string;
            /** @example "Tecnología" */
            categoria?: string;
            /** @example 150 */
            precio?: number;
          };
        }[],
        any
      >({
        path: `/ofertas/mis-ofertas`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene todas las ofertas activas disponibles para un servicio específico del catálogo.
     *
     * @tags Ofertas
     * @name ObtenerOfertasPorServicio
     * @summary Obtener ofertas disponibles para un servicio específico
     * @request GET:/ofertas/servicio/{servicioId}
     * @secure
     */
    obtenerOfertasPorServicio: (
      servicioId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "oferta123" */
          id?: string;
          /** @example "user456" */
          usuarioId?: string;
          /** @example 120 */
          precioPersonalizado?: number;
          /** @example "Especialista con 5 años de experiencia" */
          descripcionPersonalizada?: string;
          disponibilidad?: {
            /** @example ["lunes","miércoles","viernes"] */
            diasSemana?: string[];
            /** @example "10:00" */
            horaInicio?: string;
            /** @example "16:00" */
            horaFin?: string;
          };
          ubicacion?: {
            /** @example "Barcelona" */
            ciudad?: string;
            /** @example "presencial" */
            modalidad?: string;
          };
          /** @example "activa" */
          estado?: string;
          /** @example "2025-07-02T08:30:00Z" */
          fechaCreacion?: string;
          servicio?: {
            /** @example "Desarrollo Web" */
            titulo?: string;
            /** @example "Creación de sitios web..." */
            descripcion?: string;
            /** @example "Tecnología" */
            categoria?: string;
          };
        }[],
        any
      >({
        path: `/ofertas/servicio/${servicioId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtiene los detalles completos de una oferta específica por su ID.
     *
     * @tags Ofertas
     * @name ObtenerOfertaPorId
     * @summary Obtener una oferta específica por ID
     * @request GET:/ofertas/{id}
     * @secure
     */
    obtenerOfertaPorId: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "oferta123" */
          id?: string;
          /** @example "user456" */
          usuarioId?: string;
          /** @example "servicio123" */
          servicioId?: string;
          /** @example 120 */
          precioPersonalizado?: number;
          /** @example "Desarrollador full-stack con amplia experiencia" */
          descripcionPersonalizada?: string;
          disponibilidad?: {
            /** @example ["lunes","martes","miércoles","jueves"] */
            diasSemana?: string[];
            /** @example "09:00" */
            horaInicio?: string;
            /** @example "17:00" */
            horaFin?: string;
          };
          ubicacion?: {
            /** @example "Madrid" */
            ciudad?: string;
            /** @example "Zona Centro" */
            direccion?: string;
            /** @example "ambas" */
            modalidad?: string;
          };
          /** @example "activa" */
          estado?: string;
          /** @example "2025-07-01T10:00:00Z" */
          fechaCreacion?: string;
          /** @example "2025-07-02T14:30:00Z" */
          fechaActualizacion?: string;
          /** @example "2025-07-01T00:00:00Z" */
          fechaInicioOferta?: string;
          /** @example "2025-12-31T23:59:59Z" */
          fechaFinOferta?: string;
          servicio?: {
            /** @example "servicio123" */
            id?: string;
            /** @example "Desarrollo Web" */
            titulo?: string;
            /** @example "Creación de sitios web modernos" */
            descripcion?: string;
            /** @example "Tecnología" */
            categoria?: string;
            /** @example 150 */
            precio?: number;
          };
        },
        any
      >({
        path: `/ofertas/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Permite al usuario actualizar los datos de su oferta. Solo el propietario puede modificar la oferta.
     *
     * @tags Ofertas
     * @name ActualizarOferta
     * @summary Actualizar una oferta de servicio
     * @request PATCH:/ofertas/{id}
     * @secure
     */
    actualizarOferta: (
      id: string,
      data: {
        /**
         * Nuevo precio personalizado
         * @example 130
         */
        precioPersonalizado?: number;
        /**
         * Nueva descripción personalizada
         * @example "Actualizada: Desarrollador senior con 7 años de experiencia"
         */
        descripcionPersonalizada?: string;
        disponibilidad?: {
          /**
           * Nuevos días disponibles
           * @example ["lunes","miércoles","viernes"]
           */
          diasSemana?: string[];
          /**
           * Nueva hora de inicio
           * @example "10:00"
           */
          horaInicio?: string;
          /**
           * Nueva hora de fin
           * @example "16:00"
           */
          horaFin?: string;
        };
        ubicacion?: {
          /**
           * Nueva ciudad
           * @example "Barcelona"
           */
          ciudad?: string;
          /**
           * Nueva dirección
           * @example "Nueva dirección específica"
           */
          direccion?: string;
          /**
           * Nueva modalidad
           * @example "virtual"
           */
          modalidad?: "presencial" | "virtual" | "ambas";
        };
        /**
         * Nueva fecha de fin de la oferta
         * @format date
         * @example "2026-06-30"
         */
        fechaFinOferta?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "oferta123" */
          id?: string;
          /** @example 130 */
          precioPersonalizado?: number;
          /** @example "Actualizada: Desarrollador senior..." */
          descripcionPersonalizada?: string;
          /** @example "2025-07-02T15:30:00Z" */
          fechaActualizacion?: string;
        },
        any
      >({
        path: `/ofertas/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Elimina permanentemente una oferta de servicio. Esta acción no se puede deshacer.
     *
     * @tags Ofertas
     * @name EliminarOferta
     * @summary Eliminar oferta de servicio permanentemente
     * @request DELETE:/ofertas/{id}
     * @secure
     */
    eliminarOferta: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Oferta eliminada correctamente" */
          mensaje?: string;
        },
        any
      >({
        path: `/ofertas/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Pausa temporalmente una oferta de servicio del usuario. La oferta no será visible para otros usuarios hasta que se reactive.
     *
     * @tags Ofertas
     * @name PausarOferta
     * @summary Pausar oferta de servicio
     * @request PATCH:/ofertas/{id}/pausar
     * @secure
     */
    pausarOferta: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Oferta pausada correctamente" */
          mensaje?: string;
        },
        any
      >({
        path: `/ofertas/${id}/pausar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Reactiva una oferta de servicio que había sido pausada. La oferta volverá a ser visible para otros usuarios.
     *
     * @tags Ofertas
     * @name ActivarOferta
     * @summary Activar oferta de servicio pausada
     * @request PATCH:/ofertas/{id}/activar
     * @secure
     */
    activarOferta: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Oferta activada correctamente" */
          mensaje?: string;
        },
        any
      >({
        path: `/ofertas/${id}/activar`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
