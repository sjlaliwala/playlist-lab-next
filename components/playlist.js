import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import PlaylistSelector from './playlistSelector';
import TrackList from './trackList'

const useStyles = makeStyles({
  playlistPaper: {
    'flex': 1,
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'width': '80%',
    'height': '80%'
  },
});

// const playlists = ['a', 'b', 'c', 'd', 'e', 'f',' g'].map((e) => ({
//   'title': e,
//   'id': e
// }));

function Playlist(props) {
  const classes = useStyles();

  const { data: playlists, error } = useSWR('/api/playlists/', fetcher);
  
  
  if (!playlists) {
    return null;
  }

  return (
    <Paper className={classes.playlistPaper} elevation={3} style={{maxHeight: '100%'}}>
      <PlaylistSelector playlists={playlists} handlePlaylistChange={props.handlePlaylistChange}/>
      {!!props.selectedPlaylist.id && <TrackList selectedTrackList={props.selectedTrackList}/>}
    </Paper>
  )
}

// export async function getStaticProps(context) {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library
//     const res = await fetch('/api/playlists')
//     const playlists = await res.json()
  
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//       props: {
//         playlists,
//       },
//     }
// }

export default Playlist;