// import { Stack } from "@mui/material";
// import { useThemeStore } from "../contexts/mode";
import { type ReactNode } from "react";
import Header from "../components/common/Header";
// import Footer from "../components/common/Footer";

const MasterLayout = ({ children }: { children: ReactNode }) => {
  // const { mode } = useThemeStore();
  // const isDarkMode: boolean = mode === "dark";

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MasterLayout;
