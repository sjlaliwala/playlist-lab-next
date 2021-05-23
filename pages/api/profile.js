import { getProfile } from '../../lib/spotify';

export default async function handler(_, res) {
  const response = await getProfile();
  //console.log((await getProfile()));
  //console.log(response.json())
  const items = await response.json();
  //console.log(items);
  const profile = items

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ profile });
}