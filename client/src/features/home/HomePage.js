import React, {useEffect, useState} from "react";
import {Box, Divider, Grid, List} from "@mui/material";

import ReplayIcon from '@mui/icons-material/Replay';
import Replay30Icon from '@mui/icons-material/Replay30';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {ListItemLink} from "../../utils/components/ListItemLink";
import {NewWordButton} from "../../utils/components/NewWordButton";
import {getCurrentUser} from "../../api/userAPI";
import SearchWord from "../words/SearchWord";
import {SwitchLanguageButton} from "../../utils/components/SwitchLanguageButton";


export const HomePage = () => {
  const [, setUser] = useState(null);
  useEffect(() => {
    getCurrentUser()
      .then(result => setUser(result))
      .catch(ex => console.error(ex))
  }, [])
  return (
    <Box sx={{
      height: '100px'
    }}>
      <Grid container>
        <Grid container>
          <Grid item xs={12} mt={2}>
            <SearchWord/>
          </Grid>
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={12}>
            <Divider/>
            <List>
              <ListItemLink to={'/words-batch'} title={'Batch'} icon={<ListAltIcon fontSize={"large"}/>}/>
              <Divider/>
              <ListItemLink to={'/to-learn'} title={'To learn'} icon={<ReplayIcon fontSize={"large"}/>}/>
              <Divider/>
              <ListItemLink to={'/learned'} title={'Learned'} icon={<Replay30Icon fontSize={"large"}/>}/>
              <Divider/>
            </List>
          </Grid>
        </Grid>
      </Grid>
      <NewWordButton/>
      <SwitchLanguageButton/>
    </Box>
  )
}