import React, {useCallback, useEffect, useRef, useState} from 'react'
import {alpha, Box, Button, Fade, IconButton, LinearProgress, Typography, useTheme} from "@mui/material";
import {ActionMenu} from "../../utils/components/ActionMenu";
import {WordsLoader} from "../../utils/components/WordsLoader";
import {BatchFlipCard} from "../../utils/components/BatchFlipCard";
import {BatchCompletionCard} from "../../utils/components/BatchCompletionCard";
import {generateBatch, getBatch} from "../../api/wordsBatchAPI";
import {changeStatus} from "../../api/wordsAPI";
import CachedIcon from '@mui/icons-material/Cached';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {LanguageStore} from "../../app/LanguageStore";
import {useNavigate} from "react-router-dom";

export const WordsBatch = () => {
  const [words, setWords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reviewedCards, setReviewedCards] = useState(new Set());
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const theme = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const fetchWords = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getBatch(LanguageStore.getLanguage().api);
      setWords(result);
      setCurrentCardIndex(0);
      setIsCompleted(false);
      setReviewedCards(new Set());
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isFullScreen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (words && currentCardIndex < words.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setReviewedCards(prev => new Set([...prev, currentCardIndex]));
          } else if (words && currentCardIndex === words.length - 1) {
            setReviewedCards(prev => new Set([...prev, currentCardIndex]));
            setIsCompleted(true);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsFullScreen(false);
          setIsCompleted(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullScreen, currentCardIndex, words]);

  function handleChangeStatus(word) {
    console.log('[DEBUG_LOG] handleChangeStatus called for word:', word.title, 'ID:', word.id, 'current status:', word.status);
    const newStatus = word.status === 'TO_LEARN' ? 'LEARNED' : 'TO_LEARN';
    console.log('[DEBUG_LOG] New status will be:', newStatus);
    
    changeStatus(word.id, newStatus)
      .then(() => {
        console.log('[DEBUG_LOG] API call successful, updating local state');
        // Update the word in the current words array
        const updatedWords = words.map(w => 
          w.id === word.id ? { ...w, status: newStatus } : w
        );
        setWords(updatedWords);
      })
      .catch(ex => {
        console.error('[DEBUG_LOG] API call failed:', ex);
        console.error(ex);
      });
  }

  function generateNewBatch() {
    setIsLoading(true);
    generateBatch(LanguageStore.getLanguage().api)
      .then(async () => {
        await fetchWords();
        setIsLoading(false);
      })
      .catch(ex => {
        console.error(ex);
        setIsLoading(false);
      });
  }

  function nextCard() {
    if (words && currentCardIndex < words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setReviewedCards(prev => new Set([...prev, currentCardIndex]));
    } else if (words && currentCardIndex === words.length - 1) {
      // Mark last card as reviewed and show completion
      setReviewedCards(prev => new Set([...prev, currentCardIndex]));
      setIsCompleted(true);
    }
  }

  function previousCard() {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  }

  function enterFullScreen() {
    setIsFullScreen(true);
  }

  function exitFullScreen() {
    setIsFullScreen(false);
    setIsCompleted(false);
  }

  function goHome() {
    navigate('/');
  }

  // Touch handlers for swipe navigation
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      previousCard();
    }
  };

  const getLearnedWordsCount = () => {
    return words ? words.filter(word => word.status === 'LEARNED').length : 0;
  };


  // Full-screen session mode
  if (isFullScreen) {
    if (isLoading) {
      return (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'background.default',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <WordsLoader />
        </Box>
      );
    }

    if (!words || words.length === 0) {
      return (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'background.default',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4
          }}
        >
          <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
            No words in current batch
          </Typography>
          <Button
            variant="contained"
            onClick={exitFullScreen}
            startIcon={<CloseIcon />}
            size="large"
          >
            Exit Session
          </Button>
        </Box>
      );
    }

    if (isCompleted) {
      return (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'background.default',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <BatchCompletionCard
            totalWords={words.length}
            learnedWords={getLearnedWordsCount()}
            onNewBatch={() => {
              generateNewBatch();
              setIsCompleted(false);
            }}
            onGoHome={goHome}
            isVisible={isCompleted}
          />
        </Box>
      );
    }

    const currentWord = words[currentCardIndex];

    return (
      <Box
        ref={containerRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.default',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Top Bar with Progress */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            p: 2,
            zIndex: 10
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
              Card {currentCardIndex + 1} of {words.length}
            </Typography>
            <IconButton
              onClick={exitFullScreen}
              color="primary"
              title="Exit Full Screen"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(currentCardIndex / words.length) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                bgcolor: theme.palette.primary.main
              }
            }}
          />
        </Box>

        {/* Main Card Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            position: 'relative'
          }}
        >
          <Fade in={true} key={currentCardIndex} timeout={300}>
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <BatchFlipCard
                word={currentWord}
                onStatusChange={handleChangeStatus}
              />
            </Box>
          </Fade>
        </Box>

        {/* Bottom Navigation Controls */}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <Button
            variant="outlined"
            onClick={previousCard}
            disabled={currentCardIndex === 0}
            startIcon={<NavigateBeforeIcon />}
            size="large"
            sx={{
              minWidth: 120,
              '&:disabled': { opacity: 0.3 }
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={nextCard}
            endIcon={<NavigateNextIcon />}
            size="large"
            sx={{
              minWidth: 120,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              }
            }}
          >
            {currentCardIndex >= words.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    );
  }

  // Normal mode (not full-screen)
  let content
  if (isLoading) {
    content = <WordsLoader />
  } else if (!words || words.length === 0) {
    content = (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          No words in current batch
        </Typography>
        <Button
          variant="contained"
          onClick={generateNewBatch}
          startIcon={<CachedIcon />}
          size="large"
        >
          Generate New Batch
        </Button>
      </Box>
    )
  } else {
    const currentWord = words[currentCardIndex];
    content = (
      <Box>
        {/* Preview Card */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
            Ready to start your batch session?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {words.length} words waiting
          </Typography>
          
          {/* Preview of first card */}
          <Box sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
            <BatchFlipCard
              word={currentWord}
              onStatusChange={handleChangeStatus}
            />
          </Box>

          <Button
            variant="contained"
            onClick={enterFullScreen}
            startIcon={<FullscreenIcon />}
            size="large"
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.2rem',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              }
            }}
          >
            Start Session
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Word Batch
          <IconButton onClick={generateNewBatch} sx={{ ml: 1 }}>
            <CachedIcon />
          </IconButton>
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        {content}
      </Box>
      
      <Box height={100} />
      <ActionMenu />
    </Box>
  )
}