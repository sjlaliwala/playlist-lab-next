import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'; 
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Playlist from '../components/playlist';
import PlaylistAnalyzer from '../components/playlistAnalyzer';

const useStyles = makeStyles({
  container: {
    'min-height': '100vh',
    'padding': '0 0.5rem',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'flex-direction': 'row',
    'justify-content': 'center',
    'align-items': 'normal',
    'height': '100vh',
  },
  gridRoot: {
    'flexGrow': '1'
  }
});
// const dummyTrackList = ['a', 'b', 'c', 'd', 'e', 'f',' g'].map((e) => ({
//   track: {
//     'title': e,
//     'id': e
//   },
// }));


export default function Home() {
  const classes = useStyles()
  //const [selectedTrackList, setSelectedTrackList] = useState(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    title: '',
    id: null
  });

  const handlePlaylistChange = (event, value) => {
    if (value) {
      setSelectedPlaylist({
        title: value.title,
        id: value.id
      });
    }
  }
  
  const { data: selectedTrackList, error } = useSWR(selectedPlaylist.id ? `api/playlists/${selectedPlaylist.id}` : null, fetcher)
  
  // const selectedTrackList = (selectedPlaylist.id) ? dummyTrackList : null
  
  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="space-between" alignItems="center" spacing={10}>
        <Grid key={0} item xs={12} sm={6}>
          <PlaylistAnalyzer selectedTrackList={selectedTrackList}/>
        </Grid>
        <Grid key={1} item xs={12} sm={6}>
          <Playlist selectedPlaylist={selectedPlaylist} handlePlaylistChange={handlePlaylistChange} selectedTrackList={selectedTrackList}/>
        </Grid>
      </Grid>
    </div>
  )
}
