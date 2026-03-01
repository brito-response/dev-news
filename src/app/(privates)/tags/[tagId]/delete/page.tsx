import { FormDeleteResource } from "@/forms/shared";

interface PageProps { params: { tagId: string; }; };
export default async function TagDeletePage({ params }: PageProps) {
  const { tagId } = await params;

  return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
    <h2 className="text-center">Tem certeza que vc quer deletar esse Tag?</h2>
    <FormDeleteResource resource={"tag"} resourceId={tagId} />
  </div>;
}
