import React, {useEffect, useState} from 'react'
import {Grid, Typography} from "@mui/material";
import {getCurrentUser} from "../../api/userAPI";
import {ActionMenu} from "../../utils/components/ActionMenu";

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
      <ActionMenu/>
    </Grid>
  )
}