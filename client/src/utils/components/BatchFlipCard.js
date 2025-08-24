import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {alpha, Box, Card, CardContent, IconButton, Typography, useTheme} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export const BatchFlipCard = ({ word, onStatusChange, onTap }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useTheme();

  const handleCardTap = () => {
    setIsFlipped(!isFlipped);
    if (onTap) {
      onTap(!isFlipped);
    }
  };

  const handleStatusToggle = (e) => {
    e.stopPropagation(); // Prevent card flip when clicking status button
    if (onStatusChange) {
      onStatusChange(word);
    }
  };

  const isLearned = word.status === 'LEARNED';

  // Render definitions and examples
  const renderDefinitions = () => {
    return word.definitions.map((definition, idx) => {
      const examples = definition.examples.map((example, exIdx) => (
        <Box key={exIdx} sx={{ ml: 2, mb: 1 }}>
          <Typography 
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'list-item',
              listStyleType: 'disc',
              ml: 1,
              fontStyle: 'italic'
            }}
          >
            {example}
          </Typography>
        </Box>
      ));

      return (
        <Box key={`def-${idx}`} sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            color="text.primary"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            {idx + 1}. {definition.definition}
          </Typography>
          {examples.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {examples}
            </Box>
          )}
        </Box>
      );
    });
  };

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        maxWidth: 500,
        height: 400,
        mx: 'auto',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onClick={handleCardTap}
    >
      <Card
        elevation={8}
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-in-out',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          boxShadow: isLearned 
            ? `0 8px 32px ${alpha(theme.palette.success.main, 0.3)}`
            : `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
          '&:hover': {
            transform: isFlipped 
              ? 'rotateY(180deg) scale(1.02)' 
              : 'rotateY(0deg) scale(1.02)',
            transition: 'transform 0.3s ease-in-out'
          }
        }}
      >
        {/* Front Side - Recall */}
        <CardContent
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`
          }}
        >
          {/* Status Icon */}
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            {isLearned ? (
              <CheckCircleIcon 
                color="success" 
                fontSize="medium"
                sx={{ opacity: 0.8 }}
              />
            ) : (
              <SchoolIcon 
                color="primary" 
                fontSize="medium"
                sx={{ opacity: 0.8 }}
              />
            )}
          </Box>

          {/* Word Title */}
          <Typography 
            variant="h2" 
            component="h1"
            color="primary"
            sx={{ 
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: `2px 2px 4px ${alpha(theme.palette.text.primary, 0.1)}`
            }}
          >
            {word.title}
          </Typography>

          {/* Transcription */}
          {word.transcription && (
            <Typography 
              variant="h4" 
              color="text.secondary"
              sx={{ 
                fontStyle: 'italic',
                mb: 2,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              [{word.transcription}]
            </Typography>
          )}

          {/* Part of Speech */}
          {word.part && (
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ 
                textTransform: 'capitalize',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 500
              }}
            >
              {word.part}
            </Typography>
          )}

          {/* Tap Hint */}
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              position: 'absolute',
              bottom: 16,
              opacity: 0.7,
              fontSize: '0.9rem'
            }}
          >
            Tap to see definition
          </Typography>
        </CardContent>

        {/* Back Side - Review */}
        <CardContent
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            overflowY: 'auto',
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                {word.title}
              </Typography>
              {word.transcription && (
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  [{word.transcription}]
                </Typography>
              )}
              {word.part && (
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  {word.part}
                </Typography>
              )}
            </Box>

            {/* Status Toggle Button */}
            <IconButton 
              onClick={handleStatusToggle}
              color={isLearned ? "success" : "primary"}
              size="large"
              title={isLearned ? "Mark as learning" : "Mark as learned"}
              sx={{ 
                bgcolor: alpha(isLearned ? theme.palette.success.main : theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: alpha(isLearned ? theme.palette.success.main : theme.palette.primary.main, 0.2),
                }
              }}
            >
              <SwapHorizIcon fontSize="medium" />
            </IconButton>
          </Box>

          {/* Definitions */}
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {renderDefinitions()}
          </Box>

          {/* Back Hint */}
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              textAlign: 'center',
              mt: 2,
              opacity: 0.7,
              fontSize: '0.9rem'
            }}
          >
            Tap to flip back
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

BatchFlipCard.propTypes = {
  word: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func,
  onTap: PropTypes.func
};