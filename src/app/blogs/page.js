import BlogsPageContent from '../../components/Blogs/BlogsPageContent';

export const metadata = {
  title: "Our Insights | Next Digital Marketing Blogs",
  description:
    "Stay updated with the latest trends in digital marketing, content creation, and creative strategy.",
  keywords: [
    "digital marketing blogs",
    "marketing insights",
    "digital marketing trends",
    "content creation tips",
    "creative strategy blogs",
    "branding insights",
    "social media marketing tips",
    "seo trends",
    "marketing agency blogs",
    "dubai digital marketing blog",
    "business growth strategies",
    "content marketing ideas"
  ],
  alternates: {
    canonical: "https://nextmedia.ae/blogs",
  },
};

export default function BlogsPage() {
  return (
    <main className="bg-black min-h-screen">
      <BlogsPageContent />
    </main>
  );
}
