import React, {useCallback, useMemo, useState} from 'react';
import Slide from '@mui/material/Slide';
import {Grid, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {getAllWords} from "../../api/wordsAPI";
import {WordAccordion} from "../../utils/components/WordAccordion";
import CloseIcon from '@mui/icons-material/Close';
import debounce from "lodash/debounce";
import {LanguageStore} from "../../app/LanguageStore";

export default function SearchWord() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [words, setWords] = useState([]);

  const debouncedSearch = useMemo(
    () => debounce((newValue) => {
      if (newValue && newValue.length > 2) {
        getAllWords({
          status: null,
          page: 0,
          size: 10,
          q: newValue,
          language: LanguageStore.getLanguage().api
        })
          .then(result => setWords(result.data))
          .catch(ex => console.error(ex))
      }
    }, 500),
    []
  );

  const onSearchQueryChange = useCallback(
    e => {
      setSearchQuery(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  )


  function handleClickOpen() {
    setOpen(true);
  }

  function handleBlur() {
    if (words.length === 0 || searchQuery.length === 0) {
      handleClose()
    }
  }

  function handleClose() {
    setWords([]);
    setSearchQuery('');
    setOpen(false);
  }

  let wordsRendered;
  if (words.length > 0) {
    wordsRendered = words.map(word => (
      <WordAccordion key={word.id} word={word} showButtons={false}/>
    ))
  } else {
    wordsRendered = <Typography mt={2} align="center" variant="h5">Not found</Typography>
  }

  return (
    <div>
      <TextField fullWidth
                 id="outlined-basic"
                 label="Find..."
                 variant="outlined"
                 value={searchQuery}
                 onChange={e => onSearchQueryChange(e)}
                 onFocus={handleClickOpen}
                 onBlur={handleBlur}
                 InputProps={{
                   endAdornment:
                     open ? <InputAdornment position="end">
                       <IconButton
                         aria-label="toggle password visibility"
                         onClick={handleClose}
                         edge="end"
                       >
                         <CloseIcon/>
                       </IconButton>
                     </InputAdornment> : null
                 }}
      />
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: 99999
        }}
               onClick={e => {
                 console.log('azaza')
                 e.preventDefault()
               }}>
          <Grid container>
            <Grid item xs={12}>
              {wordsRendered}
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </div>
  );
}
