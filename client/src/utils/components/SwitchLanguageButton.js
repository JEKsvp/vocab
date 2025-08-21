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
      sx={{position: 'fixed', bottom: 16, left: 16}}
      onClick={() => changeLanguage()}
    >
      <Typography variant="h5" fontWeight={800}>{LanguageStore.getLanguage().display}</Typography>
    </Fab>
  );
}