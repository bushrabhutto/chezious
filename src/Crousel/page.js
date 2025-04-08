"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Import carousel images
import cro1 from "@/assets/cro1.png"
import cro2 from "@/assets/cro2.png"
import cro3 from "@/assets/cro3.png"
import cro4 from "@/assets/cro4.png"
import cro5 from "@/assets/cro5.webp"
import cro6 from "@/assets/cro6.webp"

// Import card images
import card1 from "@/assets/card1.png"
import card2 from "@/assets/card2.png"
import card3 from "@/assets/card3.png"
import app from "@/assets/app.png"

// Import blog card images
import Cardblog1 from "@/assets/Cardblog1.png"
import Cardblog2 from "@/assets/Cardblog2.png"
import Cardblog3 from "@/assets/Cardblog3.png"

import FoodMenuCarousel from "@/Foodmenu/FoodMenuCarousel"
import Cards from "@/Cards/card"
import BlogCard from "@/BlogsCards/blogcard"

const Carousel = () => {
  const images = [cro1, cro2, cro3, cro4, cro5, cro6]
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="w-full">
      {/* Carousel */}
      <div className="relative w-full">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`carousel-${idx}`}
                className="absolute block w-full h-full object-cover"
                fill
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-white/80" : "bg-white/30"}`}
              aria-current={idx === currentIndex}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>

        {/* Navigation */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={goToPrevious}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={goToNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {/* FoodMenuCarousel */}
      <FoodMenuCarousel />

      {/* Cards Section */}
      <div className="flex gap-4 justify-center items-center my-6 flex-wrap">
        <Cards txt="Delivering cheezy khushiyan" img={card1} />
        <Cards txt="Fastest Growing Brand of the Year" img={card2} />
        <Cards txt="Made with fresh, local ingredients and love" img={card3} />
      </div>

      {/* App Image */}
      <div className="flex justify-center items-center my-6">
        <Image src={app || "/placeholder.svg"} alt="app" />
      </div>

      {/* Option 1: Use BlogCardSection component */}
      {/* 
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-center mb-6">Our Blog</h2>
        <BlogCardSection />
      </div>
      */}

      {/* Option 2: Use your original blog cards directly */}
      <div className="flex gap-4 justify-center items-center flex-wrap mb-10">
        <BlogCard
          onClick={() => router.push("/Blog/awami-brand")}
          title="The Awami Brand That's All About Local Love"
          img={Cardblog1}
        />
        <BlogCard
          onClick={() => router.push("/Blog/perfect-movie")}
          title="The Perfect Movie Night Pairings"
          img={Cardblog2}
        />
        <BlogCard
          onClick={() => router.push("/Blog/pizza-party")}
          title="How to Host the Ultimate Pizza Party with Cheezious"
          img={Cardblog3}
        />
      </div>
    </div>
  )
}

export default Carousel
