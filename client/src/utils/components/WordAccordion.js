import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
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
    const examplesRendered = definition.examples.map((example, idx) => (
      <Grid container key={idx}>
        <Grid item xs={1}/>
        <Grid item xs={11}>
          <Typography sx={{display: 'list-item'}} variant="body1">
            {example}
          </Typography>
        </Grid>
      </Grid>
    ));
    return (
      <React.Fragment key={word.id + idx}>
        <Typography variant="body2" color="text.secondary">{definition.definition}
        </Typography>
        {examplesRendered}
      </React.Fragment>
    )
  })

  function onEditClick(wordId) {
    navigate(`/words/${wordId}/edit`)
  }

  const backgroundColor = 'LEARNED' === word.status ? '#1e1e1e' : null
  return (
    <Accordion
      sx={{backgroundColor: backgroundColor}}
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMore/>}
        aria-controls="panel1bh-content"
        id="panel1bh-header">
        <Stack>
          <Typography variant="h5" component="div">
            {word.title}&nbsp;
            <Typography variant="h6" color="text.secondary" component="a">
              {word.transcription}
            </Typography>
          </Typography>
          {
            expanded === 'panel1' ?
              <Typography color="text.secondary" component="div">
                {word.part}
              </Typography> : null
          }
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Divider/>
        <Grid container>
          {definitionsRendered}
        </Grid>
        {showButtons ?
          <Grid container>
            <Grid item xs={6}/>
            <Grid item xs={2}>
              {onRemoveClick ? (
                <IconButton onClick={onRemoveClick}>
                  <RemoveIcon/>
                </IconButton>) : null}
            </Grid>
            <Grid item xs={2}>
              <Grid container direction={'row'} justifyContent={'center'}>
                <IconButton onClick={() => onEditClick(word.id)}>
                  <EditIcon/>
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction={'row'} justifyContent={'flex-end'}>
                <IconButton onClick={onMoveWordClick}>
                  <TrendingFlatIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid> : null}
        <Divider/>
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