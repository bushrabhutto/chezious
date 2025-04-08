"use client"

import Image from "next/image"

export default function BlogCard({ title, img, onClick }) {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <Image src={img || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  )
}
