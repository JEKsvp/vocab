import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <Fab
      color="primary"
      size="medium"
      sx={{
        position: 'fixed', 
        bottom: 16, 
        left: 16,
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        },
        '&:active': {
          transform: 'translateY(0px)'
        },
        transition: 'all 0.2s ease-in-out'
      }}
      onClick={() => navigate('/')}
      title="Go to Home"
    >
      <HomeIcon fontSize="medium" />
    </Fab>
  );
}