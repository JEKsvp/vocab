import React, {useCallback, useEffect, useState} from 'react'
import {Box, Button, Grid, IconButton, Typography} from "@mui/material";
import {ActionMenu} from "../../utils/components/ActionMenu";
import {WordsLoader} from "../../utils/components/WordsLoader";
import {WordCard} from "../../utils/components/WordCard";
import {generateBatch, getBatch} from "../../api/wordsBatchAPI";
import {changeStatus} from "../../api/wordsAPI";
import CachedIcon from '@mui/icons-material/Cached';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {LanguageStore} from "../../app/LanguageStore";

export const WordsBatch = () => {
  const [words, setWords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);


  const fetchWords = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getBatch(LanguageStore.getLanguage().api);
      setWords(result);
      setCurrentCardIndex(0); // Reset to first card when new batch is loaded
      setIsLoading(false);
    } catch (ex) {
      console.error(ex);
      setIsLoading(false);
      setWords([]);
      setCurrentCardIndex(0);
    }
  }, [])


  useEffect(() => {
    (async () => {
      await fetchWords();
    })();
  }, [fetchWords])

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

  function nextCard() {
    if (words && currentCardIndex < words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  }

  function previousCard() {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  }

  let content
  if (isLoading) {
    content = <WordsLoader/>
  } else if (!words || words.length === 0) {
    content = (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No words in current batch
        </Typography>
      </Box>
    )
  } else {
    const currentWord = words[currentCardIndex];
    content = (
      <Box>
        {/* Card counter */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Card {currentCardIndex + 1} of {words.length}
          </Typography>
        </Box>
        
        {/* Current word card */}
        <Box sx={{ mb: 3 }}>
          <WordCard 
            word={currentWord}
            onMoveWordClick={() => handleChangeStatus(currentWord)}
            showButtons={true}
          />
        </Box>
        
        {/* Navigation controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={previousCard}
            disabled={currentCardIndex === 0}
            startIcon={<NavigateBeforeIcon />}
            size="large"
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={nextCard}
            disabled={currentCardIndex >= words.length - 1}
            endIcon={<NavigateNextIcon />}
            size="large"
          >
            Next
          </Button>
        </Box>
      </Box>
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
      <Box sx={{ mt: 3 }}>
        {content}
      </Box>
      <Box height={100}/>
      <ActionMenu/>
    </Box>
  )
}