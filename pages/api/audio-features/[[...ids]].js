import { getAudioFeatures, getSingleAudioFeatures } from '../../../lib/spotify';

export default async function handler(req, res) {
  const { ids } = req.query;
  const response = await getAudioFeatures(ids.join(','));
  // console.log(ids[0])
  // const response = await getSingleAudioFeatures(ids[0]);
  // console.log(response)
  const { items } = await response;

  const audio_features = items

  console.log(items);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json(audio_features);
}
