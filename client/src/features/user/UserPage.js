import React, {useEffect, useState} from 'react'
import {Box, Grid, Typography} from "@mui/material";
import {getCurrentUser} from "../../api/userAPI";
import {NewWordButton} from "../../utils/components/NewWordButton";

const UserDisplay = ({user}) => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4">Username: {user.username}</Typography>
      </Grid>
    </Grid>
  )
}

export const UserPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getCurrentUser()
      .then(result => setUser(result))
      .catch(ex => console.error(ex))
  }, [])

  return (
    <Grid container>
      {user ? <UserDisplay user={user}/> : ''}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <NewWordButton/>
      </Box>
    </Grid>
  )
}