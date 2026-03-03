import { PostHilight } from '@/utils/models/posthilight';
import { NewsCard } from './NewsCard';

async function getTop6Hilight(): Promise<PostHilight[]> {
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/highlighted/top6`, {
    cache: "no-store",
  });
  if (!response.ok) return [];
  const posts: PostHilight[] = await response.json();
  return posts;
};

export default async function NewsSection() {
  const posthilight = await getTop6Hilight();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Últimas notícias</h2>

      {posthilight.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/30 rounded-2xl border border-dashed">
          <div className="text-5xl mb-4">📰</div>

          <h3 className="text-lg font-semibold">
            Não há novas notícias na base de dados
          </h3>

          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            Assim que novas publicações forem destacadas, elas aparecerão aqui.
            Volte em breve!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-5">
          {posthilight.map((item) => (
            <NewsCard key={item.postId} news={item} />
          ))}
        </div>
      )}
    </section>
  );
}
