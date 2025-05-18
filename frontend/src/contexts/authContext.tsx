import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as authService from "../services/authService";
import { type AuthFormData, type User } from "../types/AuthInfo";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: AuthFormData) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: AuthFormData) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user?.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) return; // Wait for profile to load before doing anything
  
    const currentPath = location.pathname;
  
    if (!isAuthenticated) {
      if (currentPath !== "/") navigate("/");
      return;
    }
  
    // Only redirect if user lands on root path
    if (currentPath === "/") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading]);

  const login = async (value: AuthFormData) => {
    try {
      const response = await authService.login(value);
      await localStorage.setItem("token", response.token);
      fetchProfile();
      navigate("/dashboard");
    } catch (err) {
      console.log("login err", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const userInfo = await authService.fetchProfile();
      setUser(userInfo.me);
    } catch (err) {
      console.log("err", err);
    }
  };

  const logout = async () => {
    localStorage.clear();
    setUser(null);
  };

  const register = async (value: AuthFormData) => {
    await authService.register(value);
  };

  if (loading) return null;
  
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Must use inside AuthProvider");
  return context;
};
