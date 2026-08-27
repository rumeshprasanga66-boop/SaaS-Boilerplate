import type { Metadata } from 'next';

import { Badge, Card, SectionTitle } from '@/components/app/ui';

export const metadata: Metadata = {
  title: 'Team & Settings — VidStack',
  description: 'Team workspaces, roles, shared folders, billing, API keys, webhooks, and usage analytics.',
  robots: { index: false, follow: false },
};

const MEMBERS = [
  { name: 'Rumesh (you)', email: 'rumesh@vidstack.app', role: 'Admin', tone: 'indigo' as const, avatar: 'https://i.pravatar.cc/72?img=68' },
  { name: 'Sofia Lane', email: 'sofia@vidstack.app', role: 'Editor', tone: 'emerald' as const, avatar: 'https://i.pravatar.cc/72?img=45' },
  { name: 'Daniel Kim', email: 'daniel@vidstack.app', role: 'Viewer', tone: 'gray' as const, avatar: 'https://i.pravatar.cc/72?img=33' },
];

const FOLDERS = ['Client work', 'Podcast clips', 'Ads', 'Personal'];

const ANALYTICS = [
  { label: 'Total views', value: '1.2M' },
  { label: 'Likes', value: '84K' },
  { label: 'Engagement', value: '7.1%' },
  { label: 'Followers gained', value: '+12.4K' },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-black text-white">Team & Settings</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 26 + 27. team & roles */}
        <Card>
          <div className="flex items-center justify-between">
            <SectionTitle sub="Invite members & assign roles.">Team workspace</SectionTitle>
            <button type="button" className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-3 py-1.5 text-xs font-bold text-white">Invite</button>
          </div>
          <div className="space-y-2.5">
            {MEMBERS.map(m => (
              <div key={m.email} className="landing-border flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-full object-cover ring-2 ring-white/10"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{m.name}</div>
                    <div className="text-xs text-gray-500">{m.email}</div>
                  </div>
                </div>
                <Badge tone={m.tone}>{m.role}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* 28 + 29. folders + billing */}
        <div className="space-y-6">
          <Card>
            <SectionTitle sub="Project folders shared with your team.">Shared folders</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {FOLDERS.map(f => (
                <div key={f} className="landing-border flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm text-gray-300">
                  <svg viewBox="0 0 24 24" className="size-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
                  {f}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionTitle sub="Subscription, invoices & credits.">Plan & billing</SectionTitle>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Creator plan</div>
                <div className="text-xs text-gray-400">Renews Sep 1 · 300 min/mo</div>
              </div>
              <Badge tone="emerald">Active</Badge>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="landing-border flex-1 rounded-lg border py-2 text-sm text-gray-200 hover:bg-white/5">Upgrade</button>
              <button type="button" className="landing-border flex-1 rounded-lg border py-2 text-sm text-gray-200 hover:bg-white/5">Invoices</button>
            </div>
          </Card>
        </div>
      </div>

      {/* 31. analytics */}
      <Card>
        <SectionTitle sub="Views, likes & engagement across platforms.">Usage analytics</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-4">
          {ANALYTICS.map(a => (
            <div key={a.label} className="landing-border rounded-xl border p-4">
              <div className="text-2xl font-black text-white">{a.value}</div>
              <div className="text-xs text-gray-400">{a.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 30. API keys & webhooks */}
      <Card>
        <SectionTitle sub="Generate keys & trigger actions programmatically.">API keys & webhooks</SectionTitle>
        <div className="landing-border flex items-center justify-between gap-3 rounded-lg border bg-black/30 p-3 font-mono text-sm">
          <span className="truncate text-gray-300">vs_live_••••••••••••••••4f2a</span>
          <button type="button" className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20">Copy</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="landing-border rounded-lg border px-4 py-2 text-sm text-gray-200 hover:bg-white/5">+ New API key</button>
          <button type="button" className="landing-border rounded-lg border px-4 py-2 text-sm text-gray-200 hover:bg-white/5">+ Add webhook</button>
        </div>
      </Card>
    </div>
  );
}
