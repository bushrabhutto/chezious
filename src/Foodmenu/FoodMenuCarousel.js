"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Install lucide-react if not installed

const FoodMenuCarousel = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    router.push(`/menu?category=${encodeURIComponent(category)}`);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return <p className="text-center py-6">Loading categories...</p>;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Explore Menu</h2>
        <Link href="/menu" className="text-orange-500 font-medium hover:underline">
          VIEW ALL
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Categories */}
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {categories.map(({ idCategory, strCategory, strCategoryThumb }) => (
            <div
              key={idCategory}
              className="border border-yellow-400 rounded-lg overflow-hidden cursor-pointer p-4 flex flex-col items-center hover:shadow-lg min-w-[200px]"
              onClick={() => handleCategoryClick(strCategory)}
            >
              <div className="h-40 w-40 relative mb-4">
                <Image
                  src={strCategoryThumb || "/placeholder.svg"}
                  alt={strCategory}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 className="text-center font-bold">{strCategory}</h3>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default FoodMenuCarousel;
