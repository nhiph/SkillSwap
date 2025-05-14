import { useEffect } from "react";
import "./App.css";
import "./index.css";
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import { useThemeStore, type ThemeMode } from "./contexts/mode";
import { AuthProvider } from "./contexts/authContext";
import { SearchProvider } from "./contexts/searchContext";

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
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <AuthProvider>
          <SearchProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-detail/:userId" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
