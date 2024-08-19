const axios = require('axios')
require('dotenv').config()

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
    const search_keyword = encodeURI(keyword)
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${search_keyword}&type=show&limit=10`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response.data.shows.items
}

searchPodcasts('true crime').then(podcasts => console.log(podcasts)
)
.catch(err => {
    console.error("An error was encountered when trying to search for podcasts", err)
})