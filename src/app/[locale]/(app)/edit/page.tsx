'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Clip = { id: string };
type Project = { id: string; clips: Clip[] };

export default function EditIndex() {
  const router = useRouter();

  useEffect(() => {
    let alive = true;
    const go = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        const data = await res.json();
        for (const p of (data.projects ?? []) as Array<{ id: string }>) {
          const detail: Project = await fetch(`/api/projects/${p.id}`, { cache: 'no-store' }).then(r => r.json());
          const first = detail.clips?.[0];
          if (first) {
            if (alive) {
              router.replace(`/edit/${first.id}`);
            }
            return;
          }
        }
      } catch { /* fall through */ }
      if (alive) {
        router.replace('/clips');
      }
    };
    go();
    return () => {
      alive = false;
    };
  }, [router]);

  return <div className="p-8 text-sm text-gray-500">Opening editor…</div>;
}
