import React from 'react';
import PropTypes from 'prop-types';
import {alpha, Box, IconButton, useTheme} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';

export const StatusToggleButton = ({ 
  isLearned, 
  onToggle, 
  size = "medium",
  sx = {} 
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16, ...sx }}>
      <IconButton 
        onClick={onToggle}
        color={isLearned ? "success" : "primary"}
        size={size}
        title={isLearned ? "Mark as learning" : "Mark as learned"}
        sx={{ 
          bgcolor: alpha(isLearned ? theme.palette.success.main : theme.palette.primary.main, 0.1),
          '&:hover': {
            bgcolor: alpha(isLearned ? theme.palette.success.main : theme.palette.primary.main, 0.2),
          }
        }}
      >
        {isLearned ? (
          <CheckCircleIcon fontSize={size} />
        ) : (
          <SchoolIcon fontSize={size} />
        )}
      </IconButton>
    </Box>
  );
};

StatusToggleButton.propTypes = {
  isLearned: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.object
};