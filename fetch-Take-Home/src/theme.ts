import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6200EA",
    },
    secondary: {
      main: "#03DAC6",
    },
    background: {
      default: "#1E1E2F",
      paper: "#2A2A3D",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});
