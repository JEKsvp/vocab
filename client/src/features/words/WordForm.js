import React, {useState} from "react";
import {Box, Button, Card, CardContent, Divider, Grid, IconButton, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {extractPart, extractTranscription, splitByNewLine} from "./WordParser";

const DefinitionTextField = ({value, onChange, onAddDefinition, onRemoveDefinition, defMeta}) => {
  const removeButton = defMeta.i === 0 ? null : (
    <IconButton 
      onClick={onRemoveDefinition}
      color="error"
      size="small"
      sx={{ mt: 1 }}
    >
      <RemoveIcon/>
    </IconButton>
  )
  const buttons = defMeta.i === defMeta.length - 1 ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
      {removeButton}
      <IconButton 
        onClick={onAddDefinition}
        color="primary"
        size="small"
        sx={{ mt: 1 }}
      >
        <AddIcon/>
      </IconButton>
    </Box>
  ) : null
  return (
    <Grid container alignItems="flex-start" spacing={1}>
      <Grid item xs={11}>
        <TextField 
          variant="outlined"
          margin="normal"
          label="Definition"
          multiline
          rows={3}
          fullWidth
          value={value}
          onChange={onChange}
        />
      </Grid>
      {buttons && (
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          {buttons}
        </Grid>
      )}
    </Grid>
  )
}

const ExampleTextField = ({
                            value,
                            onChangeExample,
                            exMeta,
                            onAddExample,
                            onRemoveExample
                          }) => {
  const removeButton = exMeta.i === 0 ? null : (
    <IconButton 
      onClick={onRemoveExample}
      color="error"
      size="small"
      sx={{ mt: 1 }}
    >
      <RemoveIcon/>
    </IconButton>
  )
  const buttons = exMeta.i === exMeta.length - 1 ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
      {removeButton}
      <IconButton 
        onClick={onAddExample}
        color="secondary"
        size="small"
        sx={{ mt: 1 }}
      >
        <AddIcon/>
      </IconButton>
    </Box>
  ) : null
  return (
    <Grid container alignItems="flex-start" spacing={1} sx={{ ml: 2, mb: 1 }}>
      <Grid item xs={10}>
        <TextField 
          variant="outlined"
          margin="normal"
          label={`Example ${exMeta.i + 1}`}
          multiline
          rows={2}
          value={value}
          onChange={onChangeExample}
          fullWidth
          size="small"
        />
      </Grid>
      {buttons && (
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          {buttons}
        </Grid>
      )}
    </Grid>
  )
}

const DefinitionGroup = ({
                           definition,
                           onChangeDefinitions,
                           onChangeExample,
                           onAddDefinition,
                           onRemoveDefinition,
                           defMeta,
                           onAddExample,
                           onRemoveExample
                         }) => {
  const examples = definition.examples;
  const examplesRendered = examples.map((example, i) => (
    <ExampleTextField key={`w_ex${i}`}
                      value={example}
                      onChangeExample={(e) => onChangeExample(e, i)}
                      onAddExample={onAddExample}
                      onRemoveExample={onRemoveExample}
                      exMeta={{i: i, length: examples.length}}
    />
  ))
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Definition {defMeta.i + 1}
        </Typography>
        <DefinitionTextField value={definition.definition}
                             onChange={onChangeDefinitions}
                             onAddDefinition={onAddDefinition}
                             onRemoveDefinition={onRemoveDefinition}
                             defMeta={defMeta}
        />
        {examples.length > 0 && examples[0] !== '' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Examples
            </Typography>
          </>
        )}
        {examplesRendered}
      </CardContent>
    </Card>
  )
}

