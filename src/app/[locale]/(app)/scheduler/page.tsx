import type { Metadata } from 'next';

import { SchedulerBoard } from '@/components/app/SchedulerBoard';

export const metadata: Metadata = {
  title: 'Scheduler — VidStack',
  description: 'Connected social accounts, live publishing queue, and clips ready to schedule.',
  robots: { index: false, follow: false },
};

export default function SchedulerPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Scheduler</h1>
        <span className="text-xs text-gray-500">Live from the workspace</span>
      </div>
      <SchedulerBoard />
    </div>
  );
}
