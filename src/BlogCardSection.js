"use client"

import { blogPosts } from "@/dataBlog/blogPosts"
import { useRouter } from "next/navigation"
import BlogCard from "@/BlogsCards/blogcard"

export default function BlogCardSection() {
  const router = useRouter()

  return (
    <div className="flex gap-4 justify-center items-center flex-wrap">
      {Object.entries(blogPosts).map(([slug, { title, image }]) => (
        <BlogCard key={slug} onClick={() => router.push(`/Blog/${slug}`)} title={title} img={image} />
      ))}
    </div>
  )
}
