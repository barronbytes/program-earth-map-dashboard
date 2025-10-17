import React, { type JSX, useContext } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '@/main';

/**
 * Header component with the application logo, title, and dark mode toggle
 * Controlled by main.tsx for theme management
 * @component
 * @returns {JSX.Element} The application header with ProgramEarth branding and dark mode toggle
 */

export const Header: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      component="header"
      className="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '20px 32px',
      }}
    >
      {/* Logo + title */}
      <Box
        className="header-logo"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}
      >
        <Box
          className="logo-icon"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Globe size={18} />
        </Box>
        <Typography component="span" variant="inherit">ProgramEarth</Typography>
      </Box>

      {/* Light-Dark Mode Toggle Controller */}
      <Box 
        className="header-controls"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,            // 2 * 8px = 16px (MUI spacing scale)
          ml: 'auto',        // shorthand for margin-left: auto
        }}
      >
        <Box 
          className="dark-mode-container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5, // 1.5 * 8px = 12px
            padding: '8px 16px',
          }}
        >
          <Typography component="span" variant="inherit" className="dark-mode-label">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Typography>
          <IconButton
            className={`dark-mode-toggle ${isDarkMode ? 'dark-mode-toggle--active' : ''}`}
            onClick={toggleColorMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            disableRipple
            sx={{
              position: 'relative',
              width: 70,
              height: 35,
              cursor: 'pointer',
            }}
          >
            <Box 
              className="dark-mode-toggle__slider"
              sx={{
                position: 'absolute',
                top: 2,
                left: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box className="dark-mode-toggle__icon">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </Box>
            </Box>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
