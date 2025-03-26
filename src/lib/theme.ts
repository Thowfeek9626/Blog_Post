import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#E91E63", 
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#E0E0E0",
    },
    error: {
      main: "#D32F2F",
    },
    success: {
      main: "#4CAF50",
    },
    mode: "light",
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default theme;
