import { newsMock } from '@/data/news';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const news = newsMock.slice(-1)[0];

  return (
    <section className="w-full">
      <div className="relative w-full h-105 md:h-130 rounded-2xl overflow-hidden">
        <Image src={news.image} alt="Manchete principal" fill priority className="object-cover transition-transform duration-700 hover:scale-105"/>

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="p-6 md:p-10 max-w-2xl text-white">
            <span className="inline-block bg-red-600 text-xs uppercase font-bold px-3 py-1 rounded-full mb-3">
              {news.category}
            </span>

            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-3">
              {news.title}
            </h2>

            <p className="text-sm md:text-base text-gray-200 mb-4">
              {news.description}
            </p>

            <Link href={`/noticia/${news.id}`} className="inline-block font-semibold border-b border-transparent hover:border-white transition-all duration-300">
              Ler matéria completa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
