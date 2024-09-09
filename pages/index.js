import Image from "next/image"
import { PODCAST_KEYWORDS } from "./api/keywords"
import { useState } from 'react'

export default function Home() {
  const [ podcasts, setPodcasts ] = useState([])
  const handleSearch = async keyword => {
    try {
      const response = await fetch(`/api/search-podcasts/${keyword}`)
      const data = await response.json()
      console.log(data)
      setPodcasts(data)
    } catch (error){
      console.error("Error fetching podcasts: ", error)
    }
  }
  return (
    <div className="flex flex-col justify-center absolute items-center h-full w-full p-4">
      <h2 className="text-2xl mb-4 text-center">🎙 Podragon 🎙</h2>
      <h1 className="text-6xl font-bold text-center">Discover and Elevate your Podcast Journey</h1>
      <h3 className="font-semibold text-lg text-gray-600 text-center mt-10">Never showing you podcasts you have no interest in. Your Preferences. Your Choices. Your Rules.</h3>
      <div className="mt-16 w-1/2 flex flex-wrap justify-center">
      {
        PODCAST_KEYWORDS.map(
          keyword => 
          <button type="button" onClick={() => handleSearch(keyword)} className="border-2 m-2 text-2xl font-bold hover:bg-gray-900 hover:text-gray-50 border-gray-800 rounded-3xl shadow-lg px-4 py-3" key={keyword}>
            {keyword}
          </button>
        )
      }
      </div>
    </div>
  )
}
