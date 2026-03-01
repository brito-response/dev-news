import { FormDeleteResource } from "@/forms/shared";

interface PageProps { params: { userId: string; }; };
export default async function UserDeletePage({ params }: PageProps) {
  const { userId } = await params;

  return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
    <h2 className="text-center">Tem certeza que vc quer deletar esse User?</h2>
    <FormDeleteResource resource={"user"} resourceId={userId} />
  </div>;
}
