import { createBrowserRouter, Route, RouterProvider, Routes, useLocation } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Home } from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "*", 
    element: <div>ERROR</div>
  },
  {
    path: "/", 
    element: <Home />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {

  const darkTheme = createTheme({
    palette: {
      background: {
        default: '#e6e6e6'
      },
      mode: 'light',
      primary: {
        main: '#ff4400',
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
      <ThemeProvider theme={darkTheme} />
    </>
  )
}