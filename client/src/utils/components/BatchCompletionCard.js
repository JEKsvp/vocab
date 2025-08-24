import React from 'react';
import PropTypes from 'prop-types';
import {alpha, Box, Button, Card, CardContent, Fade, Grow, Typography, useTheme} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CachedIcon from '@mui/icons-material/Cached';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from 'react-router-dom';

export const BatchCompletionCard = ({ 
  totalWords, 
  learnedWords, 
  onNewBatch, 
  onGoHome,
  isVisible = true 
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      navigate('/');
    }
  };

  const handleNewBatch = () => {
    if (onNewBatch) {
      onNewBatch();
    }
  };

  const completionPercentage = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;

  return (
    <Fade in={isVisible} timeout={800}>
      <Grow in={isVisible} timeout={1000}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            height: 400,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Card
            elevation={12}
            sx={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: `2px solid ${alpha(theme.palette.success.main, 0.3)}`,
              boxShadow: `0 12px 40px ${alpha(theme.palette.success.main, 0.2)}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                opacity: 0.3
              }}
            />
            
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                zIndex: 1
              }}
            >
              {/* Success Icon */}
              <Box sx={{ mb: 3 }}>
                <CheckCircleIcon 
                  sx={{ 
                    fontSize: 80,
                    color: theme.palette.success.main,
                    filter: `drop-shadow(0 4px 8px ${alpha(theme.palette.success.main, 0.3)})`
                  }} 
                />
              </Box>

              {/* Completion Title */}
              <Typography 
                variant="h3" 
                component="h1"
                color="primary"
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  textShadow: `2px 2px 4px ${alpha(theme.palette.text.primary, 0.1)}`
                }}
              >
                Batch Complete!
              </Typography>

              {/* Statistics */}
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h5" 
                  color="text.primary"
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  You reviewed <strong>{totalWords}</strong> words
                </Typography>
                
                {learnedWords > 0 && (
                  <Typography 
                    variant="h6" 
                    color="success.main"
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      fontWeight: 500
                    }}
                  >
                    <strong>{learnedWords}</strong> marked as learned ({completionPercentage}%)
                  </Typography>
                )}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2, 
                width: '100%',
                maxWidth: 400
              }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CachedIcon />}
                  onClick={handleNewBatch}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }
                  }}
                >
                  New Batch
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      borderColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Home
                </Button>
              </Box>

              {/* Motivational Message */}
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 3,
                  opacity: 0.8,
                  fontSize: '1rem',
                  fontStyle: 'italic'
                }}
              >
                Great work! Keep practicing to master your vocabulary.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grow>
    </Fade>
  );
};

BatchCompletionCard.propTypes = {
  totalWords: PropTypes.number.isRequired,
  learnedWords: PropTypes.number.isRequired,
  onNewBatch: PropTypes.func,
  onGoHome: PropTypes.func,
  isVisible: PropTypes.bool
};