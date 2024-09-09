import { searchPodcasts } from '../../../server'

const pool = require("../../../backend/db")

export default async function handler(req, res) {
    const { keyword } = req.query

    try {
        const podcasts = await searchPodcasts(keyword)
        res.status(200).json(podcasts)
    } catch (error) {
        console.error("Error fetching podcasts:", error)
        res.status(500).json({ error: "Failed to fetch podcasts" })
    }
}
