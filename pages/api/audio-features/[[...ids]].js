import { getAudioFeatures } from '../../../lib/spotify';

export default async function handler(req, res) {
  const { ids } = req.query;
  //console.log(ids.join(','));
  const response = await getAudioFeatures(ids.join(','));
  console.log('RESPONSE')
  console.log(response)
  const { items } = await response.json();
  console.log('ITEMS')
  console.log(items);
  const audio_features = items

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json(audio_features);
}
