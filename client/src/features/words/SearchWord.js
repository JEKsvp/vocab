import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Slide from '@mui/material/Slide';
import {Box, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {getAllWords} from "../../api/wordsAPI";
import {WordAccordion} from "../../utils/components/WordAccordion";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import debounce from "lodash/debounce";
import {LanguageStore} from "../../app/LanguageStore";

export default function SearchWord() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [words, setWords] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (open && searchContainerRef.current) {
      const rect = searchContainerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  }, [open]);

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
      } else {
        setWords([]);
      }
    }, 500),
    []
  );

  const onSearchQueryChange = useCallback(
    e => {
      const value = e.target.value;
      setSearchQuery(value);
      if (value.length > 2) {
        setOpen(true);
        debouncedSearch(value);
      } else {
        setOpen(false);
        setWords([]);
      }
    },
    [debouncedSearch]
  )

  function handleClickOpen() {
    if (searchQuery.length > 2) {
      setOpen(true);
    }
  }

  function handleClose() {
    setWords([]);
    setSearchQuery('');
    setOpen(false);
  }

  let wordsRendered;
  if (searchQuery.length > 2) {
    if (words.length > 0) {
      wordsRendered = words.map(word => (
        <WordAccordion key={word.id} word={word} showButtons={false}/>
      ))
    } else {
      wordsRendered = (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No words found matching "{searchQuery}"
          </Typography>
        </Box>
      )
    }
  } else {
    wordsRendered = (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Type at least 3 characters to search...
        </Typography>
      </Box>
    )
  }

  return (
    <Box ref={searchContainerRef} sx={{ position: 'relative' }}>
      <TextField 
        fullWidth
        id="search-words"
        label="Search words..."
        variant="outlined"
        value={searchQuery}
        onChange={onSearchQueryChange}
        onFocus={handleClickOpen}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: open ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="close search"
                onClick={handleClose}
                edge="end"
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ) : null
        }}
      />
      
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Paper 
          elevation={3}
          sx={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            width: position.width,
            zIndex: 9999,
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ p: 2 }}>
            {wordsRendered}
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
}
