import * as React from 'react';
import {useState} from 'react';
import {Fab, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {logout} from "../../api/loginAPI";
import {useNavigate} from "react-router-dom";
import {Languages, LanguageStore} from "../../app/LanguageStore";
import {Themes, ThemeStore} from "../../app/ThemeStore";

export const UserMenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
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

  const handleChangeLanguage = () => {
    handleClose();
    let currentLanguage = LanguageStore.getLanguage();
    if(currentLanguage === Languages.ENGLISH){
      LanguageStore.setLanguage(Languages.SERBIAN)
    }else{
      LanguageStore.setLanguage(Languages.ENGLISH)
    }
    window.location.reload();
  };

  const handleChangeTheme = () => {
    handleClose();
    let currentTheme = ThemeStore.getTheme();
    if(currentTheme === Themes.DARK){
      ThemeStore.setTheme(Themes.LIGHT)
    }else{
      ThemeStore.setTheme(Themes.DARK)
    }
    window.location.reload();
  };

  return (
    <>
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        title="User Menu"
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AccountCircleIcon fontSize="medium" />
      </Fab>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleChangeLanguage}>
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            Switch to {LanguageStore.getLanguage() === Languages.ENGLISH ? 'Serbian' : 'English'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleChangeTheme}>
          <ListItemIcon>
            {ThemeStore.getTheme() === Themes.DARK ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>
            Switch to {ThemeStore.getTheme() === Themes.DARK ? 'Light' : 'Dark'} theme
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}