import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default async function Blog() {
  const posts = await getAllPosts('blog');

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        
        <div className="grid gap-8">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.frontmatter.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {new Date(post.frontmatter.date).toLocaleDateString()}
              </p>
              <p className="mb-4">{post.frontmatter.description}</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {post.frontmatter.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
} 