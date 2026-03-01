interface PageProps {params: {userId: string;};};

  export default function UserDetailPage({ params }: PageProps) {
    const { userId } = params;
    return (
      <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        User detail: {userId}
      </div>
    );
  }
