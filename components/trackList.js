import React, { useState, useEffect } from 'react';
import { IconButton, List, Grid, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {PlayCircleFilled, Delete} from '@material-ui/icons';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const useStyles = makeStyles((theme) => ({
    tracksLoading: {
      paddingLeft: '1em'
    },
    tracksError: {
      alignItems: 'center'
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    trackList: {
        width: '100%'
    }
  }));



function TrackList(props) {
    const classes = useStyles();

    if (!props.selectedTrackList) {
        return <a className={classes.tracksLoading}>Loading...</a>
    } else if (Array.isArray(props.selectedTrackList) && !props.selectedTrackList.length) {
        return <a className={classes.tracksLoading}>This playlist is empty! Please add items</a>
    }

    return (
        <Grid container>
            {props.selectedTrackList &&
                <Grid item xs>
                    <List dense={false} className={classes.trackList}>
                        {props.selectedTrackList.map((item) => (
                          <ListItem key={item.track.id} divider={true}>
                            <IconButton edge="start" aria-label="play">
                              <PlayCircleFilled edge="start" aria-label="play" style={{ color: '#1DB954' }}/>
                            </IconButton>
                            <ListItemAvatar>
                              <Avatar alt={item.track.name} variant="square" src={item.track.album.images[2].url}/>
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.track.name}
                            />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete">
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                         </ListItem>
                        ))}
                    </List>
                </Grid>}
        </Grid>
    )
}

export default TrackList;