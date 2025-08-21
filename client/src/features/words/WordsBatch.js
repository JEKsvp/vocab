import React, {useEffect, useState, useCallback} from 'react'
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {HomeButton} from "../../utils/components/HomeButton";
import {NewWordButton} from "../../utils/components/NewWordButton";
import {WordsLoader} from "../../utils/components/WordsLoader";
import {WordAccordion} from "../../utils/components/WordAccordion";
import {generateBatch, getBatch} from "../../api/wordsBatchAPI";
import {changeStatus} from "../../api/wordsAPI";
import CachedIcon from '@mui/icons-material/Cached';
import {LanguageStore} from "../../app/LanguageStore";

export const WordsBatch = () => {
  const [words, setWords] = useState(null);
  const [isLoading, setIsLoading] = useState(true)


  const fetchWords = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getBatch(LanguageStore.getLanguage().api);
      setWords(result);
      setIsLoading(false);
    } catch (ex) {
      console.error(ex);
      setIsLoading(false);
      setWords([]);
    }
  }, [])


  useEffect(() => {
    (async () => {
      await fetchWords();
    })();
  }, [])

  function handleChangeStatus(word) {
    setIsLoading(true)
    changeStatus(word.id, word.status === 'TO_LEARN' ? 'LEARNED' : 'TO_LEARN')
      .then(async () => {
        const words = await fetchWords();
        setIsLoading(false);
        return words;
      })
      .catch(ex => console.error(ex));
  }

  function generateNewBatch() {
    setIsLoading(true);
    generateBatch(LanguageStore.getLanguage().api)
      .then(async () => {
        const words = await fetchWords();
        setIsLoading(false);
        return words;
      })
      .catch(ex => console.error(ex));
  }

  let wordsRendered
  if (isLoading) {
    wordsRendered = <WordsLoader/>
  } else {
    wordsRendered = words.map(word =>
      <Grid container key={word.id}>
        <Grid item xs={12}>
          <WordAccordion word={word}
                         onMoveWordClick={() => handleChangeStatus(word)}
          />
        </Grid>
      </Grid>
    )
  }

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="h4">Batch
            <IconButton onClick={() => generateNewBatch()}>
              <CachedIcon/>
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        {wordsRendered}
      </Grid>
      <Box height={100}/>
      <HomeButton/>
      <NewWordButton/>
    </Box>
  )
}