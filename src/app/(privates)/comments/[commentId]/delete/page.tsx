import { FormDeleteResource } from "@/forms/shared";

interface PageProps { params: { commentId: string; }; };
export default async function CommentDeletePage({ params }: PageProps) {
  const { commentId } = await params;

  return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
    <h2 className="text-center">Tem certeza que vc quer deletar esse Comment?</h2>
    <FormDeleteResource resource={"comment"} resourceId={commentId} />
  </div>;
}
