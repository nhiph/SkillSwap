import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as authService from "../services/authService";
import { type LoginData, type User } from "../types/AuthInfo";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user?.id;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    if (currentPath === "/") {
      navigate("/dashboard");
    } else if (currentPath !== "/") {
      navigate(currentPath);
    }
  }, [isAuthenticated]);

  const login = async (value: LoginData) => {
    try {
      const response = await authService.login(value);
      await localStorage.setItem("token", response.token);
      fetchProfile();
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
    await authService.logout();
    setUser(null);
  };

  const register = async () => {
    await authService.register();
  };

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
