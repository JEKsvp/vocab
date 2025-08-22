import * as React from 'react';
import {Fab} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../../api/loginAPI";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
        // Still redirect to login page even if logout fails
        navigate('/login');
      });
  };

  return (
    <Fab
      color="secondary"
      size="medium"
      sx={{
        position: 'fixed', 
        bottom: 16, 
        right: 80,
        boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(156, 39, 176, 0.4)',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        },
        '&:active': {
          transform: 'translateY(0px)'
        },
        transition: 'all 0.2s ease-in-out'
      }}
      onClick={handleLogout}
      title="Logout"
    >
      <LogoutIcon fontSize="medium" />
    </Fab>
  );
}