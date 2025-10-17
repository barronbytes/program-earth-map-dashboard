import React, { type JSX, useContext } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
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
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon">
          <Globe size={18} />
        </div>
        <span>ProgramEarth</span>
      </div>

      <div className="header-controls">
        <div className="dark-mode-container">
          <span className="dark-mode-label">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
          <button
            className={`dark-mode-toggle ${isDarkMode ? 'dark-mode-toggle--active' : ''}`}
            onClick={toggleColorMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <div className="dark-mode-toggle__slider">
              <div className="dark-mode-toggle__icon">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
