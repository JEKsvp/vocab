import React, {useState} from 'react'
import {Alert, Box, Button, Container, Divider, Paper, Stack, TextField, Typography} from "@mui/material";
import {Login as LoginIcon, PersonAdd as PersonAddIcon} from "@mui/icons-material";
import {signup} from '../../api/signupAPI'
import {useNavigate} from "react-router-dom";

export const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (username.length < 6 || username.length > 32) {
      setError('Username must be between 6 and 32 characters');
      return false;
    }
    if (password.length < 6 || password.length > 32) {
      setError('Password must be between 6 and 32 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  function onClickSignUp() {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    signup(username, password)
      .then(() => {
        setLoading(false);
        navigate("/login", { state: { message: "Account created successfully! Please log in." } });
      })
      .catch(ex => {
        setLoading(false);
        setError(ex.response?.data?.message || 'Sign up failed. Please try again.');
      });
  }

  function onClickGoToLogin() {
    navigate("/login");
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
            maxWidth: 450,
          }}
        >
          <PersonAddIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
          
          <Typography component="h1" variant="h4" gutterBottom>
            Create Account
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Join us to start building your vocabulary
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
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
              helperText="6-32 characters"
              error={username.length > 0 && (username.length < 6 || username.length > 32)}
            />
            
            <TextField 
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={loading}
              helperText="6-32 characters"
              error={password.length > 0 && (password.length < 6 || password.length > 32)}
            />
            
            <TextField 
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={loading}
              error={confirmPassword.length > 0 && password !== confirmPassword}
              helperText={confirmPassword.length > 0 && password !== confirmPassword ? "Passwords do not match" : "Re-enter your password"}
            />
            
            <Button 
              variant="contained"
              onClick={onClickSignUp}
              disabled={loading}
              startIcon={<PersonAddIcon />}
              size="large"
              sx={{ mt: 2 }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>
            
            <Button 
              variant="outlined"
              onClick={onClickGoToLogin}
              disabled={loading}
              startIcon={<LoginIcon />}
              size="large"
            >
              Sign In to Existing Account
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  )
}