"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const TypingAnimation = () => {
  const destinations = [
    "Plan your trip to Paris",
    "Explore Tokyo adventures",
    "Discover Bali escapes",
    "Create Rome itineraries",
    "Plan Dubai experiences",
    "Explore NYC attractions",
  ]

  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = destinations[currentIndex]

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1))
        } else {
          setCurrentText(current.substring(0, currentText.length + 1))
        }

        if (!isDeleting && currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex, destinations])

  return (
    <span className="text-[#2F4F4F]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

function Hero() {
  return (
    <div className="flex flex-col items-center  mx-20 md:mx-40 gap-5">
      <h1 className="font-extrabold md:text-[45px] text-[30px] text-center mt-16">
        <span className="text-[#8734d4]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your
        Fingertips
      </h1>

      <p className="text-xl text-gray-500 text-center">
        your personal trip planner and travel curator, creating custom itinerates tailored to your interests and budget.
      </p>
<div className="text-2xl md:text-3xl font-semibold text-center min-h-[40px]">
        <TypingAnimation />
      </div>
     
        <div className="flex flex-wrap justify-center gap-4 ">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50 hover:scale-105 transition-transform">
              <span className="text-sm font-medium text-gray-700">✈️ Smart Destinations</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50 hover:scale-105 transition-transform">
              <span className="text-sm font-medium text-gray-700">🏨 Hotel Recommendations</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50 hover:scale-105 transition-transform">
              <span className="text-sm font-medium text-gray-700">📅 Day-wise Planning</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50 hover:scale-105 transition-transform">
              <span className="text-sm font-medium text-gray-700">💰 Budget Optimization</span>
            </div>
          </div>
 <Link to={"/create-trip"}>
        <Button className='w-50 h-10 rounded-2xl mt-3'>Get Started, It's Free</Button>
      </Link>

    </div>
  )
}

export default Hero
