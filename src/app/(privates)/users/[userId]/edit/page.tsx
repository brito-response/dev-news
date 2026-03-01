import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  import { FormEditUser } from "@/forms/users";
  //import { User } from "@/utils/models/users";
  import { Session } from "@/utils/route";
  import { getServerSession } from "next-auth";
  import { redirect } from "next/navigation";

  type User = {}
  interface PageProps { params: { userId: string; }; };

  async function getUserById(userId: string, token: string): Promise< User | null> {
    try {
      const response = await fetch(`${process.env.NEXT_BACKEND_URL}/users/${userId}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) { return null; };
      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error("Erro ao buscar user:", error);
      return null;
    }
  };

  export default async function UserEditPage({ params }: PageProps) {
    const { userId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const user: User | null = await getUserById(userId, session.accessToken);
    return (
      <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          {user ? (
            <>
              {/* Informações do post */}
              <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow">
                <h1 className="text-2xl font-semibold">Editar User</h1>
                <p className="text-sm opacity-70 mt-1">
                  Este User foi • Criado em {user.createdAt.toString()}
                </p>
              </section>

              {/* Formulário */}
              <FormEditUser user={user} />
            </>
          ) : (
            <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow text-center">
              <h1 className="text-xl font-semibold">
                Post não encontrado
              </h1>
              <p className="text-sm opacity-70 mt-2">
                O User que você está tentando editar não existe ou foi removido.
              </p>
            </section>
          )}

        </div>
      </div>
    );
  };

