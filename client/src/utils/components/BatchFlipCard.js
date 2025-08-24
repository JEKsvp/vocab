import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {alpha, Box, Card, CardContent, Typography, useTheme} from '@mui/material';
import {StatusToggleButton} from './StatusToggleButton';

export const BatchFlipCard = ({ word, onStatusChange, onTap, disableFlip = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useTheme();

  const handleCardTap = () => {
    if (disableFlip) return; // Don't flip if disabled
    
    setIsFlipped(prev => {
      // Only flip forward (from false to true), don't flip back
      if (!prev) {
        const next = true;
        if (onTap) {
          onTap(next);
        }
        return next;
      }
      // If already flipped, don't change state
      return prev;
    });
  };

  const handleStatusToggle = (e) => {
    e.stopPropagation(); // Prevent card flip when clicking status button
    if (onStatusChange) {
      onStatusChange(word);
    } else {
    }
  };

  const isLearned = word.status === 'LEARNED';

  // Render definitions and examples
  const renderDefinitions = () => {
    // Check if definitions exist and is an array
    if (!word.definitions || !Array.isArray(word.definitions) || word.definitions.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No definitions available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This word doesn't have definitions yet.
          </Typography>
        </Box>
      );
    }

    return word.definitions.map((definition, idx) => {
      // Check if definition exists and has required fields
      if (!definition || !definition.definition) {
        return null;
      }

      const examples = definition.examples && Array.isArray(definition.examples)
        ? definition.examples.map((example, exIdx) => (
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
          ))
        : [];

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
    }).filter(Boolean); // Remove any null entries
  };

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        maxWidth: 500,
        height: 400,
        mx: 'auto',
        cursor: disableFlip ? 'default' : 'pointer',
        userSelect: 'none'
      }}
      onClick={handleCardTap}
      onTouchStart={(e) => {
        // Don't interfere with IconButton touches - check for button, IconButton class, or nested icon
        if (e.target.closest('button') || e.target.closest('[class*="IconButton"]') || e.target.closest('svg')) {
          return;
        }
        // Prevent parent touch handlers (e.g., swipe) from interfering
        e.stopPropagation();
      }}
      onTouchEnd={(e) => {
        // Don't interfere with IconButton touches - check for button, IconButton class, or nested icon
        if (e.target.closest('button') || e.target.closest('[class*="IconButton"]') || e.target.closest('svg')) {
          return;
        }
        // Treat as a tap: stop propagation and prevent the synthetic click
        e.stopPropagation();
        e.preventDefault();
        handleCardTap();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardTap();
        }
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Card */}
        <Card
          elevation={8}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backfaceVisibility: 'hidden',
            boxShadow: isLearned 
              ? `0 8px 32px ${alpha(theme.palette.success.main, 0.3)}`
              : `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              p: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`
            }}
          >
            {/* Status Toggle Button */}
            <StatusToggleButton 
              isLearned={isLearned}
              onToggle={handleStatusToggle}
              size="medium"
            />

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
        </Card>

        {/* Back Card */}
        <Card
          elevation={8}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: isLearned 
              ? `0 8px 32px ${alpha(theme.palette.success.main, 0.3)}`
              : `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': {
              transform: 'rotateY(180deg) scale(1.02)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              height: '100%',
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
              <StatusToggleButton 
                isLearned={isLearned}
                onToggle={handleStatusToggle}
                size="large"
                sx={{ position: 'static' }}
              />
            </Box>

            {/* Definitions */}
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              {renderDefinitions()}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

BatchFlipCard.propTypes = {
  word: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func,
  onTap: PropTypes.func,
  disableFlip: PropTypes.bool
};