import React, { useMemo, useState, createContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';

// 1️⃣ Define and export ColorModeContext
interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

// 2️⃣ Initialize mode, handle toggle color button, and create palette
function Main() {
  type ThemeMode = 'light' | 'dark';

  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem('darkMode') as ThemeMode) || 'light'
  );

  // useEffect to sync HTML <html> class with mode
  useEffect(() => {
    const root = document.documentElement; // <html> element
    if (mode === 'dark') {
      root.classList.add('dark');    // apply dark mode CSS
    } else {
      root.classList.remove('dark'); // default light mode
    }
  }, [mode]);

  // Toggle function for dark/light mode
  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  // Memoize the context value for performance
  const colorMode = useMemo(() => ({ toggleColorMode }), []);

  // Memoized MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#667eea' },
                secondary: { main: '#764ba2' },
                background: { default: '#f9f9f9', paper: 'transparent' },
                text: { primary: '#2c3e50', secondary: '#5a6c7d' },
              }
            : {
                primary: { main: '#667eea' },
                secondary: { main: '#764ba2' },
                background: { default: '#1a1a2e', paper: 'rgba(0, 0, 0, 0.2)' },
                text: { primary: '#e2e8f0', secondary: '#94a3b8' },
              }),
        },
      }),
    [mode]
  );

  // 3️⃣ Provide ColorModeContext, ThemeProvider, and GlobalStyles around App
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
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                color: theme.palette.text.primary,
                transition: 'all 0.3s ease',
              },
              '.app-container': {
                background: theme.palette.background.paper,
                boxShadow:
                  theme.palette.mode === 'light'
                    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                    : '0 8px 32px rgba(0, 0, 0, 0.3)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
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
