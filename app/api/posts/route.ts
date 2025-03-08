import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostType {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
  };
}

const CONTENT_PATH = path.join(process.cwd(), 'content');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get('type') as 'blog' | 'projects';
  const slug = searchParams.get('slug');

  if (slug) {
    // Get a single post
    try {
      const filePath = path.join(CONTENT_PATH, contentType, `${slug}.mdx`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      return NextResponse.json({
        frontmatter,
        content
      });
    } catch (error) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  } else {
    // Get all posts
    try {
      const contentPath = path.join(CONTENT_PATH, contentType);
      
      if (!fs.existsSync(contentPath)) {
        return NextResponse.json([]);
      }

      const files = fs.readdirSync(contentPath);
      const posts = files
        .filter((filename) => filename.endsWith('.mdx'))
        .map((filename) => {
          const slug = filename.replace('.mdx', '');
          const filePath = path.join(contentPath, filename);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data: frontmatter } = matter(fileContent);

          return {
            slug,
            frontmatter,
          };
        })
        .sort((a, b) => 
          new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        );

      return NextResponse.json(posts);
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
  }
} 