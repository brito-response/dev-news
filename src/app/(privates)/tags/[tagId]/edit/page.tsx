import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  import { FormEditTag } from "@/forms/tags";
  //import { Tag } from "@/utils/models/tags";
  import { Session } from "@/utils/route";
  import { getServerSession } from "next-auth";
  import { redirect } from "next/navigation";

  type Tag = {}
  interface PageProps { params: { tagId: string; }; };

  async function getTagById(tagId: string, token: string): Promise< Tag | null> {
    try {
      const response = await fetch(`${process.env.NEXT_BACKEND_URL}/tags/${tagId}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) { return null; };
      const tag: Tag = await response.json();
      return tag;
    } catch (error) {
      console.error("Erro ao buscar tag:", error);
      return null;
    }
  };

  export default async function TagEditPage({ params }: PageProps) {
    const { tagId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const tag: Tag | null = await getTagById(tagId, session.accessToken);
    return (
      <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          {tag ? (
            <>
              {/* Informações do post */}
              <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow">
                <h1 className="text-2xl font-semibold">Editar Tag</h1>
                <p className="text-sm opacity-70 mt-1">
                  Este Tag foi • Criado em {tag.createdAt.toString()}
                </p>
              </section>

              {/* Formulário */}
              <FormEditTag tag={tag} />
            </>
          ) : (
            <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow text-center">
              <h1 className="text-xl font-semibold">
                Post não encontrado
              </h1>
              <p className="text-sm opacity-70 mt-2">
                O Tag que você está tentando editar não existe ou foi removido.
              </p>
            </section>
          )}

        </div>
      </div>
    );
  };

