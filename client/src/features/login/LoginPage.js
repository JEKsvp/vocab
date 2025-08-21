import React, {useState} from 'react'
import {Box, Button, Grid, TextField} from "@mui/material";
import {login} from '../../api/loginAPI'
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function onClickLogin() {
    login(username, password)
      .then(() => navigate("/"))
      .catch(ex => console.log(ex));
  }

  return (
    <Box mt={1}>
      <Grid container>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <TextField label="Username"
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                     fullWidth/>
        </Grid>
      </Grid>
      <Grid container mt={1}>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <TextField label="Password"
                     type="password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     fullWidth/>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item mt={1}>
          <Button variant="contained"
                  onClick={onClickLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}