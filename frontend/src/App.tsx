import { useEffect } from "react";
import "./App.css";
import "./index.css";
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import { useThemeStore, type ThemeMode } from "./contexts/mode";
import { SearchProvider } from "./contexts/searchContext";
import ActivationToken from "./pages/ActivationToken";

function App() {
  const { mode, setMode } = useThemeStore();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    let firstMode: ThemeMode = prefersDarkMode ? "dark" : "light";
    setMode(firstMode);
  }, []);

  const appTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-detail/:userId" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activate/:activationToken" element={<ActivationToken />} />
        </Routes>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
