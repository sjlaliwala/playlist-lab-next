import { access } from 'fs';
import querystring from 'querystring';

const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

//ENDPOINTS
const GET_PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const GET_PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists`;
const GET_AUDIO_FEATURES_ENDPOINT = `https://api.spotify.com/v1/audio-features`;
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};

export const getProfile = async () => {
    const { access_token } = await getAccessToken();
    return fetch(GET_PROFILE_ENDPOINT, {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const getPlaylists = async () => {
    const { access_token } = await getAccessToken();
    return fetch(GET_PLAYLISTS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const getPlaylistItems = async (playlist_id) => {
    const { access_token } = await getAccessToken();
    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const getAudioFeatures = async (ids) => {
    const { access_token } = await getAccessToken();
    console.log('ACCESS TOKEN:')
    console.log(access_token)
    console.log('ENDPOINT')
    console.log(`${GET_AUDIO_FEATURES_ENDPOINT}?ids=${ids}`)
    //only handles up to 100 tracks

    return fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`), {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },

    }
}