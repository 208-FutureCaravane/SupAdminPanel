"use client"

import { createTheme } from "@mui/material/styles"

// Custom theme following the brand requirements
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
  main: "#E53935", // brand red
  contrastText: "#FFFFFF",
    },
    secondary: {
  main: "#FB8C00", // brand orange
  contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    error: {
      main: "#E53935",
    },
    warning: {
      main: "#FB8C00",
    },
    success: {
      main: "#4CAF50",
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
  main: "#FF5A4F", // adjusted brand red for dark
  contrastText: "#FFFFFF",
    },
    secondary: {
  main: "#FF9800", // adjusted brand orange for dark
  contrastText: "#121212",
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
  secondary: "#B3B3B3",
    },
    error: {
      main: "#E53935",
    },
    warning: {
      main: "#FB8C00",
    },
    success: {
      main: "#4CAF50",
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          borderRadius: 12,
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1E1E1E",
          borderRight: "1px solid #333",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#2A2A2A",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#333",
        },
        head: {
          backgroundColor: "#2A2A2A",
          color: "#FFFFFF",
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2A2A2A",
            "& fieldset": {
              borderColor: "#444",
            },
            "&:hover fieldset": {
              borderColor: "#666",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FB8C00",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#2A2A2A",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#444",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FB8C00",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          "&:hover": {
            backgroundColor: "#2A2A2A",
          },
          "&.Mui-selected": {
            backgroundColor: "#FB8C00",
            "&:hover": {
              backgroundColor: "#E57C00",
            },
          },
        },
      },
    },
  },
})
