import type { Metadata } from 'next';

import { ProjectDetail } from '@/components/app/ProjectDetail';

export const metadata: Metadata = {
  title: 'Project Clips — VidStack',
  description: 'AI-scored clips with virality breakdown, transcript segments, and one-click publish.',
  robots: { index: false, follow: false },
};

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectDetail projectId={id} />;
}
