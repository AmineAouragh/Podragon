const { Pool } = require("pg")
require('dotenv').config()

const pool = new Pool({
    user: process.env.NEXT_PUBLIC_DB_USER,
    host: process.env.NEXT_PUBLIC_DB_HOST,
    database: process.env.NEXT_PUBLIC_DB_NAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: process.env.NEXT_PUBLIC_DB_PORT
})

async function insertPodcasts(podcasts){
    const query = `
     INSERT INTO podcasts (title, description, spotify_url, image_url, podcast_id, publisher)
     VALUES ($1, $2, $3, $4, $5, $6);
    `

    for (const podcast of podcasts){
        const values = [
            podcast.name,
            podcast.description,
            podcast.external_urls.spotify,
            podcast.images[0].url || '',
            podcast.id,
            podcast.publisher
        ]

        try {
            await pool.query(query, values)
        } catch (error) {
            console.error("Error inserting podcasts: ", error)
        }
    }

}

module.exports = { insertPodcasts }