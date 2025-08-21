import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {getWordById, updateWord} from "../../api/wordsAPI";
import {WordForm} from "./WordForm";
import {Grid, Skeleton, Typography} from "@mui/material";

export const EditWordForm = () => {
  let {wordId} = useParams();
  const [loadedWord, setLoadedWord] = useState(null)
  const [loadedDefinitions, setLoadedDefinitions] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    getWordById(wordId)
      .then(response => {
          const fetchedWord = {...response};
          fetchedWord.definitions = undefined;
          setLoadedWord(fetchedWord);
          setLoadedDefinitions(response.definitions);
          setIsLoading(false);
        },
        ex => console.error(ex))
  }, [wordId]);

  function onSave(word, definitions) {
    setIsSaving(true)
    const updatedWord = {
      ...word,
      definitions: [...definitions]
    }
    updateWord(updatedWord)
      .then(() => {
        if (updatedWord.status === 'TO_LEARN') {
          navigate('/to-learn')
        } else {
          navigate('/learned')
        }
      })
  }

  let editForm;
  if (isLoading) {
    editForm = (
      <Grid item xs={12}>
        <Typography component="div" variant={'h1'}>
          <Skeleton variant={'text'}/>
        </Typography>
        <Typography component="div" variant={'h1'}>
          <Skeleton variant={'text'}/>
        </Typography>
        <Typography component="div" variant={'h1'}>
          <Skeleton variant={'text'}/>
        </Typography>
        <Typography component="div" variant={'h1'}>
          <Skeleton variant={'text'}/>
        </Typography>
        <Typography component="div" variant={'h1'}>
          <Skeleton variant={'text'}/>
        </Typography>
      </Grid>
    )
  } else {
    editForm = (
      <WordForm
        initWord={loadedWord}
        initDefinitions={loadedDefinitions}
        isSaving={isSaving}
        onSave={onSave}
      />
    )
  }

  return (
    editForm
  )
}