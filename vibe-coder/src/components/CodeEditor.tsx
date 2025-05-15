import React, { useEffect, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
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
  const [monacoThemeName, setMonacoThemeName] = useState('custom-theme');

  useEffect(() => {
    const languageTheme = getLanguageBasedTheme(language);
    if (languageTheme) {
      setTheme(languageTheme);
    }
  }, [language, getLanguageBasedTheme, setTheme]);

  useEffect(() => {
    // Define a custom Monaco theme based on currentTheme colors
    loader.init().then((monaco) => {
      monaco.editor.defineTheme('custom-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: '', foreground: currentTheme.colors.foreground.replace('#', ''), background: currentTheme.colors.background.replace('#', '') },
          { token: 'keyword', foreground: currentTheme.colors.primary.replace('#', ''), fontStyle: 'bold' },
          { token: 'string', foreground: currentTheme.colors.secondary.replace('#', '') },
          { token: 'number', foreground: currentTheme.colors.primary.replace('#', '') },
          { token: 'comment', foreground: currentTheme.colors.secondary.replace('#', ''), fontStyle: 'italic' },
        ],
        colors: {
          'editor.background': currentTheme.colors.background,
          'editor.foreground': currentTheme.colors.foreground,
          'editorCursor.foreground': currentTheme.colors.primary,
          'editor.lineHighlightBackground': currentTheme.colors.primary + '33',
          'editorLineNumber.foreground': currentTheme.colors.secondary,
          'editor.selectionBackground': currentTheme.colors.primary + '55',
          'editor.inactiveSelectionBackground': currentTheme.colors.primary + '33',
        }
      });
      setMonacoThemeName('custom-theme');
    });
  }, [currentTheme]);

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.foreground,
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.5s ease, color 0.5s ease',
      }}
    >
      <FormControl
        sx={{
          m: 1,
          minWidth: 140,
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.secondary,
          borderRadius: 1,
          transition: 'background-color 0.5s ease, color 0.5s ease',
          '& .MuiInputLabel-root': {
            color: currentTheme.colors.secondary,
          },
          '& .MuiSelect-icon': {
            color: currentTheme.colors.secondary,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: currentTheme.colors.secondary,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: currentTheme.colors.primary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: currentTheme.colors.primary,
          },
        }}
      >
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          label="Language"
          onChange={(e) => onLanguageChange(e.target.value)}
          sx={{
            color: currentTheme.colors.secondary,
          }}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="typescript">TypeScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="html">HTML</MenuItem>
          <MenuItem value="css">CSS</MenuItem>
          <MenuItem value="rust">Rust</MenuItem>
          <MenuItem value="go">Go</MenuItem>
          <MenuItem value="java">Java</MenuItem>
        </Select>
      </FormControl>
      <Editor
        height="calc(100% - 60px)"
        language={language}
        value={value}
        onChange={onChange}
        theme={monacoThemeName}
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
