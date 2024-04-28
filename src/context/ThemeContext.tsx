import React, { createContext, useState, useContext } from 'react';
import { ThemeName, themes } from './Theme';

interface ThemeContextType {
    theme: ThemeName;
    toggleTheme: () => void;
    isDarkTheme: boolean; // Added property for isDarkTheme
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light' as ThemeName, // Set a default theme
    toggleTheme: () => {}, // Empty function for initial state
    isDarkTheme: false, // Set default value for isDarkTheme
});

export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
  
    const toggleTheme = () => {
      setIsDarkTheme(!isDarkTheme);
    };
  
    const currentTheme = isDarkTheme ? 'dark' : 'light';

    return (
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme: currentTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
