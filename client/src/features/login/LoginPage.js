import React, {useState} from 'react'
import {Alert, Box, Button, Container, Divider, Paper, Stack, TextField, Typography} from "@mui/material";
import {Login as LoginIcon, PersonAdd as PersonAddIcon} from "@mui/icons-material";
import {login} from '../../api/loginAPI'
import {useLocation, useNavigate} from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  function onClickLogin() {
    setLoading(true);
    login(username, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch(ex => {
        setLoading(false);
        console.log(ex);
      });
  }

  function onClickGoToSignUp() {
    navigate("/signup");
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <LoginIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
          
          <Typography component="h1" variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Sign in to your account to continue
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3, width: '100%' }}>
              {successMessage}
            </Alert>
          )}
          
          <Stack spacing={3} sx={{ width: '100%' }}>
            <TextField 
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={loading}
            />
            
            <TextField 
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={loading}
            />
            
            <Button 
              variant="contained"
              onClick={onClickLogin}
              disabled={loading}
              startIcon={<LoginIcon />}
              size="large"
              sx={{ mt: 2 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>
            
            <Button 
              variant="outlined"
              onClick={onClickGoToSignUp}
              disabled={loading}
              startIcon={<PersonAddIcon />}
              size="large"
            >
              Create New Account
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}