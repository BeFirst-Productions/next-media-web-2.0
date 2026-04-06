import BlogDetailContent from '../../../components/Blogs/BlogDetailContent';
import { BlogData } from '../../../data/BlogData';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return BlogData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = BlogData.find((b) => b.slug === slug);
  
  if (!blog) return { title: 'Blog Not Found' };
  
  return {
    title: `${blog.title} | Our Insights`,
    description: blog.desc,
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = BlogData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailContent blog={blog} />;
}
