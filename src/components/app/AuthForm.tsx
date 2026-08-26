'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const AuthForm = ({ mode }: { mode: 'sign-in' | 'sign-up' }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const isSignUp = mode === 'sign-up';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="theme-dark landing-page flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-6 text-white antialiased">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="size-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />
        </svg>
        <span className="text-2xl font-black tracking-tight">VidStack</span>
      </Link>

      <div className="glass-card w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
        <p className="mt-1 text-sm text-gray-400">
          {isSignUp ? 'Start clipping in under a minute.' : 'Sign in to your VidStack account.'}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="landing-border mt-1.5 w-full rounded-xl border bg-black/30 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-indigo-400"
            />
          </label>
          <label className="block text-sm font-medium text-gray-300">
            Password
            <input
              type="password"
              required
              placeholder={isSignUp ? 'Create a password' : 'Your password'}
              className="landing-border mt-1.5 w-full rounded-xl border bg-black/30 px-4 py-2.5 text-white outline-none placeholder:text-gray-500 focus:border-indigo-400"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 py-3 font-bold text-white transition hover:opacity-90"
          >
            {isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {isSignUp ? 'Already have an account?' : 'New to VidStack?'}
          {' '}
          <Link href={isSignUp ? '/sign-in' : '/sign-up'} className="font-semibold text-indigo-400 hover:text-indigo-300">
            {isSignUp ? 'Sign in' : 'Sign up'}
          </Link>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-600">Free plan · No credit card required</p>
    </div>
  );
};
