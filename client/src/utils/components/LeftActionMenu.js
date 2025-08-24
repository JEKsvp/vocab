import * as React from 'react';
import {Paper} from "@mui/material";
import {UserMenuButton} from "./UserMenuButton";

export const LeftActionMenu = () => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        position: 'fixed', 
        bottom: 16, 
        left: 16, 
        display: 'flex', 
        flexDirection: 'row', 
        gap: 1,
        p: 1,
        backgroundColor: 'transparent',
      }}
    >
      <UserMenuButton />
    </Paper>
  );
}