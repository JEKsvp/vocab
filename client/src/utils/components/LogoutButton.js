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
      onClick={handleLogout}
      title="Logout"
    >
      <LogoutIcon fontSize="medium" />
    </Fab>
  );
}