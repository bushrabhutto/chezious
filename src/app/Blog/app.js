import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/dataBlog/blogPosts"

export default function BlogListPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(blogPosts).map(([slug, post]) => (
          <Link
            href={`/Blog/${slug}`}
            key={slug}
            className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">{post.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
