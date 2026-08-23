import { Reveal } from '@/components/motion/Reveal';

const METERS = [
  { name: 'Clip credits', used: 87, total: 150, color: 'from-indigo-500 to-indigo-400' },
  { name: 'AI minutes', used: 132, total: 300, color: 'from-emerald-500 to-emerald-400' },
  { name: 'Storage', used: 42, total: 100, color: 'from-purple-500 to-purple-400', unit: 'GB' },
];

const ACTIVITY = [
  { action: 'Rendered 12 clips', cost: '12 credits', time: '2m ago' },
  { action: 'AI B-roll on 3 clips', cost: '45 AI min', time: '1h ago' },
  { action: 'Published to 4 platforms', cost: '0 credits', time: '3h ago' },
  { action: 'Batch processed 2 videos', cost: '24 credits', time: 'Yesterday' },
];

export const CreditUsage = () => (
  <section id="credit-usage" className="relative py-24">
    <div className="pointer-events-none absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-cyan-600/10 blur-[140px]" />
    <div className="relative mx-auto max-w-6xl px-6">
      <Reveal className="text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-cyan-400">Credit Usage</div>
        <h2 className="landing-strong mt-2 text-3xl font-black sm:text-4xl">
          Always Know What You've Used
        </h2>
        <p className="landing-muted mx-auto mt-3 max-w-2xl">
          No surprises at the end of the month. Real-time credit meters, per-action costs, and alerts before you run out.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* meters */}
        <Reveal direction="left">
          <div className="glass-card h-full rounded-3xl p-8">
            <div className="mb-1 flex items-center justify-between">
              <span className="landing-strong text-sm font-bold">Pro plan</span>
              <span className="landing-faint text-xs">Resets in 12 days</span>
            </div>
            <div className="mt-6 space-y-6">
              {METERS.map(m => (
                <div key={m.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="landing-muted font-medium">{m.name}</span>
                    <span className="landing-strong font-mono text-xs font-bold">
                      {m.used}
                      {' / '}
                      {m.total}
                      {m.unit ? ` ${m.unit}` : ''}
                    </span>
                  </div>
                  <div className="landing-track h-2.5 overflow-hidden rounded-full">
                    <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${(m.used / m.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="landing-border mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-400">
              You've used 58% of clip credits — we'll email you at 80%.
            </div>
          </div>
        </Reveal>

        {/* activity */}
        <Reveal direction="right" delay={150}>
          <div className="glass-card h-full rounded-3xl p-8">
            <span className="landing-strong text-sm font-bold">Recent activity</span>
            <div className="mt-5 space-y-1">
              {ACTIVITY.map(a => (
                <div key={a.action} className="landing-hover-bg flex items-center justify-between rounded-xl p-3 transition-colors">
                  <div>
                    <div className="landing-strong text-sm font-medium">{a.action}</div>
                    <div className="landing-faint mt-0.5 text-xs">{a.time}</div>
                  </div>
                  <span className="landing-muted shrink-0 rounded-full bg-white/5 px-3 py-1 font-mono text-xs">{a.cost}</span>
                </div>
              ))}
            </div>
            <button type="button" className="landing-border landing-muted hover:landing-strong mt-6 w-full rounded-xl border py-2.5 text-sm font-semibold transition-colors">
              Download usage report (CSV)
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
