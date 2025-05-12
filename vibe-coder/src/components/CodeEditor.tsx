import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../contexts/ThemeContext';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
  onLanguageChange: (language: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  language, 
  value, 
  onChange,
  onLanguageChange 
}) => {
  const { currentTheme, getLanguageBasedTheme, setTheme } = useTheme();

  useEffect(() => {
    const languageTheme = getLanguageBasedTheme(language);
    if (languageTheme) {
      setTheme(languageTheme);
    }
  }, [language, getLanguageBasedTheme, setTheme]);

  return (
    <div style={{ 
      height: '100%', 
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.foreground,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <FormControl 
        sx={{ 
          m: 1, 
          minWidth: 120,
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.secondary
        }}
      >
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          label="Language"
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="typescript">TypeScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="html">HTML</MenuItem>
          <MenuItem value="css">CSS</MenuItem>
        </Select>
      </FormControl>
      <Editor
        height="calc(100% - 60px)"
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}; 