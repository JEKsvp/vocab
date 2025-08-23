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
      color="secondary"
      size="medium"
      onClick={() => changeLanguage()}
      title={`Switch to ${LanguageStore.getLanguage() === Languages.ENGLISH ? 'Serbian' : 'English'}`}
    >
      <Typography variant="body2" fontWeight="bold">
        {LanguageStore.getLanguage().display}
      </Typography>
    </Fab>
  );
}