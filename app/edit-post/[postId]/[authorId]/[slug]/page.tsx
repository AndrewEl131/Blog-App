import React from "react";
import EditForm from "./EditForm";

export default async function editPage({
  params,
}: {
  params: Promise<{
    postId: string;
    authorId: string;
    slug: string;
  }>;
}) {
  const { postId, authorId, slug } = await params;
  
  return (
    <main className="h-screen flex justify-center items-center">
      <EditForm postId={postId} authorId={authorId} slug={slug} />
    </main>
  );
}
