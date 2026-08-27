import type { Metadata } from 'next';

import { Badge, Card, SectionTitle } from '@/components/app/ui';

export const metadata: Metadata = {
  title: 'Brand Templates — VidStack',
  description: 'Custom brand kits, asset library, intro/outro templates, watermark control, and theme presets.',
  robots: { index: false, follow: false },
};

const KITS = [
  { name: 'VidStack Default', colors: ['#6366f1', '#10b981', '#facc15'], font: 'Inter', active: true },
  { name: 'Podcast Pro', colors: ['#0ea5e9', '#f472b6', '#ffffff'], font: 'Montserrat', active: false },
  { name: 'Creator Bold', colors: ['#ef4444', '#111111', '#facc15'], font: 'Poppins', active: false },
];

const ASSETS = [
  { name: 'intro-pulse.mp4', type: 'Video' },
  { name: 'logo-mark.png', type: 'Logo' },
  { name: 'whoosh.mp3', type: 'Audio' },
  { name: 'Inter-Black.ttf', type: 'Font' },
];

const THEMES = ['Neon', 'Minimal', 'Retro', 'Corporate'];

export default function BrandTemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Brand Templates</h1>
        <button type="button" className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-2 text-sm font-bold text-white">+ New kit</button>
      </div>

      {/* 16. brand kits */}
      <div className="grid gap-4 sm:grid-cols-3">
        {KITS.map(k => (
          <Card key={k.name} className={k.active ? 'ring-1 ring-emerald-500/40' : ''}>
            <div className="flex items-center justify-between">
              <div className="font-bold text-white">{k.name}</div>
              {k.active && <Badge tone="emerald">Active</Badge>}
            </div>
            <div className="mt-3 flex gap-2">
              {k.colors.map(c => <span key={c} className="size-7 rounded-full border border-white/20" style={{ backgroundColor: c }} />)}
            </div>
            <div className="mt-3 text-sm text-gray-400">
              Font:
              <span className="text-white">{k.font}</span>
            </div>
            <button type="button" className="landing-border mt-4 w-full rounded-lg border py-2 text-sm text-gray-200 hover:bg-white/5">
              {k.active ? 'Edit kit' : 'Apply'}
            </button>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 17. asset library */}
        <Card>
          <SectionTitle sub="Upload audio, overlays & fonts.">Asset library</SectionTitle>
          <div className="space-y-2">
            {ASSETS.map(a => (
              <div key={a.name} className="landing-border flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm">
                <span className="font-mono text-gray-300">{a.name}</span>
                <Badge tone="gray">{a.type}</Badge>
              </div>
            ))}
          </div>
          <button type="button" className="landing-border mt-4 w-full rounded-lg border border-dashed py-3 text-sm text-gray-400 hover:text-white">+ Upload asset</button>
        </Card>

        <div className="space-y-6">
          {/* 18. intro/outro */}
          <Card>
            <SectionTitle sub="Set a global intro & outro for every clip.">Intro / Outro</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              {['Intro', 'Outro'].map(t => (
                <div key={t} className="landing-border flex aspect-video items-center justify-center rounded-lg border border-dashed text-sm text-gray-500">
                  {t}
                  {' '}
                  template
                </div>
              ))}
            </div>
          </Card>

          {/* 19. watermark */}
          <Card>
            <SectionTitle sub="Position, opacity & size.">Watermark</SectionTitle>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <label className="text-gray-400">
                Position
                <select className="landing-border mt-1 w-full rounded-lg border bg-black/30 px-2 py-1.5 text-white">
                  <option>Bottom right</option>
                  <option>Top left</option>
                </select>
              </label>
              <label className="text-gray-400">
                Opacity
                <input type="range" defaultValue={70} className="mt-3 w-full accent-emerald-500" />
              </label>
              <label className="text-gray-400">
                Size
                <input type="range" defaultValue={40} className="mt-3 w-full accent-indigo-500" />
              </label>
            </div>
          </Card>
        </div>
      </div>

      {/* 20. theme presets */}
      <Card>
        <SectionTitle sub="Save & apply full themes in one click.">Theme presets</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-4">
          {THEMES.map((t, i) => (
            <button key={t} type="button" className={`rounded-xl py-6 text-sm font-bold transition ${i === 0 ? 'bg-gradient-to-br from-indigo-500/30 to-emerald-500/20 text-white ring-1 ring-indigo-500/40' : 'landing-border border text-gray-300 hover:bg-white/5'}`}>
              {t}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
