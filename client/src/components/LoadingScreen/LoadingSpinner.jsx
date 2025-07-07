import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <CircularProgress size={50} thickness={4} color="primary" />
    </Box>
  );
};

export default LoadingSpinner;
