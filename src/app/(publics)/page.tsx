import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-10 mt-20">
      <Hero />
      <NewsSection />
    </main>
  );
}
