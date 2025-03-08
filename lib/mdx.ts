import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type PostType = {
  slug: string
  frontmatter: {
    title: string
    date: string
    description: string
    tags: string[]
  }
}

const CONTENT_PATH = path.join(process.cwd(), 'content')

export async function getAllPosts(contentType: 'blog' | 'projects'): Promise<PostType[]> {
  const contentPath = path.join(CONTENT_PATH, contentType)
  
  // Check if directory exists, if not return empty array
  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const files = fs.readdirSync(contentPath)

  const posts = files
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const filePath = path.join(contentPath, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data: frontmatter } = matter(fileContent)

      return {
        slug,
        frontmatter: frontmatter as PostType['frontmatter'],
      }
    })
    .sort((a, b) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )

  return posts
}

export async function getPostBySlug(
  contentType: 'blog' | 'projects',
  slug: string
) {
  const filePath = path.join(CONTENT_PATH, contentType, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContent)

  return {
    frontmatter: frontmatter as PostType['frontmatter'],
    content,
  }
} 