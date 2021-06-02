import { getPlaylists } from '../../lib/spotify'

export default async function handler(_, res) {
  const response = await getPlaylists();
  const { items } = await response.json();

// make this dynamic based on user_id
// console.log(items)
  const playlists = items.filter(playlist => playlist.owner.display_name === "Srini Laliwala" )
                        .map(playlist => ({
                           title: playlist.name,
                           image: playlist.images[0],
                           id: playlist.id,
                           tracks: playlist.tracks
                        }));
  
//   items.slice(0, 10).map((track) => ({
//     artist: track.artists.map((_artist) => _artist.name).join(', '),
//     songUrl: track.external_urls.spotify,
//     title: track.name
//   }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json(playlists);
}