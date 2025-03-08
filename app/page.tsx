import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
  // Get both blog posts and projects with error handling
  const [blogPosts, projects] = await Promise.all([
    getAllPosts('blog').catch(() => []),
    getAllPosts('projects').catch(() => [])
  ]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-6xl">
        <div className="w-full flex flex-col items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>
        
        {/* Blog posts section */}
        {blogPosts.length > 0 ? (
          <section className="w-full">
            <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                  <article className="h-full border border-black/[.08] dark:border-white/[.145] rounded-lg p-5 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.frontmatter.title}</h3>
                    <time className="text-sm text-gray-600 dark:text-gray-400 mb-3 block">
                      {new Date(post.frontmatter.date).toLocaleDateString()}
                    </time>
                    <p className="text-sm line-clamp-3">{post.frontmatter.description}</p>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                View all posts <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        ) : null}

        {/* Projects section */}
        {projects.length > 0 && (
          <section className="w-full">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug} className="group">
                  <article className="h-full border border-black/[.08] dark:border-white/[.145] rounded-lg p-5 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{project.frontmatter.title}</h3>
                    <p className="text-sm line-clamp-3">{project.frontmatter.description}</p>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                View all projects <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <Link
            href="/blog"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Visit Blog
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
