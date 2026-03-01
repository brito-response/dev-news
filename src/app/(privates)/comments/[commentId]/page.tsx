interface PageProps {params: {commentId: string;};};

  export default function CommentDetailPage({ params }: PageProps) {
    const { commentId } = params;
    return (
      <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        Comment detail: {commentId}
      </div>
    );
  }
