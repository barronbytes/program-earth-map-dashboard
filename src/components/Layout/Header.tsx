import React, { useContext, useState, useEffect } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { ColorModeContext } from '@/main.tsx'; // import the context

/**
 * Header component with the application logo, title, and dark mode toggle
 * @component
 * @returns {JSX.Element} The application header with ProgramEarth branding and dark mode toggle
 */
export const Header: React.FC = () => {
  const { toggleColorMode } = useContext(ColorModeContext); // get toggle function from context
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Toggle dark mode using context
  const handleToggle = () => {
    toggleColorMode(); // call context to switch mode
    setIsDarkMode((prev) => !prev); // update local state for button label & icon only
  };

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
            onClick={handleToggle}
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
