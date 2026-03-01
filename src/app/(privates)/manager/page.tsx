import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "@/utils/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Manager() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white text-gray-800">

      {/* NAVBAR */}
      <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">Dev News</h1>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-black transition">Início</a>
            <a href="#" className="hover:text-black transition">Categorias</a>
            <a href="#" className="hover:text-black transition">Sobre</a>
          </nav>

          <Link href={"/posts/new"} className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition">
            Novo Post
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Conteúdo real para <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">devs cedosos</span>
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Freelance, programação, produtividade e crescimento profissional sem enrolação.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition">
            Explorar artigos
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
            Sobre o blog
          </button>
        </div>
      </section>

      {/* SEARCH */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <input
          type="text"
          placeholder="Buscar artigos..."
          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

  <div className="flex justify-between items-center mb-12">
    <h3 className="text-2xl font-semibold">
      Seus rascunhos
    </h3>

    <button className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition">
      Novo Post
    </button>
  </div>

  <div className="space-y-6">

    {[1,2,3].map((post) => (
      <div key={post} className="bg-white border border-gray-100 rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition">
        <div>
          <h4 className="font-semibold text-lg">Como escalar freelas em 2026</h4>
          <p className="text-sm text-gray-500">
            Última edição há 2 dias • Não publicado
          </p>
        </div>

        <div className="flex gap-4">
          <button className="text-blue-600 text-sm font-medium">
            Editar
          </button>
          <button className="text-gray-400 text-sm">
            Excluir
          </button>
        </div>
      </div>
    ))}

  </div>
</section>
    </div>
  );
};
