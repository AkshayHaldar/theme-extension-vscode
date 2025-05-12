import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CodeEditor } from './components/CodeEditor';
import { StatusBar } from './components/StatusBar';
import { Box, Container, CssBaseline } from '@mui/material';

const defaultCode = `// Welcome to Vibe Coder!
// The theme will change based on the time of day
// and the programming language you're using.

function helloWorld() {
  console.log("Hello, Vibe Coder!");
  return true;
}`;

function App() {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('javascript');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 2 }}>
          <CodeEditor
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            onLanguageChange={handleLanguageChange}
          />
        </Container>
        <StatusBar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
