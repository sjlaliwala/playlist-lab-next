import { getPlaylistItems } from '../../../lib/spotify'

export default async function handler(req, res) {
  const { playlistId } = req.query
  //console.log(playlistId)
  const response = await getPlaylistItems(playlistId);
  const { items } = await response.json();

const playlistItems = items.map(item => ({
  track: item.track,
  added_At: item.added_at
}));


console.log(playlistItems)
  
//   items.slice(0, 10).map((track) => ({
//     artist: track.artists.map((_artist) => _artist.name).join(', '),
//     songUrl: track.external_urls.spotify,
//     title: track.name
//   }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ playlistItems });
}