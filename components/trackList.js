import React, { useState, useEffect } from 'react';
import { IconButton, List, Grid, ListItem, ListItemText, ListItemSecondaryAction, Divider, Card} from '@material-ui/core';
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
  }));

function TrackList(props) {
    const classes = useStyles();

    const {data, error} = useSWR(`api/playlists/${props.playlistId}`, fetcher);
    
    if (error) {
        return <a className={classes.tracksLoading}>Error loading your tracks</a>
    } else if (!data) {
        return <a className={classes.tracksLoading}>Loading...</a>
    }

    const { playlistItems } = data

    //console.log(playlistItems)

    return (
        <Grid item xs={20}>
          <div className={classes.demo}>
            <List dense={false}>
              {playlistItems.map((item) => (
                  <div>
                    <ListItem >
                    <IconButton edge="start" aria-label="play">
                        <PlayCircleFilled edge="start" aria-label="play" />
                    </IconButton>
                    <ListItemText
                        primary={item.track.name}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                        <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                    </ListItem>
                    <Divider light />
                  </div>
              ))}
            </List>
          </div>
        </Grid>
    )
}

export default TrackList;