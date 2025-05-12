import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
  };
};

const themes: Record<string, Theme> = {
  'morning-calm': {
    name: 'Morning Calm',
    colors: {
      background: '#E3F2FD',
      foreground: '#1A237E',
      primary: '#BBDEFB',
      secondary: '#1A237E'
    }
  },
  'afternoon-focus': {
    name: 'Afternoon Focus',
    colors: {
      background: '#FFF3E0',
      foreground: '#E65100',
      primary: '#FFE0B2',
      secondary: '#E65100'
    }
  },
  'night-owl': {
    name: 'Night Owl',
    colors: {
      background: '#1A237E',
      foreground: '#E8EAF6',
      primary: '#0D47A1',
      secondary: '#E8EAF6'
    }
  },
  'python-zen': {
    name: 'Python Zen',
    colors: {
      background: '#E8F5E9',
      foreground: '#1B5E20',
      primary: '#C8E6C9',
      secondary: '#1B5E20'
    }
  },
  'webdev-flow': {
    name: 'WebDev Flow',
    colors: {
      background: '#E0F7FA',
      foreground: '#006064',
      primary: '#B2EBF2',
      secondary: '#006064'
    }
  }
};

type ThemeContextType = {
  currentTheme: Theme;
  triggerType: 'time' | 'language' | 'manual';
  setTheme: (themeName: string) => void;
  getTimeBasedTheme: () => string;
  getLanguageBasedTheme: (language: string) => string | null;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes['morning-calm']);
  const [triggerType, setTriggerType] = useState<'time' | 'language' | 'manual'>('time');

  const getTimeBasedTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning-calm';
    if (hour >= 12 && hour < 18) return 'afternoon-focus';
    return 'night-owl';
  };

  const getLanguageBasedTheme = (language: string): string | null => {
    switch (language.toLowerCase()) {
      case 'python':
        return 'python-zen';
      case 'javascript':
      case 'typescript':
      case 'html':
      case 'css':
        return 'webdev-flow';
      default:
        return null;
    }
  };

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
    }
  };

  useEffect(() => {
    const updateThemeByTime = () => {
      const timeTheme = getTimeBasedTheme();
      setTheme(timeTheme);
      setTriggerType('time');
    };

    // Update theme every minute
    const interval = setInterval(updateThemeByTime, 60000);
    updateThemeByTime(); // Initial update

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        triggerType,
        setTheme,
        getTimeBasedTheme,
        getLanguageBasedTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 