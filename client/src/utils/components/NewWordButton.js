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
      onClick={() => navigate('/new-word')}
      title="Add New Word"
    >
      <SpeedDialIcon fontSize="large" />
    </Fab>
  );
}