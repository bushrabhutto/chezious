"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import chzlogo from '../assets/chzlogo.jpeg';
import { Menu, LogIn, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext"; // Import useCart

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useCart(); // Get cart state
  const cartCount = state.totalItems; // Extract total items

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section: Logo + Hamburger */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 text-yellow-500 hover:text-yellow-600"
          >
            <Menu className="w-7 h-7" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={chzlogo}
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-gray-800">Chezious</span>
          </Link>
        </div>

        {/* Right Section: Cart & Login */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <Link
            href="/Cart"
            className="relative flex items-center px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart
            {/* Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="flex items-center px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </Link>
        </div>
      </div>

      {/* Side Drawer Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full z-50 bg-white shadow-lg border-r transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Logo"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-lg font-semibold">Menu</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="flex flex-col p-4 space-y-3">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-yellow-500 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-yellow-500 font-medium"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="text-gray-700 hover:text-yellow-500 font-medium"
              >
                Explore Menu
              </Link>
            </li>
            <li>
              <Link
                href="/branches"
                className="text-gray-700 hover:text-yellow-500 font-medium"
              >
                Branch Locator
              </Link>
            </li>
            <li>
              <Link
                href="/Blog"
                className="text-gray-700 hover:text-yellow-500 font-medium"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-700 hover:text-yellow-500 font-medium"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>

          {/* Hotline Section */}
          <div className="absolute bottom-0 left-0 w-full bg-yellow-500 p-4 flex items-center justify-between text-white font-medium">
            <span>Cheezious Hotline</span>
            <span>📞</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
