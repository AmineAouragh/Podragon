require('dotenv').config()
const axios = require('axios')

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

async function getSpotifyApiAccessToken(){
    const response = await axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
            grant_type: 'client_credentials'
        }),
        {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
    return response.data.access_token
}

async function searchPodcasts(keyword){
    const token = await getSpotifyApiAccessToken()
    const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
            q: keyword,
            type: 'show',
            limit: 10
        }
    })
    return response.data.show.items
}

searchPodcasts('comedy').then(podcasts => {
    console.log(podcasts)
}).catch(err => {
    console.error("An error was encountered when trying to search for podcasts", err)
})