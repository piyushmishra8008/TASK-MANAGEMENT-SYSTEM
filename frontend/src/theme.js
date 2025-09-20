import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1565c0" }, // Deep blue
    secondary: { main: "#ff9800" }, // Orange accent
    background: {
      default: "#f4f6f8", // soft gray background
      paper: "#ffffff",   // cards / tables
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', sans-serif",
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    body2: { color: "#555" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
