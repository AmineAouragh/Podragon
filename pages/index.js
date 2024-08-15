import Image from "next/image"
import { PODCAST_KEYWORDS } from "./api/keywords"

export default function Home() {
  return (
    <div className="flex flex-col justify-center absolute items-center h-full w-full p-4">
      <h2 className="text-2xl mb-4">Podragon</h2>
      <h1 className="text-6xl font-bold">Discover and Elevate your Podcast Journey</h1>
      <div className="mt-16 w-1/3 flex flex-wrap justify-center">
      {
        PODCAST_KEYWORDS.map(
          keyword => 
          <button type="button" className="border-2 m-2 font-bold hover:bg-gray-900 hover:text-gray-50 border-gray-800 rounded-md shadow-lg px-3 py-2" key={keyword}>
            {keyword}
          </button>
        )
      }
      </div>
    </div>
  )
}
