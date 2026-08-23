import type { Metadata } from 'next';

import { Badge, Card, SectionTitle } from '@/components/app/ui';

export const metadata: Metadata = {
  title: 'Video Editor — VidStack',
  description: 'Text-based transcript editing, auto-reframe, animated captions, AI B-roll, and voiceover.',
  robots: { index: false, follow: false },
};

const TRANSCRIPT: Array<[string, 'keep' | 'delete' | 'hook']> = [
  ['For the next 30 days, we\'re going to rewire your brain.', 'hook'],
  ['um, so like, you know, the thing is…', 'delete'],
  ['Every habit you have is just a pattern your brain learned.', 'keep'],
  ['and then uh basically what happened was…', 'delete'],
  ['You don\'t need motivation — you need a trigger and a routine.', 'keep'],
];

const CAPTION_STYLES = ['Hormozi', 'Karaoke', 'Bounce', 'Pop', 'Minimal'];
const RATIOS = ['9:16', '1:1', '16:9', '4:5'];

export default function EditPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-white">Editing: One decision away</h1>
        <div className="flex gap-2">
          <button type="button" className="landing-border rounded-lg border px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Undo</button>
          <button type="button" className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-4 py-2 text-sm font-bold text-white">Export clip</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* preview + 12. reframe */}
        <Card className="lg:col-span-1">
          <SectionTitle sub="Auto face-tracking keeps the speaker centered.">Preview & Reframe</SectionTitle>
          <div className="relative mx-auto aspect-[9/16] max-w-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950">
            <div className="absolute inset-x-6 inset-y-1/4 rounded-lg border-2 border-dashed border-emerald-400/60" />
            <div className="absolute inset-x-0 bottom-[18%] text-center">
              <span className="text-lg font-black">
                <span className="text-yellow-400">EVERY</span>
                {' '}
                <span className="text-white">WORD</span>
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {RATIOS.map((r, i) => (
              <button key={r} type="button" className={`rounded-lg px-3 py-1.5 text-xs font-bold ${i === 0 ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white' : 'landing-border border text-gray-300'}`}>
                {r}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
            <span>Face tracking</span>
            <button type="button" aria-label="Toggle face tracking" className="relative inline-flex h-5 w-9 items-center rounded-full bg-emerald-500"><span className="absolute right-0.5 size-4 rounded-full bg-white" /></button>
          </div>
        </Card>

        {/* 11. transcript editor */}
        <Card className="lg:col-span-2">
          <SectionTitle sub="Delete a word to cut that moment. Highlight to make a clip.">Transcript editor</SectionTitle>
          <div className="space-y-2.5 font-mono text-sm leading-relaxed">
            {TRANSCRIPT.map(([text, state]) => (
              <div
                key={text}
                className={`rounded-lg px-3 py-2 ${
                  state === 'delete'
                    ? 'text-gray-500 line-through decoration-red-400/70 decoration-2 opacity-60'
                    : state === 'hook'
                      ? 'border-l-2 border-emerald-400 bg-emerald-500/10 text-white'
                      : 'text-gray-300'
                }`}
              >
                {text}
              </div>
            ))}
          </div>
          <div className="landing-border mt-4 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
            <span>
              <span className="text-emerald-400">33 kept</span>
              {' '}
              ·
              {' '}
              <span className="text-red-400/80">14 removed</span>
            </span>
            <span>Auto-removing filler words…</span>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 13. caption style suite */}
        <Card>
          <SectionTitle sub="Fonts, colors & keyword highlighting.">Caption style</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {CAPTION_STYLES.map((s, i) => (
              <button key={s} type="button" className={`rounded-lg px-3 py-1.5 text-xs font-bold ${i === 1 ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white' : 'landing-border border text-gray-300'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <label className="text-gray-400">
              Font
              <select className="landing-border mt-1 w-full rounded-lg border bg-black/30 px-2 py-1.5 text-white">
                <option>Inter Black</option>
                <option>Montserrat</option>
              </select>
            </label>
            <label className="text-gray-400">
              Highlight
              <input type="color" defaultValue="#facc15" className="landing-border mt-1 h-9 w-full rounded-lg border bg-black/30 p-1" />
            </label>
          </div>
        </Card>

        {/* 14. AI B-roll overlay */}
        <Card>
          <SectionTitle sub="GIFs, SFX & cards on the timeline.">AI B-Roll</SectionTitle>
          <div className="space-y-2">
            {['Brain animation overlay', 'Whoosh SFX', 'Subscribe card'].map((b, i) => (
              <div key={b} className="landing-border flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                <span className="text-gray-300">{b}</span>
                <Badge tone={i === 0 ? 'indigo' : 'gray'}>{i === 0 ? 'Added' : 'Add'}</Badge>
              </div>
            ))}
          </div>
          <div className="landing-track mt-4 flex h-12 items-end gap-1 rounded-lg p-1">
            {[40, 70, 30, 90, 55, 80, 45, 65].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-indigo-500/50" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Card>

        {/* 15. auto voiceover */}
        <Card>
          <SectionTitle sub="Edge-TTS or ElevenLabs narration.">Auto voiceover</SectionTitle>
          <select className="landing-border w-full rounded-lg border bg-black/30 px-3 py-2 text-sm text-white">
            <option>ElevenLabs — Rachel (calm)</option>
            <option>Edge-TTS — Guy (news)</option>
            <option>ElevenLabs — Adam (deep)</option>
          </select>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-300">
            <span>Replace original audio</span>
            <button type="button" aria-label="Toggle replace original audio" className="relative inline-flex h-5 w-9 items-center rounded-full bg-white/20"><span className="absolute left-0.5 size-4 rounded-full bg-white" /></button>
          </div>
          <button type="button" className="landing-border mt-4 w-full rounded-lg border py-2 text-sm font-medium text-gray-200 hover:bg-white/5">Generate voiceover</button>
        </Card>
      </div>
    </div>
  );
}
