import * as React from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";

export const NewWordButton = () => {
  const navigate = useNavigate();
  return (
    <Fab
      color="primary"
      size="large"
      sx={{
        position: 'fixed', 
        bottom: 16, 
        right: 16,
        boxShadow: '0 4px 16px rgba(25, 118, 210, 0.35)',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(25, 118, 210, 0.5)',
          transform: 'translateY(-3px) scale(1.05)',
          transition: 'all 0.3s ease-in-out'
        },
        '&:active': {
          transform: 'translateY(-1px) scale(1.02)'
        },
        transition: 'all 0.3s ease-in-out',
        zIndex: 1000
      }}
      onClick={() => navigate('/new-word')}
      title="Add New Word"
    >
      <SpeedDialIcon fontSize="large" />
    </Fab>
  );
}