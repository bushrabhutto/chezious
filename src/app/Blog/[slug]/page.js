
import { blogPosts } from "@/dataBlog/blogPosts"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default function BlogPost({ params }) {
  const { slug } = params
  const post = blogPosts[slug]

 
  if (!post) {
    notFound()
  }


  const formatContent = (content) => {
    return content.split("\n\n").map((paragraph, index) => {
  
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
  
      </div>
      <div className="prose max-w-none">{formatContent(post.content)}</div>
    </div>
  )
}
