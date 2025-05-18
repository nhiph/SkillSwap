// import { Stack } from "@mui/material";
// import { useThemeStore } from "../contexts/mode";
import { type ReactNode, useEffect } from "react";
import Header from "../components/common/Header";
// import Footer from "../components/common/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const MasterLayout = ({ children }: { children: ReactNode }) => {
  // const { mode } = useThemeStore();
  // const isDarkMode: boolean = mode === "dark";
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MasterLayout;
