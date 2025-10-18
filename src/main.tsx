import React, { useMemo, useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import '@/styles/globals.css';

// 1️⃣ Define and export ColorModeContext
interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

// Helper to read CSS variable
function getCSSVariable(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// 2️⃣ Define app modes, toggle control, and palette
function Main() {
  type ThemeMode = 'light' | 'dark';

  // Apply data-theme before first render
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    // Initialize from localStorage if exists
    const storedMode = (localStorage.getItem('darkMode') as ThemeMode) || 'light';
    setMode(storedMode);
    document.documentElement.setAttribute('data-theme', storedMode);
  }, []);

  // Toggle function for dark/light mode
  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('darkMode', newMode);
      document.documentElement.setAttribute('data-theme', newMode);
      return newMode;
    });
  };

  // Memoize color mode context for performance
  const colorMode = useMemo(() => ({ toggleColorMode }), []);

  // Memoized MUI theme
  const theme = useMemo(() => {
    // Grab CSS variables dynamically from :root or [data-theme]
    const vars = [
      '--color-primary',
      '--color-secondary',
      '--color-bg-default',
      '--color-bg-paper',
      '--color-text-primary',
      '--color-text-secondary',
    ];

    const [primary, secondary, bgDefault, bgPaper, textPrimary, textSecondary] = vars.map(getCSSVariable);

    return createTheme({
      palette: {
        mode,
        primary: { main: primary },
        secondary: { main: secondary },
        background: {
          default: bgDefault,
          paper: bgPaper,
        },
        text: {
          primary: textPrimary,
          secondary: textSecondary,
        },
      },
    });
  }, [mode]);

  // 3️⃣ Wrap app in providers
  return (
    <React.StrictMode>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={(theme) => ({
              body: {
                background:
                  theme.palette.mode === 'light'
                    ? `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                    : `linear-gradient(135deg, var(--color-bg-default) 0%, var(--body-bg-default-end) 100%)`,
                color: theme.palette.text.primary,
                transition: 'var(--app-transition)',
              },
              '.app-container': {
                background: theme.palette.background.paper,
                boxShadow:
                  theme.palette.mode === 'light'
                    ? 'var(--box-shadow-light)'
                    : 'var(--box-shadow-dark)',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                transition: 'var(--app-transition)',
              },
            })}
          />
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
