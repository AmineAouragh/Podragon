const express = require("express")
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

const app = express()

app.use((req, res) => {
    res.status(200).send("Hello, world!")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})