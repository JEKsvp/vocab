import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";

export const LeftHomeButton = () => {
  const navigate = useNavigate();
  return (
    <Fab
      color="primary"
      size="medium"
      onClick={() => navigate('/')}
      title="Go to Home"
      sx={{
        position: 'fixed',
        left: 16,
        bottom: 16,
        zIndex: 1000
      }}
    >
      <HomeIcon fontSize="medium" />
    </Fab>
  );
}