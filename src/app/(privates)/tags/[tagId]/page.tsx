interface PageProps {params: {tagId: string;};};

  export default function TagDetailPage({ params }: PageProps) {
    const { tagId } = params;
    return (
      <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        Tag detail: {tagId}
      </div>
    );
  }
