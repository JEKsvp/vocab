import * as React from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import {useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";

export const NewWordButton = () => {
  const navigate = useNavigate();
  return (
    <Fab
      sx={{position: 'fixed', bottom: 16, right: 16}}
      onClick={() => navigate('/new-word')}
    >
      <SpeedDialIcon/>
    </Fab>
  );
}