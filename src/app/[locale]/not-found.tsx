import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="theme-dark landing-page flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-6 text-white antialiased">
      <div className="text-7xl font-black text-indigo-400">404</div>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-400">The page you're looking for doesn't exist.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-6 py-3 font-bold text-white">
          Go home
        </Link>
        <Link href="/dashboard" className="landing-border rounded-xl border px-6 py-3 font-medium text-gray-200 hover:bg-white/5">
          Open dashboard
        </Link>
      </div>
    </div>
  );
}
