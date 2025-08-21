import React, {useCallback, useEffect, useState} from "react";
import {Box, Grid, Pagination, Typography} from "@mui/material";
import {WordAccordion} from "../../utils/components/WordAccordion";
import {changeStatus, getAllWords, removeWord} from "../../api/wordsAPI";
import {WordsLoader} from "../../utils/components/WordsLoader";
import {NewWordButton} from "../../utils/components/NewWordButton";
import {HomeButton} from "../../utils/components/HomeButton";
import PropTypes from "prop-types";
import {WordForm} from "./WordForm";
import {LanguageStore} from "../../app/LanguageStore";

const defaultPaging = {
  size: 50,
  totalElements: 0,
  totalPages: 1,
  number: 1
}

export const WordsList = ({status}) => {
  const [words, setWords] = useState([])
  const [paging, setPaging] = useState(defaultPaging)
  const [isLoading, setIsLoading] = useState(true)

  const fetchWords = useCallback(async (status, page, size) => {
    try {
      setIsLoading(true);
      const result = await getAllWords(
        {
          status: status,
          page: page - 1,
          size: size,
          language: LanguageStore.getLanguage().api
        });
      setWords(result.data);
      setIsLoading(false);
      result.paging.number = result.paging.number + 1;
      setPaging(result.paging);
    } catch (ex) {
      console.error(ex);
    }
  }, [])

  useEffect(() => {
    (async () => {
      await fetchWords(status, paging.number, paging.size);
    })();
  }, [status, paging.number, paging.size, fetchWords])

  function onChangeStatus(wordId) {
    changeStatus(wordId, status === 'TO_LEARN' ? 'LEARNED' : 'TO_LEARN')
      .then(async () => await fetchWords(status, paging.number, paging.size))
      .catch(ex => console.error(ex));
  }

  function onRemoveWord(wordId) {
    removeWord(wordId)
      .then(async () => await fetchWords(status, paging.number, paging.size))
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
                         onMoveWordClick={() => onChangeStatus(word.id)}
                         onRemoveClick={() => onRemoveWord(word.id)}
          />
        </Grid>
      </Grid>
    )
  }

  function onChangePage(page) {
    const newPaging = {...paging};
    newPaging.number = page;
    setPaging(newPaging);
  }

  const pagingRendered = isLoading ? null : (
    <Grid container justifyContent="center" mt={2}>
      <Grid item>
        <Pagination
          count={paging.totalPages}
          defaultPage={1}
          page={paging.number}
          onChange={(e, page) => onChangePage(page)}
        />
      </Grid>
    </Grid>
  )

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="h4">{status === 'TO_LEARN' ? 'To learn' : 'Learned'}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {wordsRendered}
      </Grid>
      {pagingRendered}
      <Box height={100}/>
      <HomeButton/>
      <NewWordButton/>
    </Box>
  )
}

WordForm.propTypes = {
  status: PropTypes.string
}