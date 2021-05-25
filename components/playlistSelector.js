import React, { useState } from 'react';
import { Select, TextField, Paper, Card, CardHeader, CardContent, Typography, MenuItem} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    playlistSelector: {
        'width': '88%',
        'alignItems': 'flex-start',
        'marginLeft': '1.75em',
    },
  });

function PlaylistSelector(props) {

    const classes = useStyles();

    return (
        // <Autocomplete>

        // </Autocomplete>
        <Autocomplete 
            className={classes.playlistSelector}
            options={props.playlists}
            getOptionLabel={(option) => option.title}
            onChange={props.handleChange}
            label="playlist-selector-label"
            id="playlist-selector"
            disableClearable={true}
            renderInput={(params) => <TextField {...params} label="Select a Playlist" margin="normal" />}
        >
        </Autocomplete>
    );
}

export default PlaylistSelector;