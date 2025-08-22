import React, {useState} from "react";
import PropTypes from "prop-types";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Divider,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";


export const WordAccordion = ({word, onMoveWordClick, onRemoveClick, showButtons = true}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const definitionsRendered = word.definitions.map((definition, idx) => {
    const examplesRendered = definition.examples.map((example, exIdx) => (
      <Box key={exIdx} sx={{ ml: 3, mb: 1 }}>
        <Typography 
          sx={{
            display: 'list-item',
            listStyleType: 'disc',
            ml: 1,
            fontStyle: 'italic'
          }} 
          variant="body2"
          color="text.secondary"
        >
          {example}
        </Typography>
      </Box>
    ));
    return (
      <Box key={word.id + idx} sx={{ mb: 2 }}>
        <Typography 
          variant="body1" 
          color="text.primary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          {idx + 1}. {definition.definition}
        </Typography>
        {examplesRendered.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {examplesRendered}
          </Box>
        )}
      </Box>
    )
  })

  function onEditClick(wordId) {
    navigate(`/words/${wordId}/edit`)
  }

  const isLearned = 'LEARNED' === word.status;
  const statusColor = isLearned ? 'success' : 'primary';
  
  return (
    <Accordion
      sx={{
        mb: 1,
        borderRadius: 2,
        '&:before': { display: 'none' },
        boxShadow: isLearned ? '0 2px 8px rgba(76, 175, 80, 0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
        '&.Mui-expanded': {
          boxShadow: isLearned ? '0 4px 12px rgba(76, 175, 80, 0.25)' : '0 4px 8px rgba(0,0,0,0.15)'
        }
      }}
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: statusColor + '.main' }} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          '&:hover': {
            backgroundColor: 'action.hover'
          },
          borderRadius: expanded === 'panel1' ? '8px 8px 0 0' : '8px'
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Stack sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="h5" component="div" color="primary">
                {word.title}
              </Typography>
              {word.transcription && (
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {word.transcription}
                </Typography>
              )}
              <Chip 
                label={word.status === 'LEARNED' ? 'Learned' : 'Learning'} 
                color={statusColor}
                size="small"
                sx={{ ml: 'auto' }}
              />
            </Box>
            {word.part && (
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {word.part}
              </Typography>
            )}
          </Stack>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 2 }}>
        <Box sx={{ mb: 2 }}>
          {definitionsRendered}
        </Box>
        {showButtons && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              {onRemoveClick && (
                <IconButton 
                  onClick={onRemoveClick}
                  color="error"
                  size="small"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'error.light',
                      color: 'error.contrastText'
                    },
                    borderRadius: 2
                  }}
                  title="Remove word"
                >
                  <RemoveIcon/>
                </IconButton>
              )}
              <IconButton 
                onClick={() => onEditClick(word.id)}
                color="primary"
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText'
                  },
                  borderRadius: 2
                }}
                title="Edit word"
              >
                <EditIcon/>
              </IconButton>
              <IconButton 
                onClick={onMoveWordClick}
                color="secondary"
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'secondary.light',
                    color: 'secondary.contrastText'
                  },
                  borderRadius: 2
                }}
                title={isLearned ? "Mark as learning" : "Mark as learned"}
              >
                <TrendingFlatIcon/>
              </IconButton>
            </Box>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

WordAccordion.propTypes = {
  word: PropTypes.object,
  onMoveWordClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  showButtons: PropTypes.bool
}