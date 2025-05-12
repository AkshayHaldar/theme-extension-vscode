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
        color: currentTheme.colors.secondary
      }}
    >
      <Toolbar variant="dense">
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          Theme: {currentTheme.name}
        </Typography>
        <Typography variant="body2">
          Trigger: {triggerType}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}; 