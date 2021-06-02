import React, { useEffect, useState } from 'react';
import { Paper, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
// const { audio_features }  = require('./audio_features.json')
const useStyles = makeStyles({
  analyzerPaper: {
      'flex': 1,
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'flex-start',
      'align-items': 'flex-start',
      'width': '100%',
      'height': '90%',
    },
  });

function stringifyTrackIds(selectedTrackList) {
  return selectedTrackList.map((item) => item.track.id).join('/');
}

function PlaylistAnalyzer(props) {
    const classes = useStyles();
    const { data: audio_features, error } = useSWR(props.selectedTrackList ? `/api/audio-features/${stringifyTrackIds(props.selectedTrackList)}`: null, fetcher);
    console.log(audio_features)
    if (!props.selectedTrackList) {
      return <a className={classes.tracksLoading}>Select a playlist!</a>
    // } else if (Array.isArray(props.selectedTrackList) && !props.selectedTrackList.length) {
    //   return <a className={classes.tracksLoading}>This playlist is empty! Please add items</a>
    } else if (!audio_features) {
      return <a className={classes.tracksLoading}>Loading...</a>
    }
    return (
        <Paper className={classes.analyzerPaper} elevation={3} style={{maxHeight: '100%'}}>
          <a>got audio features</a>
        </Paper>
    )
}

export default PlaylistAnalyzer;
  