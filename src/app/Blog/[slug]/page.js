import Image from "next/image"
import { blogPosts } from "@/dataBlog/blogPosts"
import { notFound } from "next/navigation"

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default function BlogPost({ params }) {
  const { slug } = params
  const post = blogPosts[slug]

  // Handle case when post doesn't exist
  if (!post) {
    notFound()
  }

  // Function to format content with headings and paragraphs
  const formatContent = (content) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Check if paragraph is a heading (starts with a word followed by a newline)
      if (paragraph.match(/^[A-Za-z\s-]+\n/)) {
        const [heading, ...rest] = paragraph.split("\n")
        return (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-bold mb-3">{heading.trim()}</h2>
            <p className="text-lg">{rest.join("\n").trim()}</p>
          </div>
        )
      }
      return (
        <p key={index} className="mb-4 text-lg">
          {paragraph.trim()}
        </p>
      )
    })
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <div className="relative w-full h-[400px] mb-8">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      <div className="prose max-w-none">{formatContent(post.content)}</div>
    </div>
  )
}
