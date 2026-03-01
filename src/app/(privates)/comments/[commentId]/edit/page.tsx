import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  import { FormEditComment } from "@/forms/comments";
  //import { Comment } from "@/utils/models/comments";
  import { Session } from "@/utils/route";
  import { getServerSession } from "next-auth";
  import { redirect } from "next/navigation";

  type Comment = {}
  interface PageProps { params: { commentId: string; }; };

  async function getCommentById(commentId: string, token: string): Promise< Comment | null> {
    try {
      const response = await fetch(`${process.env.NEXT_BACKEND_URL}/comments/${commentId}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) { return null; };
      const comment: Comment = await response.json();
      return comment;
    } catch (error) {
      console.error("Erro ao buscar comment:", error);
      return null;
    }
  };

  export default async function CommentEditPage({ params }: PageProps) {
    const { commentId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const comment: Comment | null = await getCommentById(commentId, session.accessToken);
    return (
      <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          {comment ? (
            <>
              {/* Informações do post */}
              <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow">
                <h1 className="text-2xl font-semibold">Editar Comment</h1>
                <p className="text-sm opacity-70 mt-1">
                  Este Comment foi • Criado em {comment.createdAt.toString()}
                </p>
              </section>

              {/* Formulário */}
              <FormEditComment comment={comment} />
            </>
          ) : (
            <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow text-center">
              <h1 className="text-xl font-semibold">
                Post não encontrado
              </h1>
              <p className="text-sm opacity-70 mt-2">
                O Comment que você está tentando editar não existe ou foi removido.
              </p>
            </section>
          )}

        </div>
      </div>
    );
  };