export const WordForm = ({initWord, initDefinitions, onSave, isSaving}) => {
  const [word, setWord] = useState(initWord)
  const [definitions, setDefinitions] = useState(initDefinitions)
  const navigate = useNavigate()

  function handleChangeTitle(newValue) {
    const newWord = {...word}
    if (word.title.length === 0 && newValue.length > 3) {
      const transcription = extractTranscription(newValue);
      if (transcription) {
        newValue = newValue.replace(transcription, '');
        newWord.transcription = transcription;
      }
      const part = extractPart(newValue);
      if (part) {
        newValue = newValue.replace(part, '');
        newWord.part = part;
      }
      newValue = newValue.trim();
    }
    newWord.title = newValue;
    setWord(newWord);
  }

  function handleChangeTranscription(newValue) {
    const newWord = {...word}
    newWord.transcription = newValue;
    setWord(newWord);
  }

  function handleChangePart(newValue) {
    const newWord = {...word}
    newWord.part = newValue;
    setWord(newWord);
  }

  function onChangeDefinitions(newValue, idx) {
    const newDefinitions = [...definitions];
    const oldDefinition = newDefinitions[idx].definition;
    if (oldDefinition.length === 0 && newValue.length > 3) {
      let definitionAndExamples = splitByNewLine(newValue);
      newDefinitions[idx].definition = definitionAndExamples[0];
      if (definitionAndExamples.length > 1) {
        const examples = definitionAndExamples
          .slice(1, definitionAndExamples.length)
          .reduce((e1, e2) => e1 + '\n' + e2);
        onChangeExample(examples, idx, 0)
      }
    } else {
      newDefinitions[idx].definition = newValue;
    }
    setDefinitions(newDefinitions);
  }

  function onAddDefinition() {
    const newDefinitions = definitions.concat({definition: '', examples: ['']})
    setDefinitions(newDefinitions);
  }

  function onRemoveDefinition() {
    const newDefinitions = definitions.slice(0, definitions.length - 1);
    setDefinitions(newDefinitions);
  }

  function onChangeExample(newValue, defI, exI) {
    const newDefinitions = [...definitions];
    if (newDefinitions[defI].examples[exI].length === 0 && newValue.length > 3) {
      const examples = splitByNewLine(newValue);
      if (examples.length === 1) {
        newDefinitions[defI].examples[exI] = newValue;
      } else {
        newDefinitions[defI].examples = newDefinitions[defI].examples.slice(0, newDefinitions[defI].examples.length - 1);
        examples.forEach(example => {
          newDefinitions[defI].examples = newDefinitions[defI].examples.concat(example);
        })
      }
    } else {
      newDefinitions[defI].examples[exI] = newValue;
    }
    setDefinitions(newDefinitions);
  }

  function onAddExample(e, defI) {
    const newDefinitions = [...definitions];
    let examples = newDefinitions[defI].examples;
    newDefinitions[defI].examples = examples.concat('');
    setDefinitions(newDefinitions);
  }

  function onRemoveExample(e, defI) {
    const newDefinitions = [...definitions];
    let examples = newDefinitions[defI].examples;
    newDefinitions[defI].examples = examples.slice(0, examples.length - 1);
    setDefinitions(newDefinitions);
  }

  function handleBack() {
    navigate(-1);
  }

  const definitionsRendered = definitions.map((definition, defI) =>
    <DefinitionGroup key={defI}
                     defMeta={{i: defI, length: definitions.length}}
                     definition={definition}
                     onChangeDefinitions={e => onChangeDefinitions(e.target.value, defI)}
                     onChangeExample={(e, exI) => onChangeExample(e.target.value, defI, exI)}
                     onAddDefinition={e => onAddDefinition()}
                     onRemoveDefinition={e => onRemoveDefinition()}
                     onAddExample={e => onAddExample(e, defI)}
                     onRemoveExample={e => onRemoveExample(e, defI)}
    />
  )

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary" align="center">
            {word.id ? 'Edit Word' : 'New Word'}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                variant="outlined"
                margin="normal"
                label="Word Title"
                id="Title"
                fullWidth
                value={word.title}
                onChange={(e) => handleChangeTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                variant="outlined"
                margin="normal"
                label="Transcription"
                id="Transcription"
                fullWidth
                value={word.transcription}
                onChange={(e) => handleChangeTranscription(e.target.value)}
                placeholder="e.g., /həˈloʊ/"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                variant="outlined"
                margin="normal"
                label="Part of Speech"
                id="Part"
                fullWidth
                value={word.part}
                onChange={(e) => handleChangePart(e.target.value)}
                placeholder="e.g., noun, verb, adjective"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 2 }}>
        Definitions
      </Typography>
      {definitionsRendered}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, mb: 2 }}>
        <Button
          size="large"
          onClick={handleBack}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          disabled={isSaving}
        >
          Back
        </Button>
        <Button
          size="large"
          onClick={() => onSave(word, definitions)}
          variant="contained"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Word'}
        </Button>
      </Box>
    </Box>
  )
}

WordForm.propTypes = {
  initWord: PropTypes.object,
  initDefinitions: PropTypes.array,
  onSave: PropTypes.func,
  isSaving: PropTypes.bool
}