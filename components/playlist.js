import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import PlaylistSelector from './playlistSelector';
import TrackList from './trackList'

const useStyles = makeStyles({
  playlistPaper: {
    'flex': .80,
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'width': '38%',
    'marginLeft': '45em',
  },
});


function Playlist() {
  const classes = useStyles();
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    title: '',
    id: null
  })

  const handlePlaylistChange = (event, value) => {
    console.log(value)
    if (value) {
      setSelectedPlaylist({
        title: value.title,
        id: value.id
      })
    }
  };

  const { data, error } = useSWR('/api/playlists/', fetcher);
  if (!data) {
    return null;
  }
  const { playlists } = data
  

  return (
    <Paper className={classes.playlistPaper} elevation={3} style={{maxHeight: '100%', overflow: 'auto'}}>
      <PlaylistSelector playlists={playlists} handleChange={handlePlaylistChange}/>
      {!!selectedPlaylist.id && <TrackList playlistId={selectedPlaylist.id}/>}
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