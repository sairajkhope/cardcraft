import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const posts = await getAllPosts('blog')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
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