import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./config/routes";
import theme from "./config/muiTheme";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const router = createBrowserRouter(
    routes.map((r) => ({
      ...r,
      element: <r.component />,
    })),
  );
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
