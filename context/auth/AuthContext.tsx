import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Api } from "../../core/api/client/Api"; // Ajusta el path si es necesario

const TOKEN_KEY = "accessToken";

const api = new Api({
  // El securityWorker añade el token a las peticiones seguras
  securityWorker: (token) =>
    token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {},
});

// Defino el tipo del contexto
interface AuthContextType {
  user: any;
  token: string | null;
  initializing: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFetchingProfile = useRef(false);

  // Cargar token y perfil al iniciar la app
  useEffect(() => {
    (async () => {
      setInitializing(true);
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
        api.setSecurityData(storedToken);
        if (!user && !isFetchingProfile.current) {
          isFetchingProfile.current = true;
          try {
            const { data } = await api.auth.obtenerPerfilUsuario();
            setUser(data);
          } catch (e) {
            setUser(null);
            setToken(null);
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            api.setSecurityData(null);
          } finally {
            isFetchingProfile.current = false;
          }
        }
      } else {
        setUser(null);
        setToken(null);
        api.setSecurityData(null);
      }
      setInitializing(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.auth.loginUsuario({ email, password });
      if (data?.accessToken) {
        await SecureStore.setItemAsync(TOKEN_KEY, data.accessToken);
        setToken(data.accessToken);
        api.setSecurityData(data.accessToken);
        setUser(data.user);
        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false, error: "Credenciales inválidas" };
    } catch (error: any) {
      setLoading(false);
      return { success: false, error: error?.response?.data?.message || "Error de login" };
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
    setUser(null);
    api.setSecurityData(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, initializing, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);