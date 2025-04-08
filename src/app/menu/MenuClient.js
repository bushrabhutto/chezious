"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const MenuClient = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const { dispatch } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        let url =
          selectedCategory === "All"
            ? "https://www.themealdb.com/api/json/v1/1/search.php?s="
            : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

        const response = await fetch(url);
        const data = await response.json();
        setFoods(data.meals || []);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [selectedCategory]);

  const handleAddToCart = (meal) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: meal.idMeal,
        name: meal.strMeal,
        price: 500,
        image: meal.strMealThumb,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Our Menu</h1>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        <button
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === "All" ? "bg-yellow-400 text-white" : "bg-gray-200"
          }`}
          onClick={() => window.location.href = "/menu"}
        >
          All
        </button>
        {categories.map(({ strCategory }) => (
          <button
            key={strCategory}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === strCategory ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => window.location.href = `/menu?category=${strCategory}`}
          >
            {strCategory}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center w-full">Loading foods...</p>
        ) : foods.length > 0 ? (
          foods.map(({ idMeal, strMeal, strMealThumb }) => (
            <div key={idMeal} className="border rounded-lg p-4 shadow-lg">
              <Image src={strMealThumb} alt={strMeal} width={200} height={200} className="w-full rounded-md" />
              <h3 className="text-lg font-bold mt-2">{strMeal}</h3>
              <p className="text-sm text-gray-600">Rs. 500</p>
              <button
                className="mt-2 bg-yellow-400 text-white px-4 py-2 rounded"
                onClick={() => handleAddToCart({ idMeal, strMeal, strMealThumb })}
              >
                + Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center w-full">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default MenuClient;
