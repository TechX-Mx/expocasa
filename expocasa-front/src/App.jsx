import { createBrowserRouter, Route, RouterProvider, Routes, } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "./layout/Header/Header";
import { Footer } from "./layout/Footer/Footer";
import { Register } from "./pages/Register/Register";
import { Admin } from "./pages/Admin/Admin";
import { Login } from "./pages/Admin/Login";
import { AuthProvider } from "./context/AuthContext";
import { AdminRoute } from "./guard/AdminRoute";

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);


export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {

  const darkTheme = createTheme({
    palette: {
      background: {
        default: '#283374',
      },
      mode: 'dark',
      primary: {
        main: '#E8A326',
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
    },
  });


  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="*" element={<div>Error</div>} />
            <Route path="/" element={<Register />} />
            <Route path="/admin" element={<AdminRoute> <Admin /> </AdminRoute>} />            
            <Route path="/tarascc1231ñapsl" element={<Login />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}