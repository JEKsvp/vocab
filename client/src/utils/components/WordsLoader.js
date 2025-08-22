import React from 'react'
import {Box, Card, CardContent, Grid, Skeleton} from "@mui/material";

export const WordsLoader = () => {
  const LoadingWordCard = ({ index }) => (
    <Card 
      key={index}
      sx={{ 
        mb: 2, 
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ pb: 2 }}>
        {/* Word title and status */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton 
            variant="text" 
            width="40%" 
            height={36}
            sx={{ mr: 2 }}
          />
          <Skeleton 
            variant="text" 
            width="25%" 
            height={24}
            sx={{ mr: 'auto' }}
          />
          <Skeleton 
            variant="rounded" 
            width={80} 
            height={24}
            sx={{ borderRadius: 3 }}
          />
        </Box>
        
        {/* Part of speech */}
        <Skeleton 
          variant="text" 
          width="30%" 
          height={20}
          sx={{ mb: 3 }}
        />
        
        {/* Definitions */}
        <Box sx={{ mb: 2 }}>
          <Skeleton 
            variant="text" 
            width="90%" 
            height={20}
            sx={{ mb: 1 }}
          />
          <Skeleton 
            variant="text" 
            width="85%" 
            height={20}
            sx={{ mb: 2 }}
          />
          
          {/* Examples */}
          <Box sx={{ ml: 3 }}>
            <Skeleton 
              variant="text" 
              width="70%" 
              height={18}
              sx={{ mb: 0.5 }}
            />
            <Skeleton 
              variant="text" 
              width="75%" 
              height={18}
            />
          </Box>
        </Box>
        
        {/* Action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ p: 2 }}>
          {[...Array(4)].map((_, index) => (
            <LoadingWordCard key={index} index={index} />
          ))}
        </Box>
      </Grid>
    </Grid>
  )
}