import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostType = {
  slug: string
  frontmatter: {
    title: string
    date: string
    description: string
    tags: string[]
  }
}

const CONTENT_PATH = path.join(process.cwd(), 'content')

// Client-side data fetching functions
export async function getAllPosts(contentType: 'blog' | 'projects'): Promise<PostType[]> {
  const response = await fetch(`/api/posts?type=${contentType}`, {
    next: { revalidate: 60 } // Revalidate every minute
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export async function getPostBySlug(contentType: 'blog' | 'projects', slug: string) {
  const response = await fetch(`/api/posts?type=${contentType}&slug=${slug}`, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return response.json();
} 