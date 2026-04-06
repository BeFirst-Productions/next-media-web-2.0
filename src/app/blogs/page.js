import BlogsPageContent from '../../components/Blogs/BlogsPageContent';

export const metadata = {
  title: "Our Insights | Next Digital Marketing Blogs",
  description: "Stay updated with the latest trends in digital marketing, content creation, and creative strategy.",
};

export default function BlogsPage() {
  return (
    <main className="bg-black min-h-screen">
      <BlogsPageContent />
    </main>
  );
}
