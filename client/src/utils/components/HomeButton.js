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
      onClick={() => navigate('/')}
      title="Go to Home"
    >
      <HomeIcon fontSize="medium" />
    </Fab>
  );
}