import * as React from 'react';
import {Paper} from "@mui/material";
import {NewWordButton} from "./NewWordButton";
import {HomeButton} from "./HomeButton";

export const ActionMenu = ({ hideNewWordButton = false }) => {
  return (
    <Paper 
      elevation={2}
      sx={{ 
        position: 'fixed', 
        bottom: 16, 
        right: 16, 
        display: 'flex', 
        flexDirection: 'row', 
        gap: 1,
        p: 1,
      }}
    >
      <HomeButton />
      {!hideNewWordButton && <NewWordButton />}
    </Paper>
  );
}