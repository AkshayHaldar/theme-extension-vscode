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
      background: '#BBDEFB',
      foreground: '#0D47A1',
      primary: '#1976D2',
      secondary: '#0D47A1'
    }
  },
  'afternoon-focus': {
    name: 'Afternoon Focus',
    colors: {
      background: '#FFE0B2',
      foreground: '#EF6C00',
      primary: '#FF9800',
      secondary: '#EF6C00'
    }
  },
  'night-owl': {
    name: 'Night Owl',
    colors: {
      background: '#0D47A1',
      foreground: '#E3F2FD',
      primary: '#1976D2',
      secondary: '#E3F2FD'
    }
  },
  'python-zen': {
    name: 'Python Zen',
    colors: {
      background: '#2E3440',
      foreground: '#88C0D0',
      primary: '#81A1C1',
      secondary: '#8FBCBB'
    }
  },
  'javascript-jive': {
    name: 'JavaScript Jive',
    colors: {
      background: '#282C34',
      foreground: '#F7DF1E',
      primary: '#E5C100',
      secondary: '#F7DF1E'
    }
  },
  'typescript-tide': {
    name: 'TypeScript Tide',
    colors: {
      background: '#007ACC',
      foreground: '#FFFFFF',
      primary: '#005A9E',
      secondary: '#FFFFFF'
    }
  },
  'html-hue': {
    name: 'HTML Hue',
    colors: {
      background: '#E34C26',
      foreground: '#FFFFFF',
      primary: '#BF360C',
      secondary: '#FFFFFF'
    }
  },
  'css-cascade': {
    name: 'CSS Cascade',
    colors: {
      background: '#264DE4',
      foreground: '#FFFFFF',
      primary: '#1A237E',
      secondary: '#FFFFFF'
    }
  },
  'rust-rush': {
    name: 'Rust Rush',
    colors: {
      background: '#F5F5F5',
      foreground: '#BF360C',
      primary: '#FF7043',
      secondary: '#BF360C'
    }
  },
  'go-groove': {
    name: 'Go Groove',
    colors: {
      background: '#E3F2FD',
      foreground: '#0D47A1',
      primary: '#1976D2',
      secondary: '#0D47A1'
    }
  },
  'java-jive': {
    name: 'Java Jive',
    colors: {
      background: '#FFF3E0',
      foreground: '#E65100',
      primary: '#FFB74D',
      secondary: '#E65100'
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
        return 'javascript-jive';
      case 'typescript':
        return 'typescript-tide';
      case 'html':
        return 'html-hue';
      case 'css':
        return 'css-cascade';
      case 'rust':
        return 'rust-rush';
      case 'go':
        return 'go-groove';
      case 'java':
        return 'java-jive';
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