import * as React from 'react';
import {Fab, Typography} from "@mui/material";
import {Languages, LanguageStore} from "../../app/LanguageStore";

export const SwitchLanguageButton = () => {
  function changeLanguage(){
    let currentLanguage = LanguageStore.getLanguage();
    if(currentLanguage === Languages.ENGLISH){
      LanguageStore.setLanguage(Languages.SERBIAN)
    }else{
      LanguageStore.setLanguage(Languages.ENGLISH)
    }
    window.location.reload()
  }
  return (
    <Fab
      color="info"
      size="medium"
      sx={{
        position: 'fixed', 
        bottom: 16, 
        left: 16,
        boxShadow: '0 4px 12px rgba(2, 136, 209, 0.3)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(2, 136, 209, 0.4)',
          transform: 'translateY(-2px) rotate(5deg)',
          transition: 'all 0.2s ease-in-out'
        },
        '&:active': {
          transform: 'translateY(0px) rotate(0deg)'
        },
        transition: 'all 0.2s ease-in-out',
        minWidth: 56,
        minHeight: 56
      }}
      onClick={() => changeLanguage()}
      title="Switch Language"
    >
      <Typography 
        variant="body1" 
        sx={{ 
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'info.contrastText',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {LanguageStore.getLanguage().display}
      </Typography>
    </Fab>
  );
}