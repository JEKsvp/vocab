import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <Fab
      sx={{position: 'fixed', bottom: 16, left: 16}}
      onClick={() => navigate('/')}
    >
      <HomeIcon/>
    </Fab>
  );
}