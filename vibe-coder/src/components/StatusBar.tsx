import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const StatusBar: React.FC = () => {
  const { currentTheme, triggerType } = useTheme();

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: currentTheme.colors.primary,
        color: currentTheme.colors.secondary,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
        transition: 'background-color 0.5s ease, color 0.5s ease',
        borderTop: `2px solid ${currentTheme.colors.secondary}`,
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 36 }}>
        <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Theme: {currentTheme.name}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Trigger: {triggerType}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
