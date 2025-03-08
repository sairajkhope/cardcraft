import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from 'next'

// Params from dynamic route
interface PageParams {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: PageParams): Promise<Metadata> {
  const { frontmatter } = await getPostBySlug('blog', params.slug)
  
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts('blog')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Page component with proper typing
export default async function BlogPost({ 
  params 
}: PageParams) {
  const { frontmatter, content } = await getPostBySlug('blog', params.slug)

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <article className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1>{frontmatter.title}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(frontmatter.date).toLocaleDateString()}
        </div>
        <div className="mt-8">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  )
}