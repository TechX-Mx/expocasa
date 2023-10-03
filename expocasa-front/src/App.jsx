import { createBrowserRouter, Route, RouterProvider, Routes, } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Home } from "./pages/Home/Home";
import { Header } from "./layout/Header/Header";
import { Footer } from "./layout/Footer/Footer";
import { Register } from "./pages/Regsister/Register";
import { Admin } from "./pages/Admin/Admin";

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
        default: '#121212',
      },
      mode: 'dark',
      primary: {
        main: '#E8A326', // Mantenido el mismo color para el tema primario
      },
      secondary: {
        light: '#0066ff', // Mantenido el color claro secundario
        main: '#0044ff', // Mantenido el color principal secundario
        contrastText: '#ffcc00', // Mantenido el color de texto de contraste
      },
    },
  });
  

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="*" element={<div>Error</div>} />
          <Route path="/" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  )
}