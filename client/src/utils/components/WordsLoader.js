import React from 'react'
import {Grid, Skeleton, Typography} from "@mui/material";

export const WordsLoader = () =>{
  return (
    <Grid item xs={12}>
      <Typography component="div" variant={'h1'}>
        <Skeleton variant={'text'}/>
      </Typography>
      <Typography component="div" variant={'body1'}>
        <Skeleton variant={'text'}/>
      </Typography>
      <Typography component="div" variant={'h1'}>
        <Skeleton variant={'text'}/>
      </Typography>
      <Typography component="div" variant={'body1'}>
        <Skeleton variant={'text'}/>
      </Typography>
      <Typography component="div" variant={'h1'}>
        <Skeleton variant={'text'}/>
      </Typography>
      <Typography component="div" variant={'body1'}>
        <Skeleton variant={'text'}/>
      </Typography>
      <Typography component="div" variant={'h1'}>
        <Skeleton variant={'text'}/>
      </Typography>
      <Typography component="div" variant={'body1'}>
        <Skeleton variant={'text'}/>
      </Typography>
    </Grid>
  )
}