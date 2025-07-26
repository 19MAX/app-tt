import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Api } from "../../core/api/client/Api";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Configuración de la API
const api = new Api({
  securityWorker: (token) =>
    token ? { headers: { Authorization: `Bearer ${token}` } } : {},
});

// Tipos mejorados
interface User {
  id: string;
  email: string;
  nombreCompleto?: string;
  urlFoto?: string;
  numeroContacto?: string;
  // Agrega otros campos según tu API
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  initializing: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  // Refs para evitar múltiples llamadas
  const isFetchingProfile = useRef(false);
  const isRefreshing = useRef(false);

  // Función para limpiar el estado
  const clearAuthState = useCallback(async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    setToken(null);
    setUser(null);
    api.setSecurityData(null);
  }, []);

  // Función para refrescar token
  const refreshToken = useCallback(async (): Promise<boolean> => {
    if (isRefreshing.current) return false;

    try {
      isRefreshing.current = true;
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        await clearAuthState();
        return false;
      }

      // Aquí deberías llamar a tu endpoint de refresh token
      // const { data } = await api.auth.refreshToken({ refreshToken });
      //
      // Por ahora, simulamos que no tienes refresh token
      await clearAuthState();
      return false;
    } catch (error) {
      console.error("[Auth] Error refreshing token:", error);
      await clearAuthState();
      return false;
    } finally {
      isRefreshing.current = false;
    }
  }, [clearAuthState]);

  // Función para obtener perfil del usuario
  const fetchUserProfile = useCallback(
    async (authToken: string): Promise<boolean> => {
      if (isFetchingProfile.current) return false;

      try {
        isFetchingProfile.current = true;
        api.setSecurityData(authToken);

        const { data } = await api.auth.obtenerPerfilUsuario();
        // Normaliza el usuario para cumplir con la interfaz User
        const user: User = {
          id: typeof data.id === 'string' ? data.id : '',
          email: typeof data.email === 'string' ? data.email : '',
          nombreCompleto: 'nombreCompleto' in data && typeof data.nombreCompleto === 'string' ? data.nombreCompleto : undefined,
          urlFoto: 'urlFoto' in data && typeof data.urlFoto === 'string' ? data.urlFoto : undefined,
          numeroContacto: 'numeroContacto' in data && typeof data.numeroContacto === 'string' ? data.numeroContacto : undefined,
        };
        setUser(user);
        return true;
      } catch (error: any) {
        console.error("[Auth] Error fetching profile:", error);

        // Si el token está expirado, intentar refrescar
        if (error?.response?.status === 401) {
          const refreshed = await refreshToken();
          if (!refreshed) {
            await clearAuthState();
          }
          return refreshed;
        }

        await clearAuthState();
        return false;
      } finally {
        isFetchingProfile.current = false;
      }
    },
    [refreshToken, clearAuthState]
  );

  // Inicialización de la app
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setInitializing(true);
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (storedToken) {
          setToken(storedToken);
          const success = await fetchUserProfile(storedToken);

          if (!success) {
            // Si falla, limpiamos todo
            await clearAuthState();
          }
        } else {
          // No hay token, limpiar estado
          await clearAuthState();
        }
      } catch (error) {
        console.error("[Auth] Initialization error:", error);
        await clearAuthState();
      } finally {
        setInitializing(false);
      }
    };

    initializeAuth();
  }, []); // Solo se ejecuta una vez al montar

  // Login
  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const { data } = await api.auth.loginUsuario({ email, password });

        if (data?.accessToken) {
          // Guardar tokens
          await SecureStore.setItemAsync(TOKEN_KEY, data.accessToken);

          setToken(data.accessToken);
          api.setSecurityData(data.accessToken);

          // Si viene el usuario en la respuesta, usarlo
          if (data.user) {
            // Normaliza el usuario para cumplir con la interfaz User
            const user: User = {
              id: typeof data.user.id === 'string' ? data.user.id : '',
              email: typeof data.user.email === 'string' ? data.user.email : '',
              nombreCompleto: 'nombreCompleto' in data.user && typeof data.user.nombreCompleto === 'string' ? data.user.nombreCompleto : undefined,
              urlFoto: 'urlFoto' in data.user && typeof data.user.urlFoto === 'string' ? data.user.urlFoto : undefined,
              numeroContacto: 'numeroContacto' in data.user && typeof data.user.numeroContacto === 'string' ? data.user.numeroContacto : undefined,
            };
            setUser(user);
          } else {
            // Si no, hacer fetch del perfil
            await fetchUserProfile(data.accessToken);
          }

          return { success: true };
        }

        return { success: false, error: "Credenciales inválidas" };
      } catch (error: any) {
        console.error("[Auth] Login error:", error);

        let errorMessage = "Error de conexión";
        if (error?.response?.data?.message) {
          errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message.join(", ")
            : error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [fetchUserProfile]
  );

  // Logout
  const logout = useCallback(async () => {
    setLoading(true);

    try {
      // Opcional: llamar al endpoint de logout en el servidor
      // await api.auth.logout();

      await clearAuthState();
    } catch (error) {
      console.error("[Auth] Logout error:", error);
      // Aunque falle, limpiamos el estado local
      await clearAuthState();
    } finally {
      setLoading(false);
    }
  }, [clearAuthState]);

  const contextValue: AuthContextType = {
    user,
    token,
    initializing,
    loading,
    login,
    logout,
    setUser,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
