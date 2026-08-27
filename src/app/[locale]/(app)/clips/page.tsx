import type { Metadata } from 'next';

import { ClipsFeed } from '@/components/app/ClipsFeed';

export const metadata: Metadata = {
  title: 'Clips Feed — VidStack',
  description: 'Every generated clip across all projects, with virality scores.',
  robots: { index: false, follow: false },
};

export default function ClipsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Clips Feed</h1>
        <span className="text-xs text-gray-500">Live from all projects</span>
      </div>
      <ClipsFeed />
    </div>
  );
}
