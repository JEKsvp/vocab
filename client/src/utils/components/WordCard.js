import React, {useState} from "react";
import PropTypes from "prop-types";
import {Box, Button, Card, CardContent, Collapse, Divider, IconButton, Stack, Typography} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";

export const WordCard = ({word, onMoveWordClick, onRemoveClick, showButtons = true}) => {
  const [showDefinitions, setShowDefinitions] = useState(false);
  const navigate = useNavigate();

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
  
  return (
    <Card
      sx={{
        minHeight: 300,
        maxWidth: 600,
        mx: 'auto',
        boxShadow: isLearned ? '0 4px 16px rgba(76, 175, 80, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with word, transcription, and status */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Stack sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="h4" component="div" color="primary" sx={{ fontWeight: 'bold' }}>
                {word.title}
              </Typography>
              {word.transcription && (
                <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  [{word.transcription}]
                </Typography>
              )}
            </Box>
            {word.part && (
              <Typography variant="h6" color="text.secondary" sx={{ textTransform: 'capitalize', mb: 1 }}>
                {word.part}
              </Typography>
            )}
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLearned ? (
              <CheckCircleIcon 
                color="success" 
                fontSize="large"
                sx={{ opacity: 0.9 }}
                title="Learned"
              />
            ) : (
              <SchoolIcon 
                color="primary" 
                fontSize="large"
                sx={{ opacity: 0.8 }}
                title="Learning"
              />
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Definitions toggle button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setShowDefinitions(!showDefinitions)}
            startIcon={showDefinitions ? <VisibilityOffIcon /> : <VisibilityIcon />}
            size="large"
            sx={{ minWidth: 200 }}
          >
            {showDefinitions ? 'Hide Definitions' : 'Show Definitions'}
          </Button>
        </Box>

        {/* Collapsible definitions */}
        <Collapse in={showDefinitions}>
          <Box sx={{ mb: 2 }}>
            {definitionsRendered}
          </Box>
        </Collapse>

        {/* Action buttons */}
        {showButtons && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {onRemoveClick && (
                <IconButton 
                  onClick={onRemoveClick}
                  color="error"
                  size="large"
                  title="Remove word"
                  sx={{ p: 1 }}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              )}
              <IconButton 
                onClick={() => onEditClick(word.id)}
                color="primary"
                size="large"
                title="Edit word"
                sx={{ p: 1 }}
              >
                <EditIcon fontSize="medium" />
              </IconButton>
              <IconButton 
                onClick={onMoveWordClick}
                color="secondary"
                size="large"
                title={isLearned ? "Mark as learning" : "Mark as learned"}
                sx={{ p: 1 }}
              >
                <SwapHorizIcon fontSize="medium" />
              </IconButton>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}

WordCard.propTypes = {
  word: PropTypes.object,
  onMoveWordClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  showButtons: PropTypes.bool
}