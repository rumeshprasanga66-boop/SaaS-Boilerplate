import type { Metadata } from 'next';

import { EditorStudio } from '@/components/app/EditorStudio';

export const metadata: Metadata = {
  title: 'Editor — VidStack',
  description: 'Professional timeline editor with caption blocks from real transcription.',
  robots: { index: false, follow: false },
};

export default function EditPage({ params }: { params: { clip_id: string } }) {
  const clipId = decodeURIComponent((params.clip_id || '').toString());
  if (!clipId || clipId === '1') {
    return (
      <div className="p-8 text-sm text-gray-500">
        No clip selected. Open a project's clip, then hit Edit — or pick one from the Clips Feed.
      </div>
    );
  }
  return <EditorStudio clipId={clipId} />;
}
