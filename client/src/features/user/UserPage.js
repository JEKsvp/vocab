import React, {useEffect, useState} from 'react'
import {Button, Grid, Typography} from "@mui/material";
import {getCurrentUser} from "../../api/userAPI";
import {logout} from "../../api/logout";
import {useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser()
      .then(result => setUser(result))
      .catch(ex => console.error(ex))
  }, [])

  function onClickLogout() {
    logout()
      .then(() => navigate('/login'))
      .catch(ex => console.error(ex))
  }

  return (
    <Grid container>
      {user ? <UserDisplay user={user}/> : ''}
      <Grid container justifyContent="center">
        <Grid item mt={1}>
          <Button variant="contained"
                  onClick={onClickLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}