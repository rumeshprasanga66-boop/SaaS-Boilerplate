export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`glass-card rounded-2xl p-5 ${className}`}>{children}</div>
);

export const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold text-white">{children}</h2>
    {sub && <p className="mt-0.5 text-sm text-gray-400">{sub}</p>}
  </div>
);

export const Badge = ({ children, tone = 'emerald' }: { children: React.ReactNode; tone?: 'emerald' | 'indigo' | 'yellow' | 'red' | 'gray' }) => {
  const tones: Record<string, string> = {
    emerald: 'bg-emerald-500/15 text-emerald-400',
    indigo: 'bg-indigo-500/15 text-indigo-400',
    yellow: 'bg-yellow-500/15 text-yellow-400',
    red: 'bg-red-500/15 text-red-400',
    gray: 'bg-white/10 text-gray-300',
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
};
