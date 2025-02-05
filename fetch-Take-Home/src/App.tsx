import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Navbar } from "./components/layout/Navbar";
import { theme } from "./theme";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./pages/login/LoginPage";
import { DogsHomePage } from "./pages/home/DogsHome";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/search" element={<DogsHomePage />} /> */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/search" element={<DogsHomePage />} />
                  </Routes>
                </>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
