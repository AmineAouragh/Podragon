const axios = require('axios')
const express = require('express')
require('dotenv').config()
import { insertPodcasts } from './backend/db'

const app = express()


const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

async function getSpotifyApiAccessToken(){
    const token_url = "https://accounts.spotify.com/api/token"
    const response = await axios.post(token_url,
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

export async function searchPodcasts(keyword){
    const token = await getSpotifyApiAccessToken()
    const search_keyword = encodeURIComponent(keyword)
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${search_keyword}&type=show&limit=10&market=US`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    const podcasts = response.data.shows.items 

    await insertPodcasts(podcasts)
    return podcasts 
}

export async function 


app.listen(3001, () => {
    console.log("Server listening at port 3001");
});